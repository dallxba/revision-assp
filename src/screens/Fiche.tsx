import { useMemo, useRef, useState } from 'react'
import { ficheParId, type FicheRef } from '../content'
import type { QuestionQuiz } from '../content/types'
import { construireEcrans, lectureParEcrans } from '../lib/ecrans'
import { aller } from '../lib/route'
import { maitrise, melanger } from '../lib/srs'
import { majEtat, marquerJour, useEtat } from '../lib/store'
import { Entete, Icone, Markdown } from './ui'
import { LeconLecteur } from './Lecon'

const marquerLue = (id: string) =>
  majEtat((e) => (e.fichesLues[id] ? e : { ...e, fichesLues: { ...e.fichesLues, [id]: new Date().toISOString() } }))

export function FicheEcran({ id }: { id?: string }) {
  const ref = id ? ficheParId.get(id) : undefined
  if (!ref) return <Entete titre="Fiche introuvable" retour={() => aller('/parcours')} />
  if (ref.fiche.lecon) return <LeconLecteur r={ref} />
  return lectureParEcrans(ref.fiche) ? <Lecteur r={ref} /> : <FicheDefilante r={ref} />
}

/* ---------- Lecture écran par écran ---------- */

function Lecteur({ r }: { r: FicheRef }) {
  const { fiche, matiere, blocId } = r
  const ecrans = useMemo(() => construireEcrans(fiche), [fiche])
  const [i, setI] = useState(0)
  const [sens, setSens] = useState<1 | -1>(1)
  const [reponses, setReponses] = useState<Record<number, boolean>>({})
  const [signaler, setSignaler] = useState(false)
  const toucher = useRef<{ x: number; y: number } | null>(null)
  const ecran = ecrans[i]
  const bloque = ecran.type === 'question' && reponses[i] === undefined
  const quitter = () => aller(`/bloc/${matiere.id}/${blocId}`)

  const allerA = (j: number) => {
    if (j < 0 || j >= ecrans.length) return
    setSens(j > i ? 1 : -1)
    setI(j)
    if (ecrans[j].type === 'fin') {
      marquerLue(fiche.id)
      marquerJour()
    }
    window.scrollTo(0, 0)
  }
  const suivant = () => !bloque && allerA(i + 1)

  const nbQuestions = Object.keys(reponses).length
  const bonnes = Object.values(reponses).filter(Boolean).length
  const nbNotions = ecrans.filter((e) => e.type === 'notion').length

  return (
    <div
      className="lecteur"
      onTouchStart={(e) => (toucher.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchEnd={(e) => {
        const t = toucher.current
        toucher.current = null
        if (!t) return
        const dx = e.changedTouches[0].clientX - t.x
        const dy = e.changedTouches[0].clientY - t.y
        if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return
        if (dx < 0) suivant()
        else allerA(i - 1)
      }}
    >
      <header className="entete-lecteur">
        <button className="btn-retour" onClick={quitter} aria-label="Fermer la fiche">
          <Icone nom="fermer" />
        </button>
        <div className="segments" aria-label={`Écran ${i + 1} sur ${ecrans.length}`}>
          {ecrans.map((e, k) => (
            <span key={k} className={`${k < i ? 'fait' : k === i ? 'actuel' : ''} ${e.type === 'question' ? 'q' : ''}`} />
          ))}
        </div>
        <button className="btn-retour" onClick={() => setSignaler(true)} aria-label="Signaler une erreur">
          <Icone nom="alerte" taille={20} />
        </button>
      </header>

      <div className={`ecran ${sens > 0 ? 'depuis-droite' : 'depuis-gauche'}`} key={i}>
        {ecran.type === 'notion' && (
          <>
            <p className="sur-titre">
              {i === 0 ? r.blocTitre : fiche.titre}
            </p>
            <h1 className="titre-notion">{ecran.titre ?? fiche.titre}</h1>
            {i === 0 && !fiche.verifiee && <p className="badge-verif">Fiche à vérifier avec ton cours</p>}
            <Markdown texte={ecran.md} />
          </>
        )}
        {ecran.type === 'question' && (
          <QuestionEclair question={ecran.question} reponse={reponses[i]} repondre={(ok) => setReponses((x) => ({ ...x, [i]: ok }))} />
        )}
        {ecran.type === 'fin' && <Fin r={r} nbNotions={nbNotions} bonnes={bonnes} nbQuestions={nbQuestions} recommencer={() => { setReponses({}); allerA(0) }} />}
      </div>

      {ecran.type !== 'fin' && (
        <footer className="pied-lecteur">
          {i > 0 && (
            <button className="btn rond" onClick={() => allerA(i - 1)} aria-label="Écran précédent">
              <Icone nom="retour" />
            </button>
          )}
          <button className="btn principal large" onClick={suivant} disabled={bloque}>
            {bloque ? 'Choisis une réponse' : ecrans[i + 1]?.type === 'question' ? 'Petite question' : ecrans[i + 1]?.type === 'fin' ? 'Terminer' : 'Continuer'}
          </button>
        </footer>
      )}

      {signaler && <Signalement titre={fiche.titre} id={fiche.id} fermer={() => setSignaler(false)} />}
    </div>
  )
}

function QuestionEclair({ question, reponse, repondre }: { question: QuestionQuiz; reponse?: boolean; repondre: (ok: boolean) => void }) {
  const melange = useMemo(() => {
    const ordre = melanger(question.choix.map((_, k) => k))
    return { choix: ordre.map((k) => question.choix[k]), bonne: ordre.indexOf(question.bonne) }
  }, [question])
  const [choisi, setChoisi] = useState<number | null>(null)
  const repondu = reponse !== undefined
  return (
    <div className="question-eclair">
      <p className="pastille-question">Petite question</p>
      <h1 className="titre-notion">{question.q}</h1>
      <div className="choix-quiz">
        {melange.choix.map((c, k) => {
          let cls = 'choix'
          if (repondu) cls += k === melange.bonne ? ' bon' : k === choisi ? ' faux' : ' estompe'
          return (
            <button
              key={k}
              className={cls}
              disabled={repondu}
              onClick={() => {
                setChoisi(k)
                repondre(k === melange.bonne)
              }}
            >
              {c}
            </button>
          )
        })}
      </div>
      {repondu && (
        <div className={reponse ? 'explication bon' : 'explication faux'} role="status">
          <p className="verdict">{reponse ? 'Bien vu !' : 'Pas tout à fait.'}</p>
          <p>{question.explication}</p>
        </div>
      )}
    </div>
  )
}

function Fin({ r, nbNotions, bonnes, nbQuestions, recommencer }: { r: FicheRef; nbNotions: number; bonnes: number; nbQuestions: number; recommencer: () => void }) {
  const { fiche } = r
  return (
    <div className="fin-lecture">
      <div className="medaille pop" aria-hidden="true">
        <Icone nom="check" taille={44} />
      </div>
      <h1>Fiche terminée</h1>
      <div className="bilan">
        <div>
          <p className="chiffre">{nbNotions}</p>
          <p className="legende">notion{nbNotions > 1 ? 's' : ''} lue{nbNotions > 1 ? 's' : ''}</p>
        </div>
        {nbQuestions > 0 && (
          <div>
            <p className="chiffre">
              {bonnes}/{nbQuestions}
            </p>
            <p className="legende">bonne{bonnes > 1 ? 's' : ''} réponse{bonnes > 1 ? 's' : ''}</p>
          </div>
        )}
      </div>
      <p className="legende centre">
        {fiche.cartes.length > 0
          ? `Ancre-la maintenant : ${fiche.cartes.length} cartes, 2 minutes. Elles reviendront ensuite au bon moment.`
          : 'Bravo, continue avec la fiche suivante.'}
      </p>
      <div className="pile">
        {fiche.cartes.length > 0 && (
          <button className="btn principal large" onClick={() => aller(`/cartes/fiche/${fiche.id}`)}>
            Réviser les {fiche.cartes.length} cartes
          </button>
        )}
        {fiche.quiz.length > 0 && (
          <button className="btn large" onClick={() => aller(`/quiz/${fiche.id}`)}>
            Quiz complet · {fiche.quiz.length} questions
          </button>
        )}
        <button className="btn discret" onClick={recommencer}>
          Relire depuis le début
        </button>
        <button className="btn discret" onClick={() => aller(`/bloc/${r.matiere.id}/${r.blocId}`)}>
          Retour au parcours
        </button>
      </div>
      {fiche.sources.length > 0 && (
        <details className="sources">
          <summary>Sources</summary>
          <ul>
            {fiche.sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}

/* ---------- Fiche à faire défiler (exercices, fiche mémo) ---------- */

function FicheDefilante({ r }: { r: FicheRef }) {
  const etat = useEtat()
  const { fiche, matiere, blocId, blocTitre } = r
  const [signaler, setSignaler] = useState(false)
  const lue = !!etat.fichesLues[fiche.id]
  return (
    <div className="page fiche">
      <Entete titre={`${fiche.titre}`} surTitre={`${blocTitre} · ${r.chapitreTitre}`} retour={() => aller(`/bloc/${matiere.id}/${blocId}`)} />
      {!fiche.verifiee && <p className="badge-verif">Fiche à vérifier avec ton cours</p>}
      <Markdown texte={fiche.cours} />
      <div className="actions-fiche">
        {!lue ? (
          <button className="btn principal large" onClick={() => marquerLue(fiche.id)}>
            J'ai terminé
          </button>
        ) : (
          <p className="petit-texte centre">Terminé{fiche.cartes.length ? ` · ${Math.round(maitrise(fiche) * 100)} % acquis` : ''}</p>
        )}
        <button className="btn discret" onClick={() => setSignaler(true)}>
          Signaler une erreur
        </button>
      </div>
      {signaler && <Signalement titre={fiche.titre} id={fiche.id} fermer={() => setSignaler(false)} />}
    </div>
  )
}

export function Signalement({ titre, id, fermer }: { titre: string; id: string; fermer: () => void }) {
  const [texte, setTexte] = useState('')
  const [etatEnvoi, setEtatEnvoi] = useState<'' | 'copie' | 'erreur'>('')
  const message = `Erreur dans la fiche « ${titre} » (${id}) :\n${texte}`

  const envoyer = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Erreur dans une fiche', text: message })
        fermer()
        return
      }
      await navigator.clipboard.writeText(message)
      setEtatEnvoi('copie')
    } catch (e) {
      if ((e as DOMException)?.name === 'AbortError') return
      setEtatEnvoi('erreur')
    }
  }

  return (
    <div className="voile" onClick={fermer}>
      <div className="feuille" role="dialog" aria-modal="true" aria-labelledby="titre-signal" onClick={(e) => e.stopPropagation()}>
        <h2 id="titre-signal">Signaler une erreur</h2>
        <p className="petit-texte">Explique ce qui est faux ou différent de ton cours. Tu pourras l'envoyer par message.</p>
        <textarea value={texte} onChange={(e) => setTexte(e.target.value)} rows={5} placeholder="Ex. : mon prof dit que…" autoFocus />
        {etatEnvoi === 'copie' && <p className="petit-texte">Message copié : colle-le dans un SMS ou WhatsApp.</p>}
        {etatEnvoi === 'erreur' && <p className="petit-texte">Impossible de partager. Fais une capture d'écran de ce texte.</p>}
        <div className="rangee">
          <button className="btn" onClick={fermer}>
            Annuler
          </button>
          <button className="btn principal" disabled={!texte.trim()} onClick={envoyer}>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  )
}
