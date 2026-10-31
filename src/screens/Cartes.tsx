import { useState } from 'react'
import { ficheParId } from '../content'
import { aller, retour } from '../lib/route'
import { apercu, cartesDeLaFiche, melanger, noter, revisionDuJour, type CarteAReviser, type Note } from '../lib/srs'
import { Entete, Icone } from './ui'

const boutons: { note: Note; label: string }[] = [
  { note: 'encore', label: 'À revoir' },
  { note: 'difficile', label: 'Difficile' },
  { note: 'bien', label: 'Bien' },
  { note: 'facile', label: 'Facile' },
]

export function SessionCartes({ mode }: { mode: 'jour' | { fiche?: string } }) {
  const [file, setFile] = useState<CarteAReviser[]>(() => {
    if (mode === 'jour') {
      const { dues, nouvelles } = revisionDuJour()
      return [...dues, ...nouvelles]
    }
    const ref = mode.fiche ? ficheParId.get(mode.fiche) : undefined
    return ref ? melanger(cartesDeLaFiche(ref.fiche)) : []
  })
  const [total] = useState(file.length)
  const [faites, setFaites] = useState(0)
  const [reussies, setReussies] = useState(0)
  const [vue, setVue] = useState(false)

  const ref = mode === 'jour' ? undefined : mode.fiche ? ficheParId.get(mode.fiche) : undefined
  const quitter = () => (ref ? aller(`/bloc/${ref.matiere.id}/${ref.blocId}`) : mode === 'jour' ? aller('/') : retour('/parcours'))

  if (file.length === 0) {
    return (
      <div className="page session">
        <Entete retour={quitter} />
        <div className="fin">
          <div className="medaille" aria-hidden="true">
            <Icone nom="check" taille={40} />
          </div>
          <h1>{total === 0 ? 'Aucune carte à revoir' : 'Session terminée'}</h1>
          {total > 0 && (
            <p className="legende">
              {reussies} carte{reussies > 1 ? 's' : ''} connue{reussies > 1 ? 's' : ''} sur {faites} réponse{faites > 1 ? 's' : ''}.
            </p>
          )}
          <p className="legende">Les cartes reviendront au bon moment : plus tu les connais, plus elles s'espacent.</p>
          <button className="btn principal large" onClick={quitter}>
            Terminer
          </button>
        </div>
      </div>
    )
  }

  const actuelle = file[0]
  const delais = vue ? apercu(actuelle.id) : null

  const repondre = (note: Note) => {
    noter(actuelle.id, note)
    setFaites((n) => n + 1)
    if (note !== 'encore') setReussies((n) => n + 1)
    setVue(false)
    setFile((f) => (note === 'encore' ? [...f.slice(1), f[0]] : f.slice(1)))
  }

  const restant = file.length

  return (
    <div className="page session">
      <header className="entete-session">
        <button className="btn-retour" onClick={quitter} aria-label="Quitter la session">
          <Icone nom="retour" />
        </button>
        <div className="progression" aria-label={`${restant} cartes restantes`}>
          <div style={{ width: `${total ? Math.min(100, ((total - Math.min(restant, total)) / total) * 100) : 0}%` }} />
        </div>
        <span className="compteur">{restant}</span>
      </header>

      <button className={vue ? 'carte-memoire retournee' : 'carte-memoire'} onClick={() => setVue(true)} aria-live="polite">
        <span className="source-carte">
          {actuelle.nouvelle && <span className="badge-nouvelle">Nouvelle</span>}
          {actuelle.fiche.titre}
        </span>
        <span className="question">{actuelle.carte.q}</span>
        {vue ? <span className="reponse">{actuelle.carte.r}</span> : <span className="indice">Réfléchis, puis touche pour voir la réponse</span>}
      </button>

      <div className="zone-notes">
        {vue && delais ? (
          <>
            <p className="petit-texte centre">Tu la connaissais ?</p>
            <div className="notes">
              {boutons.map((b) => (
                <button key={b.note} className={`note note-${b.note}`} onClick={() => repondre(b.note)}>
                  <span>{b.label}</span>
                  <span className="delai">{delais[b.note]}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <button className="btn principal large" onClick={() => setVue(true)}>
            Voir la réponse
          </button>
        )}
      </div>
    </div>
  )
}
