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
