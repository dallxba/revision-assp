import { useEffect, useState } from 'react'

const lireRoute = () => (location.hash.replace(/^#/, '') || '/').split('/').filter(Boolean)

export const useRoute = () => {
  const [route, setRoute] = useState(lireRoute)
  useEffect(() => {
    const f = () => {
      setRoute(lireRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', f)
    return () => window.removeEventListener('hashchange', f)
  }, [])
  return route
}

export const aller = (chemin: string) => {
  location.hash = chemin
}

export const retour = (defaut = '/') => {
  if (history.length > 1) history.back()
  else aller(defaut)
}
