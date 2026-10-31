import type { Bloc } from './types'

/*
 * Bloc 4 — Réaliser des actions d'éducation à la santé (épreuve E2).
 *
 * Contenu rédigé par Claude à partir de connaissances générales et des corrigés
 * E2 2025 (métropole et Polynésie) présents dans le dossier du projet.
 * Toutes les fiches sont marquées `verifiee: false` : elles doivent être
 * comparées au cours d'une élève avant d'être considérées comme fiables.
 */

const CORRIGE_2025 = 'Corrigé E2 métropole 2025 (bacpro-assp.fr), structure et attendus'
const CORRIGE_POLY_2025 = 'Corrigé E2 Polynésie 2025 (bacpro-assp.fr), compétences 4.1.1, 4.1.2, 4.2.2, 4.3.1'

export const bloc4: Bloc = {
  id: 'b4',
  titre: 'Bloc 4 · Éducation à la santé',
  sousTitre: "Réaliser des actions d'éducation à la santé pour un public ciblé, dans un contexte donné",
  epreuve: 'E2 · écrit 4 h · coef. 4',
  chapitres: [
    {
      id: 'b4-epreuve',
      titre: "Comprendre l'épreuve E2",
      fiches: [
        {
          id: 'e2-format',
          titre: "Comment se passe l'épreuve E2",
          annees: ['1re', 'Tle'],
          domaine: 'Méthodologie',
          epreuves: ['E2'],
          sources: [
            "Guide d'accompagnement pédagogique Bac Pro ASSP, académie de Grenoble, 2023",
            CORRIGE_2025,
          ],
          verifiee: false,
          cours: `L'E2 est un **écrit de 4 heures, coefficient 4**, noté sur **80 points**, en fin de terminale. Le sujet donne un **contexte** (un établissement, un public) et un **dossier technique** de documents à exploiter.

## Les trois temps du sujet

En 2025, le sujet suivait la démarche d'une action d'éducation à la santé :

1. **Analyse des besoins** d'un public dans un contexte donné : exploiter des documents, présenter la structure, construire un outil de recueil (questionnaire), et des questions de biologie ou de pathologie liées au thème.
2. **Conception d'une action** : remplir une fiche action, citer des partenaires, réaliser la maquette d'un support.
3. **Mise en œuvre et évaluation** : posture professionnelle, critères d'évaluation, auto-évaluation, valorisation, compte rendu.

## Ce qui rapporte des points

- Les questions longues valent beaucoup : en 2025, la fiche action valait 14 points, la maquette du support 10, le questionnaire 8.
- Les verbes de consigne comptent : *énoncer* = lister sans expliquer, *expliquer* = donner le pourquoi, *justifier* = argumenter avec le document.
- Toujours **s'appuyer sur le contexte** : un support générique, sans lien avec le public du sujet, perd des points.

> À vérifier avec ton prof : la structure peut changer d'une session à l'autre. Elle est tirée des sujets 2025.`,
          cartes: [
            { id: 'c1', q: "Durée et coefficient de l'épreuve E2 ?", r: '4 heures, coefficient 4 (noté sur 80 points).' },
            { id: 'c2', q: 'Quelles sont les trois grandes parties du sujet E2 2025 ?', r: "1. Analyse des besoins · 2. Conception de l'action · 3. Mise en œuvre et évaluation." },
            { id: 'c3', q: 'Que demande le verbe « énoncer » ?', r: 'Lister les éléments, sans les expliquer.' },
            { id: 'c4', q: 'Que demande le verbe « justifier » ?', r: "Donner les raisons, en s'appuyant sur le contexte ou les documents." },
            { id: 'c5', q: "Quel bloc de compétences l'E2 évalue-t-elle ?", r: "Le bloc 4 : réaliser des actions d'éducation à la santé." },
          ],
          quiz: [
            {
              id: 'q1',
              q: "Dans le sujet E2 2025, quelle question valait le plus de points ?",
              choix: ['Le questionnaire', 'La fiche action', 'La maquette du support', 'Le schéma à annoter'],
              bonne: 1,
              explication: 'La fiche action valait 14 points, la maquette 10, le questionnaire 8 et le schéma 6.',
            },
            {
              id: 'q2',
              q: "« Expliquer l'intérêt du Plan Bleu pour cet EHPAD. » Que faut-il faire ?",
              choix: ['Citer le nom du plan', 'Donner le pourquoi, en lien avec cet EHPAD', 'Recopier le document', 'Faire un schéma'],
              bonne: 1,
              explication: 'Expliquer = donner les raisons. Et « pour cet EHPAD » oblige à relier au contexte du sujet.',
            },
            {
              id: 'q3',
              q: 'Comment est évaluée l\'E2 ?',
              choix: ['En CCF pendant la PFMP', 'À l\'oral en terminale', 'À l\'écrit, en épreuve ponctuelle', 'Sur dossier'],
              bonne: 2,
              explication: "L'E2 est la seule épreuve professionnelle ponctuelle écrite. E31, E32 et E33 sont en CCF.",
            },
          ],
        },
      ],
    },
    {
      id: 'b4-bases',
      titre: 'Les bases : santé et prévention',
      fiches: [
        {
          id: 'sante-determinants',
          titre: 'La santé et ses déterminants',
          annees: ['2de', '1re', 'Tle'],
          domaine: 'Sciences médico-sociales',
          epreuves: ['E2'],
          sources: ['Préambule de la Constitution de l\'OMS (1946)'],
          verifiee: false,
          cours: `## Définition de la santé (OMS, 1946)

> « La santé est un état de complet bien-être physique, mental et social, et ne consiste pas seulement en une absence de maladie ou d'infirmité. »

Cette définition a deux idées à retenir :

- la santé a **trois dimensions** : physique, mentale, sociale ;
- être en bonne santé, ce n'est **pas seulement** ne pas être malade.

## Les déterminants de la santé

Ce sont les facteurs qui influencent l'état de santé d'une personne ou d'une population.

| Déterminant | Exemples |
| --- | --- |
| Biologiques | âge, sexe, hérédité |
| Comportements, modes de vie | alimentation, activité physique, tabac, alcool, sommeil |
| Environnement physique | qualité de l'air, logement, chaleur, bruit |
| Socio-économiques | revenus, emploi, niveau d'études, isolement |
| Système de santé | accès aux soins, distance, coût |

Une action d'éducation à la santé agit surtout sur les **comportements**, mais elle doit tenir compte des autres déterminants : on ne conseille pas la même chose à une personne isolée sans revenus qu'à une personne bien entourée.`,
          cartes: [
            { id: 'c1', q: 'Définition de la santé selon l\'OMS (1946) ?', r: "Un état de complet bien-être physique, mental et social, et pas seulement l'absence de maladie ou d'infirmité." },
            { id: 'c2', q: 'Quelles sont les trois dimensions de la santé selon l\'OMS ?', r: 'Physique, mentale, sociale.' },
            { id: 'c3', q: "Qu'est-ce qu'un déterminant de la santé ?", r: "Un facteur qui influence l'état de santé d'une personne ou d'une population." },
            { id: 'c4', q: 'Cite 4 grandes familles de déterminants de la santé.', r: 'Biologiques, comportements (modes de vie), environnement physique, socio-économiques (et système de santé).' },
            { id: 'c5', q: 'Dans quelle famille range-t-on l\'isolement social ?', r: 'Les déterminants socio-économiques.' },
          ],
          quiz: [
            {
              id: 'q1',
              q: "Selon l'OMS, une personne sans maladie mais très isolée et déprimée est-elle en bonne santé ?",
              choix: ['Oui, car elle n\'est pas malade', 'Non, car il manque le bien-être mental et social', 'Oui, si elle a moins de 60 ans', 'On ne peut pas savoir'],
              bonne: 1,
              explication: "La santé selon l'OMS ne se limite pas à l'absence de maladie : il faut aussi le bien-être mental et social.",
            },
            {
              id: 'q2',
              q: 'La canicule est un déterminant de quel type ?',
              choix: ['Biologique', 'Comportemental', 'Environnement physique', 'Système de santé'],
              bonne: 2,
              explication: "La chaleur fait partie de l'environnement physique.",
            },
            {
              id: 'q3',
              q: "L'âge avancé d'un résident d'EHPAD est un déterminant :",
              choix: ['Biologique', 'Socio-économique', 'Environnemental', 'Comportemental'],
              bonne: 0,
              explication: "L'âge, le sexe et l'hérédité sont des déterminants biologiques : on ne peut pas agir dessus.",
            },
          ],
        },
        {
          id: 'prevention-niveaux',
          titre: 'Les trois niveaux de prévention',
          annees: ['2de', '1re', 'Tle'],
          domaine: 'Sciences médico-sociales',
          epreuves: ['E2', 'PSE'],
          sources: ['Classification de l\'OMS (prévention primaire, secondaire, tertiaire)'],
          verifiee: false,
          cours: `La prévention regroupe les actions qui visent à **éviter l'apparition, l'aggravation ou les complications** d'une maladie. L'OMS distingue trois niveaux, selon le moment où l'on agit.

| Niveau | Quand ? | But | Exemples |
| --- | --- | --- | --- |
| **Primaire** | Avant la maladie | Empêcher son apparition (réduire le nombre de nouveaux cas) | vaccination, lavage des mains, hydratation pendant une canicule |
| **Secondaire** | Au tout début, souvent sans symptôme | Dépister tôt pour soigner tôt | dépistage du cancer du sein, frottis, test de glycémie |
| **Tertiaire** | Maladie installée | Limiter les complications, les rechutes, le handicap | rééducation après un AVC, éducation thérapeutique d'un diabétique |

## Astuce pour ne pas se tromper

Pose-toi la question : **la personne est-elle déjà malade ?**

- Non → primaire.
- Oui, mais on ne le sait pas encore → secondaire (dépistage).
- Oui, et on le sait → tertiaire.`,
          cartes: [
            { id: 'c1', q: 'But de la prévention primaire ?', r: "Empêcher l'apparition de la maladie (réduire le nombre de nouveaux cas)." },
            { id: 'c2', q: 'But de la prévention secondaire ?', r: 'Dépister la maladie à un stade précoce pour la soigner plus tôt.' },
            { id: 'c3', q: 'But de la prévention tertiaire ?', r: 'Limiter les complications, les rechutes et le handicap d\'une maladie installée.' },
            { id: 'c4', q: 'La vaccination relève de quel niveau de prévention ?', r: 'Primaire.' },
            { id: 'c5', q: 'Un dépistage relève de quel niveau de prévention ?', r: 'Secondaire.' },
            { id: 'c6', q: 'La rééducation après un AVC relève de quel niveau ?', r: 'Tertiaire.' },
          ],
          quiz: [
            {
              id: 'q1',
              q: "Faire boire régulièrement les résidents d'un EHPAD pendant une canicule, c'est de la prévention :",
              choix: ['Primaire', 'Secondaire', 'Tertiaire'],
              bonne: 0,
              explication: "On agit avant l'apparition de la déshydratation : c'est de la prévention primaire.",
            },
            {
              id: 'q2',
              q: 'Un test de glycémie proposé à tous les adultes d\'une entreprise, c\'est de la prévention :',
              choix: ['Primaire', 'Secondaire', 'Tertiaire'],
              bonne: 1,
              explication: "C'est un dépistage : on cherche une maladie qui existe peut-être déjà sans symptôme.",
            },
            {
              id: 'q3',
              q: 'Apprendre à une personne diabétique à surveiller ses pieds, c\'est de la prévention :',
              choix: ['Primaire', 'Secondaire', 'Tertiaire'],
              bonne: 2,
              explication: 'La maladie est connue : on cherche à éviter ses complications.',
            },
          ],
        },
        {
          id: 'education-promotion',
          titre: 'Éducation pour la santé et promotion de la santé',
          annees: ['1re', 'Tle'],
          domaine: 'Sciences médico-sociales',
          epreuves: ['E2'],
          sources: ['Charte d\'Ottawa pour la promotion de la santé (OMS, 1986)'],
          verifiee: false,
          cours: `## Deux notions proches mais différentes

- **Éducation pour la santé** : aider une personne ou un groupe à acquérir des **connaissances** et des **compétences** pour faire des choix favorables à sa santé. Elle s'adresse aux individus.
- **Promotion de la santé** : notion **plus large**. Selon la Charte d'Ottawa (1986), c'est le processus qui donne aux populations les moyens d'avoir **plus de contrôle sur leur propre santé** et de l'améliorer. Elle agit aussi sur l'environnement et les politiques.

L'éducation pour la santé est donc **une partie** de la promotion de la santé.

## Les 5 axes de la Charte d'Ottawa

1. Élaborer une politique publique saine.
2. Créer des milieux favorables.
3. Renforcer l'action communautaire.
4. Acquérir des aptitudes individuelles.
5. Réorienter les services de santé.

Une action d'éducation à la santé, comme celles de l'E2, correspond surtout à l'axe 4 : **acquérir des aptitudes individuelles**.

## Ce qu'une bonne action n'est pas

Une action d'éducation à la santé **ne culpabilise pas** et **n'impose pas**. Elle informe, fait réfléchir, et laisse la personne libre de ses choix.`,
          cartes: [
            { id: 'c1', q: "Qu'est-ce que l'éducation pour la santé ?", r: 'Aider une personne ou un groupe à acquérir des connaissances et des compétences pour faire des choix favorables à sa santé.' },
            { id: 'c2', q: 'Quel texte définit la promotion de la santé, et en quelle année ?', r: "La Charte d'Ottawa, OMS, 1986." },
            { id: 'c3', q: 'Lequel est le plus large : éducation pour la santé ou promotion de la santé ?', r: "La promotion de la santé. L'éducation pour la santé en fait partie." },
            { id: 'c4', q: "Cite les 5 axes de la Charte d'Ottawa.", r: 'Politique publique saine · milieux favorables · action communautaire · aptitudes individuelles · réorienter les services de santé.' },
            { id: 'c5', q: "À quel axe d'Ottawa correspond surtout une action d'éducation à la santé ?", r: 'Acquérir des aptitudes individuelles.' },
          ],
          quiz: [
            {
              id: 'q1',
              q: 'Installer des fontaines à eau dans tous les couloirs d\'un EHPAD, c\'est surtout :',
              choix: ['Créer un milieu favorable', 'Réorienter les services de santé', 'Une politique publique', 'Une action communautaire'],
              bonne: 0,
              explication: "On modifie l'environnement pour que le bon comportement soit plus facile.",
            },
            {
              id: 'q2',
              q: "Quelle phrase décrit le mieux une action d'éducation à la santé ?",
              choix: ['Interdire le sucre aux résidents', 'Informer et faire réfléchir, en laissant la personne libre', 'Faire peur pour convaincre', 'Distribuer des médicaments'],
              bonne: 1,
              explication: "L'éducation à la santé informe sans culpabiliser ni imposer.",
            },
          ],
        },
      ],
    },
    {
      id: 'b4-besoins',
      titre: 'Analyser les besoins',
      code: '4.1',
      fiches: [
        {
          id: 'outil-recueil',
          titre: 'Concevoir un questionnaire',
          annees: ['1re', 'Tle'],
          domaine: 'Méthodologie',
          epreuves: ['E2'],
          sources: [CORRIGE_2025, CORRIGE_POLY_2025],
          verifiee: false,
          cours: `Le questionnaire est l'outil de recueil le plus demandé à l'E2 (8 points en 2025). Il sert à **connaître les besoins réels du public** avant de construire l'action.

## La structure attendue

1. **Un titre** clair.
2. **Une introduction** : qui fait l'enquête, pourquoi, que les réponses sont **anonymes**, combien de temps ça prend.
3. **Une consigne** : comment répondre (cocher une case, une seule réponse, etc.).
4. **Des questions numérotées**, en lien avec le thème du sujet.
5. **Des remerciements**.

En 2025, le corrigé attendait au moins 4 questions, dont 3 en lien direct avec le thème (la déshydratation).

## Types de questions

| Type | Exemple | Intérêt |
| --- | --- | --- |
| Fermée (oui / non) | « Avez-vous souvent soif ? » | rapide, facile à dépouiller |
| À choix multiples | « Combien de verres d'eau buvez-vous par jour ? 1-2 / 3-5 / 6 et + » | chiffrable |
| Échelle | « De 1 à 5, aimez-vous l'eau plate ? » | mesure une opinion |
| Ouverte | « Quelles boissons préférez-vous ? » | réponses riches, mais longues à analyser |

## Adapter au public

- Pour des personnes âgées : questions courtes, gros caractères, vocabulaire simple, éventuellement questionnaire **lu à voix haute** (entretien).
- Pour des enfants : images, smileys.
- Aller **du général au particulier**, garder les questions personnelles (âge, traitement) pour la fin.`,
          cartes: [
            { id: 'c1', q: "À quoi sert un outil de recueil dans une action d'éducation à la santé ?", r: "À connaître les besoins réels du public avant de concevoir l'action." },
            { id: 'c2', q: "Que doit contenir l'introduction d'un questionnaire ?", r: "Qui fait l'enquête, pourquoi, l'anonymat des réponses, la durée." },
            { id: 'c3', q: 'Cite les 5 éléments de structure d\'un questionnaire.', r: 'Titre · introduction · consigne · questions numérotées · remerciements.' },
            { id: 'c4', q: "Avantage d'une question fermée ?", r: 'Rapide à remplir et facile à dépouiller (chiffrer).' },
            { id: 'c5', q: "Avantage et limite d'une question ouverte ?", r: 'Réponses riches et variées, mais longues à analyser.' },
          ],
          quiz: [
            {
              id: 'q1',
              q: "Lequel de ces éléments manque le plus souvent et coûte des points ?",
              choix: ['La couleur', "L'introduction avec l'anonymat", 'Un dessin', 'La signature du candidat'],
              bonne: 1,
              explication: "Le corrigé 2025 évaluait la structure : introduction, consigne, questions numérotées, remerciements.",
            },
            {
              id: 'q2',
              q: '« Combien de verres d\'eau buvez-vous par jour ? 1-2 / 3-5 / 6 et plus » est une question :',
              choix: ['Ouverte', 'À choix multiples', "À échelle d'opinion", 'Oui / non'],
              bonne: 1,
              explication: 'On choisit une réponse parmi plusieurs proposées.',
            },
            {
              id: 'q3',
              q: 'Pour des résidents âgés malvoyants, le mieux est :',
              choix: ['Un questionnaire en ligne', 'Un questionnaire lu à voix haute, questions courtes', 'Beaucoup de questions ouvertes', 'Petits caractères pour tout faire tenir'],
              bonne: 1,
              explication: "L'outil doit être adapté au public : ici, oralité et simplicité.",
            },
          ],
        },
        {
          id: 'besoins-priorites',
          titre: 'Repérer et hiérarchiser les besoins',
          annees: ['1re', 'Tle'],
          domaine: 'Méthodologie',
          epreuves: ['E2'],
          sources: [CORRIGE_POLY_2025],
          verifiee: false,
          cours: `Après le recueil, on fait le **diagnostic** : quels sont les problèmes de santé de ce public, et lequel traiter en premier ?

## D'où viennent les informations

- Les **documents** du dossier technique : statistiques, articles, projet d'établissement.
- Le **recueil** auprès du public : questionnaire, entretien, observation.
- Les **professionnels** : infirmier, médecin coordonnateur, équipe.

## Hiérarchiser : quels critères ?

On classe les besoins pour choisir une **priorité**. Critères possibles :

- **gravité** des conséquences (risque vital, chute, hospitalisation) ;
- **fréquence** (combien de personnes sont concernées) ;
- **urgence** (canicule annoncée la semaine prochaine) ;
- **demande** du public ou de l'équipe ;
- **faisabilité** : moyens, temps, compétences disponibles.

## À l'écrit

Quand le sujet demande de « repérer et justifier » un besoin prioritaire, il faut **citer le document** et **donner le critère** : « La déshydratation est prioritaire car elle est fréquente chez les résidents (document 2) et peut entraîner une hospitalisation. »`,
          cartes: [
            { id: 'c1', q: 'Cite 3 sources d\'informations pour analyser les besoins d\'un public.', r: 'Les documents (statistiques, projet d\'établissement), le recueil auprès du public, les professionnels.' },
            { id: 'c2', q: 'Cite 4 critères pour hiérarchiser des besoins.', r: 'Gravité, fréquence, urgence, demande du public, faisabilité.' },
            { id: 'c3', q: 'Comment bien justifier un besoin prioritaire à l\'écrit ?', r: 'Citer le document du dossier et donner le critère utilisé (gravité, fréquence...).' },
          ],
          quiz: [
            {
              id: 'q1',
              q: "« 3 résidents sur 4 boivent moins d'un litre par jour » justifie la priorité par :",
              choix: ['La gravité', 'La fréquence', 'La faisabilité', "L'urgence"],
              bonne: 1,
              explication: 'On parle du nombre de personnes concernées : la fréquence.',
            },
            {
              id: 'q2',
              q: 'Une vigilance canicule orange annoncée pour la semaine prochaine renforce le critère :',
              choix: ['Fréquence', 'Demande', 'Urgence', 'Faisabilité'],
              bonne: 2,
              explication: "Le risque arrive vite : il faut agir rapidement.",
            },
          ],
        },
      ],
    },
    {
      id: 'b4-concevoir',
      titre: "Concevoir l'action",
      code: '4.2',
      fiches: [
        {
          id: 'fiche-action',
          titre: 'Objectifs et fiche action',
          annees: ['1re', 'Tle'],
          domaine: 'Méthodologie',
          epreuves: ['E2'],
          sources: [CORRIGE_2025],
          verifiee: false,
          cours: `La fiche action est la question la plus lourde de l'E2 (14 points en 2025). Elle doit être **complète** et **cohérente avec le contexte**.

## Les objectifs

- **Objectif général** : le but global, à long terme. *Ex. : prévenir la déshydratation des résidents pendant l'été.*
- **Objectifs spécifiques / opérationnels** : ce que le public saura ou fera à la fin, concrets et mesurables. *Ex. : à la fin de l'atelier, chaque résident sait citer 3 signes de déshydratation.*

Un objectif s'écrit avec un **verbe d'action à l'infinitif** (citer, reconnaître, boire, utiliser) et doit être **SMART** :

- **S**pécifique
- **M**esurable
- **A**tteignable (acceptable)
- **R**éaliste
- **T**emporellement défini (une date, une durée)

## Ce que contient une fiche action

| Rubrique | Exemple (canicule en EHPAD) |
| --- | --- |
| Intitulé | « Bien boire, bien vivre l'été » |
| Public | 15 résidents autonomes de l'EHPAD |
| Objectifs | général + opérationnels |
| Date, durée, lieu | 20 juin, 45 min, salle d'animation climatisée |
| Intervenants, partenaires | assistant de soins, aide-soignant référent hydratation, diététicienne |
| Moyens | humains, matériels (affiche, verres colorés, carafes), financiers |
| Déroulement | accueil, quiz, dégustation d'eaux aromatisées, bilan |
| Évaluation | critères et indicateurs (voir fiche Évaluer) |

Le piège : une fiche action **générique**. Chaque case doit reprendre le public, le lieu et le thème du sujet.`,
          cartes: [
            { id: 'c1', q: 'Différence entre objectif général et objectif opérationnel ?', r: 'Général : le but global à long terme. Opérationnel : ce que le public saura ou fera, concret et mesurable.' },
            { id: 'c2', q: 'Que veut dire SMART ?', r: 'Spécifique, Mesurable, Atteignable, Réaliste, Temporellement défini.' },
            { id: 'c3', q: 'Comment commence la formulation d\'un objectif ?', r: "Par un verbe d'action à l'infinitif (citer, reconnaître, utiliser...)." },
            { id: 'c4', q: 'Cite 6 rubriques d\'une fiche action.', r: 'Intitulé, public, objectifs, date/durée/lieu, intervenants et partenaires, moyens, déroulement, évaluation.' },
            { id: 'c5', q: 'Quels sont les 3 types de moyens ?', r: 'Humains, matériels, financiers.' },
          ],
          quiz: [
            {
              id: 'q1',
              q: 'Lequel est un objectif opérationnel bien formulé ?',
              choix: [
                'Améliorer la santé des résidents',
                "À la fin de l'atelier, chaque résident sait citer 3 signes de déshydratation",
                'Parler de l\'eau',
                'Sensibiliser à la canicule',
              ],
              bonne: 1,
              explication: "C'est précis, mesurable et daté (« à la fin de l'atelier »). Les autres sont trop vagues.",
            },
            {
              id: 'q2',
              q: '« Prévenir la déshydratation des résidents pendant l\'été » est :',
              choix: ['Un objectif général', 'Un objectif opérationnel', 'Un critère d\'évaluation', 'Un moyen'],
              bonne: 0,
              explication: "C'est le but global, pas une action mesurable précise.",
            },
            {
              id: 'q3',
              q: 'Des carafes et des verres colorés sont des moyens :',
              choix: ['Humains', 'Matériels', 'Financiers', 'Partenaires'],
              bonne: 1,
              explication: 'Ce sont des objets : moyens matériels.',
            },
          ],
        },
        {
          id: 'supports-prevention',
          titre: 'Élaborer un support de prévention',
          annees: ['1re', 'Tle'],
          domaine: 'Méthodologie',
          epreuves: ['E2'],
          sources: [CORRIGE_2025, CORRIGE_POLY_2025],
          verifiee: false,
          cours: `L'E2 demande souvent la **maquette** d'un support (10 points en 2025) : affiche, dépliant, flyer.

## Les règles d'un bon support

- **Un titre court et accrocheur**, visible de loin.
- **Un message simple** : quelques idées clés, pas un roman.
- **Lisible** : gros caractères, contraste fort, peu de couleurs différentes.
- **Illustré** : images ou pictogrammes qui aident à comprendre.
- **Adapté au public** : vocabulaire, taille du texte, langue. Pour certains publics, le **FALC** (Facile à lire et à comprendre).
- **Les infos pratiques** : date, heure, lieu de l'action, contact.
- **Positif** : dire ce qu'il faut faire plutôt que faire peur.

## Choisir le bon support

| Support | Quand l'utiliser |
| --- | --- |
| Affiche | annoncer l'action, rappeler un message dans un lieu de passage |
| Dépliant | laisser une trace écrite que la personne garde |
| Jeu, quiz | rendre l'atelier actif et vérifier ce qui est compris |
| Diaporama, vidéo | présenter à un groupe |

À l'écrit, **justifie ton choix** : « Le dépliant permet aux résidents de garder une trace écrite des conseils. »`,
          cartes: [
            { id: 'c1', q: 'Cite 5 règles d\'un bon support de prévention.', r: 'Titre accrocheur, message simple, lisible (gros caractères, contraste), illustré, adapté au public, infos pratiques, positif.' },
            { id: 'c2', q: 'Que veut dire FALC ?', r: 'Facile à lire et à comprendre.' },
            { id: 'c3', q: "Intérêt d'un dépliant par rapport à une affiche ?", r: 'La personne garde une trace écrite des conseils.' },
            { id: 'c4', q: "Pourquoi éviter un message qui fait peur ?", r: 'Il peut culpabiliser ou décourager ; un message positif dit ce qu\'il faut faire.' },
          ],
          quiz: [
            {
              id: 'q1',
              q: 'Pour une affiche destinée à des résidents âgés, le plus important est :',
              choix: ['Beaucoup de texte détaillé', 'Gros caractères et fort contraste', 'Un maximum de couleurs', 'Un vocabulaire médical précis'],
              bonne: 1,
              explication: 'La lisibilité passe avant tout pour un public âgé.',
            },
            {
              id: 'q2',
              q: 'Quel élément ne doit pas manquer sur une affiche qui annonce un atelier ?',
              choix: ['Le nom du candidat', 'La date, l\'heure et le lieu', 'Une bibliographie', 'Le budget'],
              bonne: 1,
              explication: 'Sans infos pratiques, personne ne vient.',
            },
          ],
        },
      ],
    },
    {
      id: 'b4-evaluer',
      titre: 'Animer et évaluer',
      code: '4.3',
      fiches: [
        {
          id: 'posture-animation',
          titre: "Posture pendant l'animation",
          annees: ['1re', 'Tle'],
          domaine: 'Communication',
          epreuves: ['E2', 'E33'],
          sources: [CORRIGE_2025, CORRIGE_POLY_2025],
          verifiee: false,
          cours: `Le sujet demande souvent de « décrire la posture professionnelle » attendue pendant l'action.

## Les attitudes à citer

- **Bienveillance** et **écoute active** : laisser parler, reformuler.
- **Neutralité** et **non-jugement** : ne pas culpabiliser les mauvaises habitudes.
- **Respect** du rythme, des choix et de la dignité de chacun.
- **Discrétion** : respect de la vie privée et du secret professionnel.
- **Adaptation** : langage simple, parler fort et face à la personne si elle entend mal.
- **Calme et patience**, encourager la participation.
- Tenue professionnelle correcte.

## L'auto-évaluation

Après l'action, le professionnel s'auto-évalue : il **prend du recul** sur sa pratique, repère ses **points forts** et ses **pistes d'amélioration** pour la prochaine fois.`,
          cartes: [
            { id: 'c1', q: "Cite 5 attitudes de la posture professionnelle pendant une animation.", r: 'Bienveillance, écoute active, neutralité/non-jugement, respect, discrétion, adaptation du langage, patience.' },
            { id: 'c2', q: "Qu'est-ce que reformuler ?", r: "Redire avec ses mots ce que la personne a dit, pour vérifier qu'on a compris et montrer qu'on écoute." },
            { id: 'c3', q: "Intérêts de l'auto-évaluation pour le professionnel ?", r: "Prendre du recul, repérer ses points forts et ses pistes d'amélioration." },
          ],
          quiz: [
            {
              id: 'q1',
              q: 'Un résident dit qu\'il ne boit jamais d\'eau. La meilleure réaction :',
              choix: ['« C\'est très dangereux, vous devez boire ! »', '« Qu\'est-ce que vous aimez boire, alors ? »', 'Ne rien dire', 'Le signaler à toute l\'équipe devant les autres'],
              bonne: 1,
              explication: 'On reste neutre et on part de ses préférences, sans culpabiliser ni exposer la personne.',
            },
          ],
        },
        {
          id: 'evaluer-action',
          titre: "Évaluer et valoriser l'action",
          annees: ['1re', 'Tle'],
          domaine: 'Méthodologie',
          epreuves: ['E2'],
          sources: [CORRIGE_2025],
          verifiee: false,
          cours: `## Pourquoi évaluer ?

- Vérifier si les **objectifs** sont atteints.
- **Améliorer** l'action pour la prochaine fois.
- **Rendre compte** à l'équipe, à la direction, aux financeurs.
- **Valoriser** le travail fait.

## Critères et indicateurs

Un **critère** dit ce qu'on regarde, un **indicateur** dit comment on le mesure.

| Type | Critère | Indicateur |
| --- | --- | --- |
| Quantitatif | participation | nombre de résidents présents / invités |
| Quantitatif | connaissances | % de bonnes réponses au quiz final |
| Quantitatif | changement de comportement | quantité d'eau bue par jour, relevée sur une semaine |
| Qualitatif | satisfaction | avis des résidents (smileys, échange oral) |

Lie toujours l'évaluation aux **objectifs** de ta fiche action : si l'objectif est « citer 3 signes de déshydratation », l'indicateur est « % de résidents qui citent 3 signes à la fin ».

## Valoriser et diffuser

- **Valoriser** : article dans le journal de l'établissement, photos (avec accord), affichage des résultats, présentation en réunion d'équipe.
- **Compte rendu** : diffusé à l'équipe, à la direction, aux partenaires, par messagerie interne ou en réunion. Justifier le choix des destinataires : ceux qui doivent **poursuivre** l'action au quotidien.`,
          cartes: [
            { id: 'c1', q: "Cite 3 intérêts d'évaluer une action d'éducation à la santé.", r: 'Vérifier l\'atteinte des objectifs, améliorer l\'action, rendre compte, valoriser.' },
            { id: 'c2', q: 'Différence entre critère et indicateur ?', r: 'Le critère dit ce qu\'on regarde, l\'indicateur dit comment on le mesure.' },
            { id: 'c3', q: 'Donne un indicateur quantitatif de participation.', r: 'Nombre de participants présents par rapport au nombre d\'invités.' },
            { id: 'c4', q: 'Donne un exemple d\'évaluation qualitative.', r: 'Recueillir la satisfaction des participants (smileys, échange oral).' },
            { id: 'c5', q: 'Cite 2 moyens de valoriser une action.', r: 'Article dans le journal de l\'établissement, affichage, présentation en réunion d\'équipe.' },
          ],
          quiz: [
            {
              id: 'q1',
              q: '« 12 résidents présents sur 15 invités » est un indicateur :',
              choix: ['Qualitatif de satisfaction', 'Quantitatif de participation', 'Qualitatif de connaissances', 'Un objectif'],
              bonne: 1,
              explication: "C'est un chiffre qui mesure la participation.",
            },
            {
              id: 'q2',
              q: 'Objectif : « boire 1,5 L par jour pendant la canicule ». Le meilleur indicateur :',
              choix: ['Le nombre d\'affiches posées', 'Les quantités bues relevées chaque jour', 'Le sourire des résidents', 'La durée de l\'atelier'],
              bonne: 1,
              explication: "L'indicateur doit mesurer directement l'objectif.",
            },
          ],
        },
      ],
    },
    {
      id: 'b4-biologie',
      titre: 'Savoirs biologiques souvent mobilisés',
      fiches: [
        {
          id: 'deshydratation-pa',
          titre: 'La déshydratation chez la personne âgée',
          annees: ['1re', 'Tle'],
          domaine: 'Biologie-physiopathologie',
          epreuves: ['E2', 'E32'],
          sources: [CORRIGE_2025],
          verifiee: false,
          cours: `## Le rôle de l'eau

L'eau est le **principal constituant du corps** (environ 60 % du poids chez l'adulte, un peu moins chez la personne âgée). Elle sert à :

- **transporter** les nutriments, l'oxygène et les déchets (sang) ;
- **réguler la température** du corps (transpiration) ;
- **éliminer** les déchets (urines) ;
- **humidifier** les muqueuses et lubrifier les articulations.

## Pourquoi la personne âgée est plus à risque

- La **sensation de soif diminue** avec l'âge.
- La part d'eau dans le corps est plus faible.
- Certains **médicaments** (diurétiques) augmentent les pertes d'eau.
- La **dépendance** : difficulté à se servir à boire, troubles de la déglutition, troubles cognitifs.
- La **chaleur** et la **fièvre** augmentent les pertes.

## Signes à repérer

- bouche et langue sèches, lèvres gercées ;
- urines rares et foncées ;
- fatigue, somnolence, **confusion** ;
- perte de poids rapide ;
- vertiges, tension basse, pouls rapide ;
- la soif, souvent **absente** chez la personne âgée ;
- le pli cutané persistant, moins fiable chez la personne âgée car la peau est moins élastique.

## Conséquences possibles

Chutes, confusion, constipation, infections urinaires, **insuffisance rénale aiguë**, coup de chaleur, hospitalisation, et dans les cas graves, décès.

## Prévention (rôle de l'assistant de soins)

Proposer à boire **régulièrement sans attendre la soif**, varier les boissons (eau aromatisée, tisanes, soupes), proposer des aliments riches en eau, **noter les quantités bues**, signaler tout signe d'alerte à l'infirmier.`,
          cartes: [
            { id: 'c1', q: "Cite 3 rôles de l'eau dans l'organisme.", r: 'Transport (nutriments, déchets), régulation de la température, élimination des déchets, humidification des muqueuses.' },
            { id: 'c2', q: 'Pourquoi la personne âgée se déshydrate-t-elle plus facilement ?', r: 'Moins de sensation de soif, moins d\'eau dans le corps, médicaments (diurétiques), dépendance.' },
            { id: 'c3', q: 'Cite 5 signes de déshydratation.', r: 'Bouche sèche, urines rares et foncées, fatigue, confusion, perte de poids, vertiges, tension basse.' },
            { id: 'c4', q: 'Pourquoi ne pas attendre que la personne âgée ait soif ?', r: 'Sa sensation de soif est diminuée : quand elle a soif, elle est souvent déjà déshydratée.' },
            { id: 'c5', q: 'Cite 3 conséquences de la déshydratation chez la personne âgée.', r: 'Chutes, confusion, insuffisance rénale aiguë, infections urinaires, hospitalisation.' },
            { id: 'c6', q: "Quel est le rôle de l'assistant de soins face au risque de déshydratation ?", r: 'Proposer à boire régulièrement, varier les boissons, noter les quantités bues, signaler les signes d\'alerte à l\'infirmier.' },
          ],
          quiz: [
            {
              id: 'q1',
              q: 'Quel signe est le moins fiable chez la personne âgée ?',
              choix: ['Urines foncées', 'Confusion', 'Pli cutané persistant', 'Bouche sèche'],
              bonne: 2,
              explication: 'La peau âgée est moins élastique : le pli cutané peut persister même sans déshydratation.',
            },
            {
              id: 'q2',
              q: 'Un résident devient confus pendant la canicule. Que fais-tu en premier ?',
              choix: ['Rien, c\'est l\'âge', 'Je lui propose à boire et je préviens l\'infirmier', 'Je lui donne un médicament', 'J\'attends le lendemain'],
              bonne: 1,
              explication: 'La confusion peut être un signe de déshydratation : on agit et on transmet, sans sortir de son rôle.',
            },
            {
              id: 'q3',
              q: "Quel médicament augmente le risque de déshydratation ?",
              choix: ['Les diurétiques', 'Les vitamines', 'Le paracétamol', 'Les collyres'],
              bonne: 0,
              explication: "Les diurétiques augmentent l'élimination d'eau par les urines.",
            },
          ],
        },
      ],
    },
  ],
}
