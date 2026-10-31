import type { Annee } from '../content/types'
import { majEtat } from '../lib/store'

const classes: { id: Annee; titre: string; detail: string }[] = [
  { id: '2de', titre: 'Seconde', detail: 'Les bases du métier' },
  { id: '1re', titre: 'Première', detail: 'Approfondir, préparer E33' },
  { id: 'Tle', titre: 'Terminale', detail: 'Objectif examen : E2, E31, E32' },
]

export function Bienvenue() {
  return (
    <div className="bienvenue">
      <div className="logo" aria-hidden="true">
        <svg viewBox="0 0 512 512" width="64" height="64">
          <rect width="512" height="512" rx="112" fill="var(--teal)" />
          <path d="M136 150h150a90 90 0 0 1 90 90v122H226a90 90 0 0 1-90-90z" fill="var(--papier)" />
          <path d="M220 214v44h-44v36h44v44h36v-44h44v-36h-44v-44z" fill="var(--coral)" />
        </svg>
      </div>
      <h1>Révision Bac Pro ASSP</h1>
      <p className="intro">Tes cours en fiches courtes, des cartes à réviser chaque jour et des quiz. Tout reste sur ton téléphone.</p>
      <h2>Tu es en…</h2>
      <div className="choix-classe">
        {classes.map((c) => (
          <button key={c.id} className="carte-choix" onClick={() => majEtat((e) => ({ ...e, classe: c.id }))}>
            <span className="titre">{c.titre}</span>
            <span className="detail">{c.detail}</span>
          </button>
        ))}
      </div>
      <p className="petit-texte">Tu pourras changer dans les réglages.</p>
    </div>
  )
}
