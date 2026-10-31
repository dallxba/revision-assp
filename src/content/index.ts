import type { Annee, Chapitre, Fiche, Lecon, Matiere } from './types'
import { bloc4 } from './assp-bloc4'
import generes from './generated/chapitres.json'

const vide = (id: string, titre: string, sousTitre: string, epreuve: string) => ({
  id,
  titre,
  sousTitre,
  epreuve,
  chapitres: [],
})

export const matieres: Matiere[] = [
  {
    id: 'assp',
    titre: 'Enseignement professionnel ASSP',
    court: 'ASSP',
    couleur: 'var(--teal)',
    blocs: [
      vide('b1', 'Bloc 1 · Accompagner la personne', 'Accompagner la personne dans une approche globale et individualisée', 'E31 · CCF terminale'),
      vide('b2', 'Bloc 2 · Soins et vie quotidienne', "Intervenir auprès de la personne lors des soins d'hygiène, de confort et de sécurité, dans les activités de la vie quotidienne", 'E32 · CCF en PFMP'),
      vide('b3', 'Bloc 3 · Travail en équipe', 'Travailler et communiquer en équipe pluriprofessionnelle', 'E33 · CCF'),
      bloc4,
    ],
  },
  {
    id: 'pse',
    titre: 'Prévention Santé Environnement',
    court: 'PSE',
    couleur: 'var(--coral)',
    blocs: [],
  },
  {
    id: 'generales',
    titre: 'Matières générales',
    court: 'Général',
    couleur: 'var(--plum)',
    blocs: [],
  },
]

// Chapitres rédigés en Markdown (contenu/chapitres/*.md), convertis au build.
for (const { bloc, chapitre } of generes as { bloc: string; chapitre: Chapitre }[]) {
  const cible = matieres.flatMap((m) => m.blocs).find((b) => b.id === bloc)
  if (cible) cible.chapitres.push(chapitre)
  else console.warn(`Chapitre ${chapitre.id} : bloc inconnu « ${bloc} »`)
}

// Cours courts (src/content/lecons/*.json) : chaque cours devient une fiche.
// Ses mots de vocabulaire deviennent des cartes, ses QCM des questions de quiz.
const slug = (t: string) =>
  t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// Rattachement provisoire (plan des chapitres, non vérifié dans le référentiel) tant que le JSON n'a pas de champ « bloc ».
const BLOC_PAR_DEFAUT: Record<string, string> = { 'cellule-cancers': 'b4' }

const ORDRE = ['organisation-corps', 'peau', 'cardiovasculaire', 'cellule-cancers']
const lecons = Object.values(import.meta.glob<Lecon>('./lecons/*.json', { eager: true, import: 'default' })).sort(
  (a, b) => (ORDRE.indexOf(b.id) >>> 0) - (ORDRE.indexOf(a.id) >>> 0),
)
for (const l of lecons) {
  const chapitre: Chapitre = {
    id: l.id,
    titre: l.titre,
    fiches: l.cours.map(
      (c): Fiche => ({
        id: `${l.id}-c${c.n}`,
        titre: c.t,
        annees: l.annees ?? (['2de', '1re', 'Tle'] as Annee[]),
        domaine: l.domaine ?? 'Biologie et physiopathologie',
        epreuves: l.epreuves ?? [],
        sources: l.sources ?? (l.statut ? [l.statut] : []),
        verifiee: false,
        cours: '',
        cartes: c.mots.map(([mot, def]) => ({ id: `m-${slug(mot)}`, q: `Que veut dire « ${mot} » ?`, r: def })),
        quiz: [
          ...c.verif.map((q, j) => ({ ...q, id: `v${j}`, explication: '' })),
          ...c.ex.flatMap((e, i) => (e.type === 'qcm' ? e.items.map((q, j) => ({ ...q, id: `e${i}-${j}`, explication: '' })) : [])),
        ],
        lecon: { cours: c, total: l.cours.length, chapitreTitre: l.titre },
      }),
    ),
  }
  const cible = matieres.flatMap((m) => m.blocs).find((b) => b.id === (l.bloc ?? BLOC_PAR_DEFAUT[l.id] ?? 'b1'))
  if (cible) cible.chapitres.unshift(chapitre)
}

export interface FicheRef {
  fiche: Fiche
  matiere: Matiere
  blocId: string
  blocTitre: string
  chapitreTitre: string
}

export const toutesLesFiches: FicheRef[] = matieres.flatMap((matiere) =>
  matiere.blocs.flatMap((bloc) =>
    bloc.chapitres.flatMap((ch) =>
      ch.fiches.map((fiche) => ({ fiche, matiere, blocId: bloc.id, blocTitre: bloc.titre, chapitreTitre: ch.titre })),
    ),
  ),
)

export const ficheParId = new Map(toutesLesFiches.map((r) => [r.fiche.id, r]))

export const carteId = (ficheId: string, carte: string) => `${ficheId}.${carte}`
