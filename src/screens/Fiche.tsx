import { useState } from 'react'
import { ficheParId } from '../content'
import { aller } from '../lib/route'
import { maitrise } from '../lib/srs'
import { majEtat, useEtat } from '../lib/store'
import { Entete, Icone, Markdown } from './ui'

export function FicheEcran({ id }: { id?: string }) {
  const etat = useEtat()
  const ref = id ? ficheParId.get(id) : undefined
  const [signaler, setSignaler] = useState(false)
  if (!ref) return <Entete titre="Fiche introuvable" retour={() => aller('/parcours')} />
  const { fiche, matiere, blocId, blocTitre } = ref
  const lue = !!etat.fichesLues[fiche.id]
  const quiz = etat.quiz[fiche.id]

  const marquerLue = () =>
    majEtat((e) => (e.fichesLues[fiche.id] ? e : { ...e, fichesLues: { ...e.fichesLues, [fiche.id]: new Date().toISOString() } }))

  return (
    <div className="page fiche">
      <Entete titre={fiche.titre} surTitre={blocTitre} retour={() => aller(`/bloc/${matiere.id}/${blocId}`)} />
      <div className="etiquettes">
        {fiche.annees.map((a) => (
          <span key={a} className="etiquette">
            {a}
          </span>
        ))}
        <span className="etiquette">{fiche.domaine}</span>
        {fiche.epreuves.map((e) => (
          <span key={e} className="etiquette">
            {e}
          </span>
        ))}
      </div>

      {!fiche.verifiee && (
        <div className="encart alerte">
          <Icone nom="alerte" taille={18} />
          <p>Fiche pas encore vérifiée. Compare-la à ton cours, et signale tout ce qui ne colle pas.</p>
        </div>
      )}

      <Markdown texte={fiche.cours} />

      <details className="sources">
        <summary>Sources</summary>
        <ul>
          {fiche.sources.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </details>

      <div className="actions-fiche">
        {fiche.cartes.length > 0 && (
          <button
            className="btn principal large"
            onClick={() => {
              marquerLue()
              aller(`/cartes/fiche/${fiche.id}`)
            }}
          >
            {lue ? `Réviser les ${fiche.cartes.length} cartes` : `J'ai lu · réviser les ${fiche.cartes.length} cartes`}
          </button>
        )}
        {fiche.quiz.length > 0 && (
          <button
            className="btn large"
            onClick={() => {
              marquerLue()
              aller(`/quiz/${fiche.id}`)
            }}
          >
            Quiz · {fiche.quiz.length} questions
            {quiz && <span className="meta-btn"> · record {quiz.meilleur}/{quiz.total}</span>}
          </button>
        )}
        {!lue && (
          <button className="btn discret" onClick={marquerLue}>
            Marquer comme lue
          </button>
        )}
        {lue && fiche.cartes.length > 0 && <p className="petit-texte centre">{Math.round(maitrise(fiche) * 100)} % des cartes acquises</p>}
        <button className="btn discret" onClick={() => setSignaler(true)}>
          Signaler une erreur
        </button>
      </div>

      {signaler && <Signalement titre={fiche.titre} id={fiche.id} fermer={() => setSignaler(false)} />}
    </div>
  )
}

function Signalement({ titre, id, fermer }: { titre: string; id: string; fermer: () => void }) {
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
