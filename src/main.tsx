import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import '@fontsource-variable/lexend'
import '@fontsource-variable/bricolage-grotesque'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Service worker : hors connexion + mises à jour.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).then((reg) => {
      const signaler = (w: ServiceWorker) => window.dispatchEvent(new CustomEvent('maj-dispo', { detail: w }))
      if (reg.waiting && navigator.serviceWorker.controller) signaler(reg.waiting)
      reg.addEventListener('updatefound', () => {
        const w = reg.installing
        w?.addEventListener('statechange', () => {
          if (w.state === 'installed' && navigator.serviceWorker.controller) signaler(w)
        })
      })
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') reg.update().catch(() => {})
      })
    })
    let recharge = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (recharge) return
      recharge = true
      location.reload()
    })
  })
}
