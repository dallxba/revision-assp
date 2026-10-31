// Convertit les chapitres Markdown de contenu/chapitres/*.md en données pour l'appli
// (src/content/generated/chapitres.json). Lancé automatiquement avant le build.
//
// Format d'un chapitre :
//   frontmatter YAML : id, titre, bloc, chapitre, annees, domaine, epreuves, sources, verifiee
//   ## Partie N — Titre {#pN}      → une fiche (cours + ### Cartes + ### Quiz en ```quiz YAML)
//   ## Exercices / ## Corrigés     → une fiche « Exercices », corrigés repliables
//   ## Fiche mémo                  → une fiche « Fiche mémo »
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { parse as parseYaml } from 'yaml'

const racine = new URL('..', import.meta.url).pathname
const dossier = join(racine, 'contenu/chapitres')
const sortie = join(racine, 'src/content/generated')

const erreurs = []
const echec = (fichier, msg) => erreurs.push(`${fichier} : ${msg}`)

/** Découpe un texte Markdown en sections selon les titres d'un niveau donné (hors blocs de code). */
const sections = (texte, niveau) => {
  const re = new RegExp(`^${'#'.repeat(niveau)} (.+)$`)
  const res = []
  let courant = { titre: null, lignes: [] }
  let dansCode = false
  for (const ligne of texte.split('\n')) {
    if (/^```/.test(ligne)) dansCode = !dansCode
    const m = !dansCode && ligne.match(re)
    if (m) {
      res.push(courant)
      courant = { titre: m[1].trim(), lignes: [] }
    } else courant.lignes.push(ligne)
  }
  res.push(courant)
  return res.map((s) => ({ titre: s.titre, corps: s.lignes.join('\n').trim() }))
}

/** Remonte chaque titre d'un niveau (### → ##), hors blocs de code. */
const remonterTitres = (texte) => {
  let dansCode = false
  return texte
    .split('\n')
    .map((l) => {
      if (/^```/.test(l)) dansCode = !dansCode
      return !dansCode && /^#{3,6} /.test(l) ? l.slice(1) : l
    })
    .join('\n')
}

const replier = (resume, md) => `<details class="replie"><summary>${resume}</summary>\n\n${md.trim()}\n\n</details>`

/** Dans une section « Je vérifie », tout ce qui suit « **Réponses :** » devient repliable. */
const replierReponses = (md) => {
  const i = md.search(/^\*\*Réponses ?:\*\*/m)
  if (i < 0) return md
  return md.slice(0, i) + replier('Voir les réponses', md.slice(i).replace(/^\*\*Réponses ?:\*\*\s*/, ''))
}

