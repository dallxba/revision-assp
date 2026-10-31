import { useRef, useState } from 'react'
import type { Annee } from '../content/types'
import { exporter, importer, majEtat, stockageDisponible, toutEffacer, useEtat } from '../lib/store'
import { Entete } from './ui'

const classes: { id: Annee; label: string }[] = [
  { id: '2de', label: 'Seconde' },
  { id: '1re', label: 'Première' },
  { id: 'Tle', label: 'Terminale' },
]

export function Reglages() {
  const etat = useEtat()
  const fichier = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')

  const sauvegarder = async () => {
    const data = exporter()
    const nom = `revision-assp-${new Date().toISOString().slice(0, 10)}.json`
    const file = new File([data], nom, { type: 'application/json' })
    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Sauvegarde Révision ASSP' })
        setMessage('Sauvegarde partagée. Range-la dans Fichiers ou envoie-la-toi.')
        return
      }
    } catch (e) {
      if ((e as DOMException)?.name === 'AbortError') return
    }
    const url = URL.createObjectURL(file)
    const a = document.createElement('a')
    a.href = url
    a.download = nom
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setMessage('Sauvegarde téléchargée.')
  }

  const restaurer = async (f: File) => {
    try {
      importer(await f.text())
      setMessage('Progression restaurée.')
    } catch (e) {
      setMessage((e as Error).message || 'Fichier illisible.')
    }
  }

  return (
    <div className="page">
      <Entete titre="Réglages" />

      <section>
        <h2 className="titre-section">Ma classe</h2>
        <div className="segment" role="radiogroup" aria-label="Classe">
          {classes.map((c) => (
            <button
              key={c.id}
              role="radio"
              aria-checked={etat.classe === c.id}
              className={etat.classe === c.id ? 'actif' : ''}
              onClick={() => majEtat((e) => ({ ...e, classe: c.id }))}
            >
              {c.label}
            </button>
          ))}
        </div>
        <label className="interrupteur">
          <span>
            Afficher les fiches des autres années
            <span className="petit-texte bloc">Utile pour réviser la seconde en terminale, ou prendre de l'avance.</span>
          </span>
          <input type="checkbox" checked={etat.toutVoir} onChange={(e) => majEtat((x) => ({ ...x, toutVoir: e.target.checked }))} />
        </label>
      </section>

      <section>
        <h2 className="titre-section">Ma progression</h2>
        <p className="petit-texte">
          Elle est enregistrée sur ce téléphone uniquement.{' '}
          {etat.derniereSauvegarde
            ? `Dernière sauvegarde le ${new Date(etat.derniereSauvegarde).toLocaleDateString('fr-FR')}.`
            : 'Aucune sauvegarde pour l\'instant.'}
        </p>
        {!stockageDisponible() && <p className="encart alerte">Ce navigateur bloque l'enregistrement : ta progression sera perdue en fermant l'appli.</p>}
        <div className="pile">
          <button className="btn large" onClick={sauvegarder}>
            Sauvegarder ma progression
          </button>
          <button className="btn large" onClick={() => fichier.current?.click()}>
            Restaurer une sauvegarde
          </button>
          <input
            ref={fichier}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) restaurer(f)
              e.target.value = ''
            }}
          />
          {message && (
            <p className="petit-texte" role="status">
              {message}
            </p>
          )}
          <button
            className="btn discret danger"
            onClick={() => {
              if (confirm('Effacer toute ta progression sur ce téléphone ? Cette action est définitive.')) toutEffacer()
            }}
          >
            Tout effacer
          </button>
        </div>
      </section>

      <section>
        <h2 className="titre-section">À propos du contenu</h2>
        <p className="petit-texte">
          Les fiches sont rédigées à partir du référentiel du Bac Pro ASSP rénové (2022), de sources officielles et des sujets d'examen
          récents. Elles ne remplacent pas le cours : une fiche marquée « à vérifier » n'a pas encore été comparée à un cours en classe.
          Si quelque chose ne colle pas, utilise « Signaler une erreur » en bas de la fiche.
        </p>
        <p className="petit-texte">Version 0.1</p>
      </section>
    </div>
  )
}
