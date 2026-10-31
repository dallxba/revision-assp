import { useState } from 'react'
import { ficheParId } from '../content'
import { retour } from '../lib/route'
import { melanger } from '../lib/srs'
import { majEtat, marquerJour } from '../lib/store'
import { Entete, Icone } from './ui'

export function Quiz({ ficheId }: { ficheId?: string }) {
  const ref = ficheId ? ficheParId.get(ficheId) : undefined
  const [questions] = useState(() =>
    ref
      ? melanger(ref.fiche.quiz).map((q) => {
          const ordre = melanger(q.choix.map((_, i) => i))
          return { ...q, choix: ordre.map((i) => q.choix[i]), bonne: ordre.indexOf(q.bonne) }
        })
      : [],
  )
  const [i, setI] = useState(0)
  const [choix, setChoix] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [fini, setFini] = useState(false)

  if (!ref || questions.length === 0) return <Entete titre="Quiz introuvable" retour={() => retour('/parcours')} />
  const q = questions[i]

  const choisir = (k: number) => {
    if (choix !== null) return
    setChoix(k)
    if (k === q.bonne) setScore((s) => s + 1)
  }

  const suivant = () => {
    if (i + 1 < questions.length) {
      setI(i + 1)
      setChoix(null)
      return
    }
    const final = score
    majEtat((e) => {
      const avant = e.quiz[ref.fiche.id]
      return {
        ...e,
        quiz: {
          ...e.quiz,
          [ref.fiche.id]: { meilleur: Math.max(final, avant?.meilleur ?? 0), dernier: final, total: questions.length, date: new Date().toISOString() },
        },
      }
    })
    marquerJour()
    setFini(true)
  }

  if (fini) {
    const parfait = score === questions.length
    return (
      <div className="page session">
        <Entete retour={() => retour('/parcours')} />
        <div className="fin">
          <p className="gros-chiffre">
            {score}/{questions.length}
          </p>
          <h1>{parfait ? 'Sans faute.' : score >= questions.length / 2 ? 'Bien joué.' : 'À retravailler.'}</h1>
          <p className="legende">{parfait ? 'Tu maîtrises cette fiche. Les cartes vont maintenant s\'espacer.' : 'Relis la fiche, puis refais le quiz plus tard.'}</p>
          <button className="btn principal large" onClick={() => retour('/parcours')}>
            Retour à la fiche
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page session">
      <header className="entete-session">
        <button className="btn-retour" onClick={() => retour('/parcours')} aria-label="Quitter le quiz">
          <Icone nom="retour" />
        </button>
        <div className="progression">
          <div style={{ width: `${(i / questions.length) * 100}%` }} />
        </div>
        <span className="compteur">
          {i + 1}/{questions.length}
        </span>
      </header>

      <p className="sur-titre">{ref.fiche.titre}</p>
      <h1 className="question-quiz">{q.q}</h1>

      <div className="choix-quiz">
        {q.choix.map((c, k) => {
          let classe = 'choix'
          if (choix !== null) {
            if (k === q.bonne) classe += ' bon'
            else if (k === choix) classe += ' faux'
            else classe += ' estompe'
          }
          return (
            <button key={k} className={classe} onClick={() => choisir(k)} disabled={choix !== null && k !== q.bonne && k !== choix}>
              {c}
            </button>
          )
        })}
      </div>

      {choix !== null && (
        <div className={choix === q.bonne ? 'explication bon' : 'explication faux'} role="status">
          <p className="verdict">{choix === q.bonne ? 'Exact.' : 'Pas tout à fait.'}</p>
          <p>{q.explication}</p>
          <button className="btn principal large" onClick={suivant}>
            {i + 1 < questions.length ? 'Question suivante' : 'Voir mon score'}
          </button>
        </div>
      )}
    </div>
  )
}