const idAncre = (titre) => {
  const m = titre.match(/^(.*?)\s*\{#([a-z0-9-]+)\}\s*$/i)
  return m ? { titre: m[1].trim(), id: m[2] } : { titre: titre.trim(), id: null }
}

const lireCartes = (fichier, md) => {
  const cartes = []
  for (const ligne of md.split('\n')) {
    if (!ligne.trim()) continue
    const m = ligne.match(/^-\s+\*\*Q\s*:\*\*\s*(.+?)\s+—\s+\*\*R\s*:\*\*\s*(.+?)\s*\{#([a-z0-9-]+)\}\s*$/i)
    if (!m) {
      echec(fichier, `carte illisible : « ${ligne.slice(0, 80)} »`)
      continue
    }
    cartes.push({ id: m[3], q: m[1], r: m[2] })
  }
  return cartes
}

const lireQuiz = (fichier, md) => {
  const m = md.match(/```quiz\n([\s\S]*?)```/)
  if (!m) return []
  let data
  try {
    data = parseYaml(m[1])
  } catch (e) {
    echec(fichier, `quiz : YAML invalide (${e.message.split('\n')[0]})`)
    return []
  }
  return (data ?? []).filter((q) => {
    const ok =
      q && typeof q.id === 'string' && typeof q.q === 'string' && Array.isArray(q.choix) && Number.isInteger(q.bonne) && q.bonne >= 0 && q.bonne < q.choix.length
    if (!ok) echec(fichier, `question de quiz incomplète : ${JSON.stringify(q).slice(0, 80)}`)
    return ok
  }).map((q) => ({ id: q.id, q: q.q, choix: q.choix.map(String), bonne: q.bonne, explication: String(q.explication ?? '') }))
}

const chapitres = []
const fichiers = (() => {
  try {
    return readdirSync(dossier).filter((f) => f.endsWith('.md')).sort()
  } catch {
    return []
  }
})()

for (const nom of fichiers) {
  const texte = readFileSync(join(dossier, nom), 'utf8')
  const fm = texte.match(/^---\n([\s\S]*?)\n---\n/)
  if (!fm) {
    echec(nom, 'frontmatter manquant')
    continue
  }
  const meta = parseYaml(fm[1])
  for (const champ of ['id', 'titre', 'bloc', 'annees', 'domaine']) if (!meta[champ]) echec(nom, `champ « ${champ} » manquant`)
  const commun = {
    annees: meta.annees ?? [],
    domaine: meta.domaine ?? '',
    epreuves: meta.epreuves ?? [],
    sources: meta.sources ?? [],
    verifiee: meta.verifiee === true,
  }
  const fiches = []
  let exercices = null
  let corriges = null
  let memo = null
  for (const s of sections(texte.slice(fm[0].length), 2)) {
    if (!s.titre) continue
    if (/^Partie\b/i.test(s.titre)) {
      const { titre, id } = idAncre(s.titre)
      if (!id) {
        echec(nom, `partie sans id {#pN} : « ${s.titre} »`)
        continue
      }
      const sous = sections(s.corps, 3)
      const cartes = sous.filter((x) => x.titre === 'Cartes').flatMap((x) => lireCartes(nom, x.corps))
      const quiz = sous.filter((x) => x.titre === 'Quiz').flatMap((x) => lireQuiz(nom, x.corps))
      const cours = sous
        .filter((x) => x.titre !== 'Cartes' && x.titre !== 'Quiz')
        .map((x) => (x.titre ? `### ${x.titre}\n\n${/^Je v[ée]rifie/i.test(x.titre) ? replierReponses(x.corps) : x.corps}` : x.corps))
        .join('\n\n')
      fiches.push({
        id: `${meta.id}-${id}`,
        titre: titre.replace(/^Partie\s+\d+\s*[—–-]\s*/i, ''),
        ...commun,
        cours: remonterTitres(cours),
        cartes,
        quiz,
      })
    } else if (/^Exercices/i.test(s.titre)) exercices = s.corps
    else if (/^Corrig/i.test(s.titre)) corriges = s.corps
    else if (/^Fiche m[ée]mo/i.test(s.titre)) memo = s.corps
    else echec(nom, `section ignorée : « ${s.titre} »`)
  }
  if (exercices) {
    fiches.push({
      id: `${meta.id}-exercices`,
      titre: 'Exercices',
      ...commun,
      cours: remonterTitres(exercices) + (corriges ? `\n\n${replier('Voir les corrigés', remonterTitres(corriges))}` : ''),
      cartes: [],
      quiz: [],
    })
  }
  if (memo) {
    fiches.push({ id: `${meta.id}-memo`, titre: 'Fiche mémo', ...commun, cours: remonterTitres(memo), cartes: [], quiz: [] })
  }
  const ids = new Set()
  for (const f of fiches) {
    if (ids.has(f.id)) echec(nom, `id de fiche en double : ${f.id}`)
    ids.add(f.id)
    const c = new Set(f.cartes.map((x) => x.id))
    if (c.size !== f.cartes.length) echec(nom, `id de carte en double dans ${f.id}`)
  }
  chapitres.push({ bloc: meta.bloc, chapitre: { id: meta.id, titre: meta.titre, code: meta.code, fiches } })
}

// Écrans trop longs : on prévient sans bloquer (une notion par écran, ~90 mots).
const longs = []
for (const { chapitre } of chapitres)
  for (const f of chapitre.fiches) {
    if (!f.cartes.length && !f.quiz.length) continue
    for (const bloc of f.cours.split(/^## /m)) {
      if (/^Je v[ée]rifie/i.test(bloc)) continue
      const mots = bloc.replace(/<[^>]+>/g, ' ').split(/\s+/).filter((w) => /[\p{L}\d]/u.test(w)).length
      if (mots > 120) longs.push(`${f.id} « ${bloc.split('\n')[0].slice(0, 50)} » : ${mots} mots`)
    }
  }
if (longs.length) console.warn('Écrans de plus de 120 mots :\n- ' + longs.join('\n- '))

if (erreurs.length) {
  console.error('Contenu invalide :\n- ' + erreurs.join('\n- '))
  process.exit(1)
}

mkdirSync(sortie, { recursive: true })
writeFileSync(join(sortie, 'chapitres.json'), JSON.stringify(chapitres, null, 1))
console.log(`contenu : ${chapitres.length} chapitre(s), ${chapitres.reduce((n, c) => n + c.chapitre.fiches.length, 0)} fiche(s)`)
