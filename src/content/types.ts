export type Annee = '2de' | '1re' | 'Tle'

export interface Carte {
  /** Identifiant stable dans la fiche : ne jamais le changer une fois publié. */
  id: string
  q: string
  r: string
}

export interface QuestionQuiz {
  id: string
  q: string
  choix: string[]
  /** Index de la bonne réponse dans `choix`. */
  bonne: number
  explication: string
}

export interface Fiche {
  /** Identifiant stable, utilisé pour la progression. */
  id: string
  titre: string
  annees: Annee[]
  /** Domaine de savoir : biologie, SMS, nutrition, techniques, microbiologie, méthodologie… */
  domaine: string
  epreuves: string[]
  /** D'où vient le contenu, pour pouvoir le vérifier. */
  sources: string[]
  /** false tant qu'une élève n'a pas comparé la fiche à son cours. */
  verifiee: boolean
  /** Cours en Markdown. */
  cours: string
  cartes: Carte[]
  quiz: QuestionQuiz[]
  /** Présent pour un cours court : le lecteur « notion → pratique » est utilisé. */
  lecon?: { cours: CoursCourt; total: number; chapitreTitre: string }
}

export interface Chapitre {
  id: string
  titre: string
  /** Code de compétence du référentiel, si connu (ex. « 4.1 »). */
  code?: string
  fiches: Fiche[]
}

export interface Bloc {
  id: string
  titre: string
  sousTitre?: string
  epreuve?: string
  chapitres: Chapitre[]
}

export interface Matiere {
  id: string
  titre: string
  court: string
  couleur: string
  blocs: Bloc[]
}

/* ---------- Cours courts (trame « façon appli du Coran », validée le 2026-10-31) ---------- */

export type BlocLecon =
  | string
  | { l: string[] }
  | { ol: string[] }
  | { ret: string }
  | { att: string }
  | { ex: string }
  | { tab: string[][] }
  | { svg: string }

export interface QcmSimple {
  q: string
  choix: string[]
  bonne: number
}

export type Exercice =
  | { type: 'qcm'; items: QcmSimple[] }
  | { type: 'vf'; items: [string, boolean, string][] }
  | { type: 'relier'; paires: [string, string][] }
  | { type: 'ordre'; consigne: string; items: string[] }

export interface CoursCourt {
  n: number
  t: string
  notion: { t: string; b: BlocLecon[] }[]
  verif: QcmSimple[]
  terrain: { lieu: string; txt: string }[]
  bonus: { t: string; txt: string; verifier?: boolean } | null
  mots: [string, string][]
  ex: Exercice[]
}

export interface Lecon {
  id: string
  titre: string
  statut?: string
  bloc?: string
  annees?: Annee[]
  domaine?: string
  epreuves?: string[]
  sources?: string[]
  cours: CoursCourt[]
}
