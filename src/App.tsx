import { useEffect, useState } from 'react'
import { useRoute } from './lib/route'
import { useEtat } from './lib/store'
import { Bienvenue } from './screens/Bienvenue'
import { Aujourdhui } from './screens/Aujourdhui'
import { Parcours, BlocEcran } from './screens/Parcours'
import { FicheEcran } from './screens/Fiche'
import { SessionCartes } from './screens/Cartes'
import { Quiz } from './screens/Quiz'
import { Reglages } from './screens/Reglages'
import { Icone } from './screens/ui'

export function App() {
  const etat = useEtat()
  const route = useRoute()
  const [maj, setMaj] = useState<ServiceWorker | null>(null)

  useEffect(() => {
    const f = (e: Event) => setMaj((e as CustomEvent<ServiceWorker>).detail)
    window.addEventListener('maj-dispo', f)
    return () => window.removeEventListener('maj-dispo', f)
  }, [])

  if (!etat.classe) return <Bienvenue />

  const [page, a, b] = route
  let ecran: React.ReactNode
  let onglet: 'jour' | 'parcours' | 'reglages' | null = null
  switch (page) {
    case undefined:
      ecran = <Aujourdhui />
      onglet = 'jour'
      break
    case 'parcours':
      ecran = <Parcours />
      onglet = 'parcours'
      break
    case 'bloc':
      ecran = <BlocEcran matiereId={a} blocId={b} />
      onglet = 'parcours'
      break
    case 'fiche':
      ecran = <FicheEcran id={a} />
      onglet = 'parcours'
      break
    case 'cartes':
      ecran = <SessionCartes mode={a === 'fiche' ? { fiche: b } : 'jour'} />
      break
    case 'quiz':
      ecran = <Quiz ficheId={a} />
      break
    case 'reglages':
      ecran = <Reglages />
      onglet = 'reglages'
      break
    default:
      ecran = <Aujourdhui />
      onglet = 'jour'
  }

  return (
    <div className={onglet ? 'app avec-onglets' : 'app'}>
      {maj && (
        <div className="bandeau-maj" role="status">
          <span>Nouvelle version disponible</span>
          <button className="btn petit" onClick={() => maj.postMessage('skip-waiting')}>
            Mettre à jour
          </button>
        </div>
      )}
      <main key={route.join('/')}>{ecran}</main>
      {onglet && (
        <nav className="onglets" aria-label="Navigation principale">
          <a href="#/" className={onglet === 'jour' ? 'actif' : ''} aria-current={onglet === 'jour' ? 'page' : undefined}>
            <Icone nom="soleil" />
            Aujourd'hui
          </a>
          <a href="#/parcours" className={onglet === 'parcours' ? 'actif' : ''} aria-current={onglet === 'parcours' ? 'page' : undefined}>
            <Icone nom="livre" />
            Parcours
          </a>
          <a href="#/reglages" className={onglet === 'reglages' ? 'actif' : ''} aria-current={onglet === 'reglages' ? 'page' : undefined}>
            <Icone nom="reglages" />
            Réglages
          </a>
        </nav>
      )}
    </div>
  )
}
