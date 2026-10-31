// Copie les chapitres rédigés dans le dossier du projet vers contenu/chapitres/.
// Usage : npm run sync [-- /chemin/vers/cours]
import { copyFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const source = process.argv[2] ?? '/mnt/project-files/bac-pro-assp/cours'
const cible = new URL('../contenu/chapitres/', import.meta.url).pathname
let n = 0
for (const dossier of readdirSync(source)) {
  const chemin = join(source, dossier)
  if (!statSync(chemin).isDirectory()) continue
  const fichier = join(chemin, `${dossier}.md`)
  if (!existsSync(fichier)) continue
  copyFileSync(fichier, join(cible, `${dossier}.md`))
  n++
}
console.log(`${n} chapitre(s) copié(s) depuis ${source}`)
