import { useSyncExternalStore } from 'react'
import type { Annee } from '../content/types'

/** Carte FSRS sérialisée (dates en ISO). */
export interface CarteEtat {
  due: string
  stability: number
  difficulty: number
  elapsed_days: number
  scheduled_days: number
  learning_steps: number
  reps: number
  lapses: number
  state: number
  last_review?: string
}

export interface Etat {
  version: 1
  classe: Annee | null
  toutVoir: boolean
  cartes: Record<string, CarteEtat>
  fichesLues: Record<string, string>
  quiz: Record<string, { meilleur: number; dernier: number; total: number; date: string }>
  /** Jours (AAAA-MM-JJ) où une révision a été faite. */
  jours: string[]
  /** Nouvelles cartes introduites par jour, pour limiter la charge. */
  nouvellesParJour: Record<string, number>
  derniereSauvegarde?: string
}

const CLE = 'revision-assp.v1'

const initial = (): Etat => ({
  version: 1,
  classe: null,
  toutVoir: false,
  cartes: {},
  fichesLues: {},
  quiz: {},
  jours: [],
  nouvellesParJour: {},
})

let stockageOk = true

const lire = (): Etat => {
  try {
    const brut = localStorage.getItem(CLE)
    if (!brut) return initial()
    return { ...initial(), ...JSON.parse(brut) }
  } catch {
    stockageOk = false
    return initial()
  }
}

let etat: Etat = lire()
const abonnes = new Set<() => void>()

export const stockageDisponible = () => stockageOk

export const getEtat = () => etat

export const majEtat = (f: (e: Etat) => Etat) => {
  etat = f(etat)
  try {
    localStorage.setItem(CLE, JSON.stringify(etat))
  } catch {
    stockageOk = false
  }
  abonnes.forEach((cb) => cb())
}

export const useEtat = () =>
  useSyncExternalStore(
    (cb) => {
      abonnes.add(cb)
      return () => abonnes.delete(cb)
    },
    () => etat,
  )

export const aujourdhui = (d = new Date()) => {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

export const marquerJour = () =>
  majEtat((e) => (e.jours.includes(aujourdhui()) ? e : { ...e, jours: [...e.jours, aujourdhui()].slice(-400) }))

/** Nombre de jours consécutifs de révision, jusqu'à aujourd'hui (ou hier). */
export const serie = (jours: string[]) => {
  const set = new Set(jours)
  const d = new Date()
  if (!set.has(aujourdhui(d))) d.setDate(d.getDate() - 1)
  let n = 0
  while (set.has(aujourdhui(d))) {
    n++
    d.setDate(d.getDate() - 1)
  }
  return n
}

export const exporter = () => {
  const data = JSON.stringify({ app: 'revision-assp', exporteLe: new Date().toISOString(), etat }, null, 2)
  majEtat((e) => ({ ...e, derniereSauvegarde: new Date().toISOString() }))
  return data
}

export const importer = (texte: string) => {
  const data = JSON.parse(texte)
  if (data?.app !== 'revision-assp' || !data.etat) throw new Error("Ce fichier n'est pas une sauvegarde de l'appli.")
  majEtat(() => ({ ...initial(), ...data.etat }))
}

export const toutEffacer = () => majEtat(() => initial())
