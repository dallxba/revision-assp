import { marked } from 'marked'
import { useMemo } from 'react'
import { Schema } from './schemas'

const chemins: Record<string, string> = {
  soleil: 'M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66 1.41-1.41M4.93 19.07l1.41-1.41m0-11.32L4.93 4.93m14.14 14.14-1.41-1.41M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z',
  livre: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15ZM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5',
  reglages: 'M4 7h10m4 0h2M4 17h4m4 0h8M14 4v6m-6 4v6',
  retour: 'M15 5l-7 7 7 7',
  fleche: 'M9 5l7 7-7 7',
  check: 'M5 12.5l4.5 4.5L19 7',
  flamme: 'M12 22c4 0 7-3 7-7 0-4.5-4-7-5-11-2 2-3 4.5-3 7-1.5-1-2-3-2-4-2 2-4 5-4 8 0 4 3 7 7 7Z',
  alerte: 'M12 9v4m0 4h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z',
  etoile: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z',
  ampoule: 'M9 18h6m-5 3h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V17h5v-1.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z',
  main: 'M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-1.5v-6a1.5 1.5 0 0 1 3 0V12m0-5.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.5a6 6 0 0 1-5-2.7L3 15a1.5 1.5 0 0 1 2.5-1.7L8 16',
  fermer: 'M6 6l12 12M18 6 6 18',
  plus: 'M12 5v14M5 12h14',
}

export function Icone({ nom, taille = 22 }: { nom: keyof typeof chemins | string; taille?: number }) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={chemins[nom]} />
    </svg>
  )
}

export function Entete({ titre, retour, surTitre }: { titre?: string; retour?: () => void; surTitre?: string }) {
  return (
    <header className="entete">
      {retour && (
        <button className="btn-retour" onClick={retour} aria-label="Retour">
          <Icone nom="retour" />
        </button>
      )}
      <div>
        {surTitre && <p className="sur-titre">{surTitre}</p>}
        {titre && <h1>{titre}</h1>}
      </div>
    </header>
  )
}

const ENCADRES: Record<string, { label: string; icone: string }> = {
  RETENIR: { label: 'À retenir', icone: 'etoile' },
  ASTUCE: { label: 'Astuce', icone: 'ampoule' },
  METIER: { label: 'Dans le métier', icone: 'main' },
  ATTENTION: { label: 'Attention', icone: 'alerte' },
}

const versHtml = (texte: string) => {
  const brut = marked.parse(texte, { async: false }) as string
  const doc = new DOMParser().parseFromString(brut, 'text/html')
  // Sur téléphone, les tableaux s'affichent en fiches empilées : chaque cellule
  // reçoit le nom de sa colonne pour pouvoir l'afficher en étiquette.
  doc.querySelectorAll('table').forEach((t) => {
    const entetes = [...t.querySelectorAll('thead th')].map((th) => th.textContent ?? '')
    t.querySelectorAll('tbody tr').forEach((tr) => [...tr.children].forEach((td, i) => td.setAttribute('data-label', entetes[i] ?? '')))
  })
  // Encadrés « > [!RETENIR] … » (syntaxe GitHub).
  doc.querySelectorAll('blockquote').forEach((bq) => {
    const p = bq.querySelector('p')
    const m = p?.innerHTML.match(/^\s*\[!([A-Z]+)\]\s*(?:<br>)?\s*/)
    if (!p || !m || !ENCADRES[m[1]]) return
    const e = ENCADRES[m[1]]
    p.innerHTML = p.innerHTML.slice(m[0].length)
    if (!p.innerHTML.trim()) p.remove()
    const div = doc.createElement('div')
    div.className = `encadre encadre-${m[1].toLowerCase()}`
    div.innerHTML = `<p class="encadre-titre"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${chemins[e.icone]}"/></svg>${e.label}</p>${bq.innerHTML}`
    bq.replaceWith(div)
  })
  return doc.body.innerHTML
}

/** Rend du Markdown ; une ligne « ::schema[nom] » insère un schéma dessiné. */
export function Markdown({ texte }: { texte: string }) {
  const morceaux = useMemo(
    () =>
      texte.split(/^::schema\[([a-z0-9-]+)\]\s*$/m).map((m, i) => (i % 2 ? { schema: m } : { html: versHtml(m) })),
    [texte],
  )
  return (
    <div className="cours">
      {morceaux.map((m, i) => (m.schema ? <Schema key={i} nom={m.schema} /> : <div key={i} dangerouslySetInnerHTML={{ __html: m.html! }} />))}
    </div>
  )
}

export function Jauge({ valeur, label }: { valeur: number; label: string }) {
  return (
    <div className="jauge" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(valeur * 100)}>
      <div style={{ width: `${Math.round(valeur * 100)}%` }} />
    </div>
  )
}
