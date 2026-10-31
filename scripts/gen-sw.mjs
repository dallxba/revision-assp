// Génère dist/sw.js après le build : met en cache tous les fichiers produits
// pour que l'appli fonctionne hors connexion.
import { readdirSync, statSync, writeFileSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { createHash } from 'node:crypto'

const dist = new URL('../dist/', import.meta.url).pathname
const files = []
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else files.push(relative(dist, p))
  }
}
walk(dist)
const assets = files.filter((f) => f !== 'sw.js' && f !== 'robots.txt')
const hash = createHash('sha256')
for (const f of assets) hash.update(f).update(readFileSync(join(dist, f)))
const version = hash.digest('hex').slice(0, 12)

const sw = `// Généré automatiquement par scripts/gen-sw.mjs
const CACHE = 'assp-${version}'
const ASSETS = ${JSON.stringify(['./', ...assets.filter((f) => f !== 'index.html')], null, 2)}

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('message', (event) => {
  if (event.data === 'skip-waiting') self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return
  if (req.mode === 'navigate') {
    // Page : réseau d'abord (pour avoir la dernière version), cache si hors ligne.
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put('./', copy))
          return res
        })
        .catch(() => caches.match('./')),
    )
    return
  }
  event.respondWith(caches.match(req).then((hit) => hit || fetch(req)))
})
`
writeFileSync(join(dist, 'sw.js'), sw)
console.log(`sw.js : ${assets.length} fichiers, version ${version}`)
