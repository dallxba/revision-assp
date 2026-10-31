import { createEmptyCard, fsrs, Rating, type Card, type Grade } from 'ts-fsrs'
import { carteId, toutesLesFiches } from '../content'
import type { Annee, Carte, Fiche } from '../content/types'
import { aujourdhui, getEtat, majEtat, marquerJour, type CarteEtat } from './store'

const planificateur = fsrs({ request_retention: 0.9, enable_fuzz: true })

export const NOUVELLES_PAR_JOUR = 15

const versCarte = (c: CarteEtat): Card => ({
  ...c,
  due: new Date(c.due),
  last_review: c.last_review ? new Date(c.last_review) : undefined,
})

const versEtat = (c: Card): CarteEtat => ({
  due: c.due.toISOString(),
  stability: c.stability,
  difficulty: c.difficulty,
  elapsed_days: c.elapsed_days,
  scheduled_days: c.scheduled_days,
  learning_steps: c.learning_steps,
  reps: c.reps,
  lapses: c.lapses,
  state: c.state,
  last_review: c.last_review?.toISOString(),
})

export type Note = 'encore' | 'difficile' | 'bien' | 'facile'
const notes: Record<Note, Grade> = {
  encore: Rating.Again,
  difficile: Rating.Hard,
  bien: Rating.Good,
  facile: Rating.Easy,
}

export interface CarteAReviser {
  id: string
  carte: Carte
  fiche: Fiche
  nouvelle: boolean
}

/** Délai affiché sous chaque bouton de note. */
export const apercu = (id: string, maintenant = new Date()): Record<Note, string> => {
  const etat = getEtat().cartes[id]
  const carte = etat ? versCarte(etat) : createEmptyCard(maintenant)
  const p = planificateur.repeat(carte, maintenant)
  const format = (d: Date) => {
    const min = Math.round((d.getTime() - maintenant.getTime()) / 60000)
    if (min < 60) return `${Math.max(1, min)} min`
    const h = Math.round(min / 60)
    if (h < 24) return `${h} h`
    const j = Math.round(h / 24)
    if (j < 31) return `${j} j`
    const m = Math.round(j / 30)
    return m < 12 ? `${m} mois` : `${Math.round(j / 365)} an${j >= 730 ? 's' : ''}`
  }
  return {
    encore: format(p[Rating.Again].card.due),
    difficile: format(p[Rating.Hard].card.due),
    bien: format(p[Rating.Good].card.due),
    facile: format(p[Rating.Easy].card.due),
  }
}

export const noter = (id: string, note: Note, maintenant = new Date()) => {
  const etatAvant = getEtat().cartes[id]
  const carte = etatAvant ? versCarte(etatAvant) : createEmptyCard(maintenant)
  const { card } = planificateur.next(carte, maintenant, notes[note])
  const jour = aujourdhui(maintenant)
  majEtat((e) => ({
    ...e,
    cartes: { ...e.cartes, [id]: versEtat(card) },
    nouvellesParJour: etatAvant ? e.nouvellesParJour : { ...e.nouvellesParJour, [jour]: (e.nouvellesParJour[jour] ?? 0) + 1 },
  }))
  marquerJour()
}

export const ficheVisible = (f: Fiche, classe: Annee | null, toutVoir: boolean) =>
  toutVoir || !classe || f.annees.includes(classe)

/**
 * Révision du jour : cartes dues d'abord, puis des cartes nouvelles
 * prises uniquement dans les fiches déjà lues (on apprend avant de se tester).
 */
export const revisionDuJour = (maintenant = new Date()): { dues: CarteAReviser[]; nouvelles: CarteAReviser[] } => {
  const e = getEtat()
  const dues: CarteAReviser[] = []
  const nouvelles: CarteAReviser[] = []
  const restantes = Math.max(0, NOUVELLES_PAR_JOUR - (e.nouvellesParJour[aujourdhui(maintenant)] ?? 0))
  for (const { fiche } of toutesLesFiches) {
    for (const carte of fiche.cartes) {
      const id = carteId(fiche.id, carte.id)
      const ce = e.cartes[id]
      if (ce) {
        if (new Date(ce.due) <= maintenant) dues.push({ id, carte, fiche, nouvelle: false })
      } else if (e.fichesLues[fiche.id] && ficheVisible(fiche, e.classe, e.toutVoir)) {
        nouvelles.push({ id, carte, fiche, nouvelle: true })
      }
    }
  }
  dues.sort((a, b) => +new Date(e.cartes[a.id].due) - +new Date(e.cartes[b.id].due))
  return { dues, nouvelles: nouvelles.slice(0, restantes) }
}

/** Part des cartes d'une fiche considérées comme acquises (revues, intervalle ≥ 3 jours). */
export const maitrise = (fiche: Fiche) => {
  const e = getEtat()
  if (fiche.cartes.length === 0) return 0
  const ok = fiche.cartes.filter((c) => {
    const ce = e.cartes[carteId(fiche.id, c.id)]
    return ce && ce.scheduled_days >= 3
  }).length
  return ok / fiche.cartes.length
}

export const cartesDeLaFiche = (fiche: Fiche): CarteAReviser[] =>
  fiche.cartes.map((carte) => ({ id: carteId(fiche.id, carte.id), carte, fiche, nouvelle: !getEtat().cartes[carteId(fiche.id, carte.id)] }))

export const melanger = <T,>(t: T[]) => {
  const a = [...t]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
