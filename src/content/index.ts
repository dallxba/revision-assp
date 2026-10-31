import type { Chapitre, Fiche, Matiere } from './types'
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
