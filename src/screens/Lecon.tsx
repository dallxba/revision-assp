import { Fragment, useMemo, useState } from 'react'
import type { FicheRef } from '../content'
import type { BlocLecon, CoursCourt, Exercice, QcmSimple } from '../content/types'
import { aller } from '../lib/route'
import { melanger } from '../lib/srs'
import { majEtat, marquerJour, useEtat } from '../lib/store'
import { Signalement } from './Fiche'
import { Icone } from './ui'
import { SchemaLecon } from './schemas'

/*
 * Lecteur d'un cours court, d'après la maquette validée :
 * partie Cours (notions, je vérifie, sur le terrain, le savais-tu, progression)
 * puis partie Pratique (vocabulaire, un exercice par écran).
 * Correction : la bonne réponse passe au vert, le choix faux au rouge, rien d'autre ne bouge.
 */

/** Texte avec **gras**, sans HTML. */
function T({ t }: { t: string }) {
  const morceaux = t.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {morceaux.map((m, i) => (i % 2 ? <b key={i}>{m}</b> : <Fragment key={i}>{m}</Fragment>))}
    </>
  )
}

function Bloc({ b }: { b: BlocLecon }) {
  if (typeof b === 'string')
    return (
      <p>
        <T t={b} />
      </p>
    )
  if ('l' in b)
    return (
      <ul>
        {b.l.map((x, i) => (
          <li key={i}>
            <T t={x} />
          </li>
        ))}
      </ul>
    )
  if ('ol' in b)
    return (
      <ol>
        {b.ol.map((x, i) => (
          <li key={i}>
            <T t={x} />
          </li>
        ))}
      </ol>
    )
  if ('ret' in b) return <Encadre classe="ret" titre="À retenir" t={b.ret} />
  if ('att' in b) return <Encadre classe="att" titre="Attention" t={b.att} />
  if ('ex' in b) return <Encadre classe="exb" titre="Par exemple" t={b.ex} />
  if ('tab' in b)
    return (
      <div className="l-tableau">
        <table>
          <thead>
            <tr>
              {b.tab[0].map((h, i) => (
                <th key={i}>
                  <T t={h} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.tab.slice(1).map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j}>
                    <T t={c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  if ('svg' in b) return <SchemaLecon nom={b.svg} />
  return null
}

function Encadre({ classe, titre, t }: { classe: string; titre: string; t: string }) {
  return (
    <div className={`l-box ${classe}`}>
      <span className="k">{titre}</span>
      <p>
        <T t={t} />
      </p>
    </div>
  )
}

/* ---------- Questions et exercices ---------- */

function Qcm({ q }: { q: QcmSimple }) {
  const [choisi, setChoisi] = useState<number | null>(null)
  return (
    <div className="l-q">
      <p className="qt">
        <T t={q.q} />
      </p>
      <div className="l-opts">
        {q.choix.map((c, j) => {
          const cls = choisi === null ? '' : j === q.bonne ? 'ok' : j === choisi ? 'ko' : ''
          return (
            <button key={j} className={`l-opt ${cls}`} disabled={choisi !== null} onClick={() => setChoisi(j)}>
              <T t={c} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function VraiFaux({ item }: { item: [string, boolean, string] }) {
  const [choisi, setChoisi] = useState<boolean | null>(null)
  const [enonce, vrai, correction] = item
  return (
    <div className="l-q">
      <p className="qt">
        <T t={enonce} />
      </p>
      <div className="l-opts deux">
        {[true, false].map((v) => {
          const cls = choisi === null ? '' : v === vrai ? 'ok' : v === choisi ? 'ko' : ''
          return (
            <button key={String(v)} className={`l-opt ${cls}`} disabled={choisi !== null} onClick={() => setChoisi(v)}>
              {v ? 'Vrai' : 'Faux'}
            </button>
          )
        })}
      </div>
      <p className="corr">{choisi !== null && <T t={correction} />}</p>
    </div>
  )
}

function Relier({ paires }: { paires: [string, string][] }) {
  const gauche = useMemo(() => melanger(paires.map((p, j) => [p[0], j] as const)), [paires])
  const droite = useMemo(() => melanger(paires.map((p, j) => [p[1], j] as const)), [paires])
  const [sel, setSel] = useState<number | null>(null)
  const [trouves, setTrouves] = useState<Set<number>>(new Set())
  const [erreur, setErreur] = useState<number | null>(null)
  const toucherDroite = (j: number) => {
    if (sel === null) return
    if (j === sel) {
      setTrouves((t) => new Set(t).add(j))
      setSel(null)
    } else {
      setErreur(j)
      setTimeout(() => setErreur((e) => (e === j ? null : e)), 600)
    }
  }
  return (
    <>
      <div className="l-pairs">
        <div className="col">
          {gauche.map(([t, j]) => (
            <button key={j} className={`l-opt ${trouves.has(j) ? 'ok' : sel === j ? 'sel' : ''}`} disabled={trouves.has(j)} onClick={() => setSel(j)}>
              <T t={t} />
            </button>
          ))}
        </div>
        <div className="col">
          {droite.map(([t, j]) => (
            <button key={j} className={`l-opt ${trouves.has(j) ? 'ok' : erreur === j ? 'ko' : ''}`} disabled={trouves.has(j)} onClick={() => toucherDroite(j)}>
              <T t={t} />
            </button>
          ))}
        </div>
      </div>
      {trouves.size === paires.length && <p className="l-fini">Toutes les paires sont trouvées.</p>}
    </>
  )
}

function Ordre({ items }: { items: string[] }) {
  const melange = useMemo(() => melanger(items.map((t, j) => [t, j] as const)), [items])
  const [n, setN] = useState(0)
  const [erreur, setErreur] = useState<number | null>(null)
  return (
    <>
      <div className="l-slots">
        {items.map((t, j) => (
          <div key={j} className={`l-slot ${j < n ? 'f' : ''}`}>
            <span className="no">{j + 1}</span>
            <span>{j < n ? <T t={t} /> : null}</span>
          </div>
        ))}
      </div>
      <div className="l-opts">
        {melange.map(([t, j]) =>
          j < n ? null : (
            <button
              key={j}
              className={`l-opt ${erreur === j ? 'ko' : ''}`}
              onClick={() => {
                if (j === n) setN(n + 1)
                else {
                  setErreur(j)
                  setTimeout(() => setErreur((e) => (e === j ? null : e)), 600)
                }
              }}
            >
              <T t={t} />
            </button>
          ),
        )}
      </div>
      {n === items.length && <p className="l-fini">Bravo, c'est dans l'ordre.</p>}
    </>
  )
}

function ExerciceEcran({ e, i }: { e: Exercice; i: number }) {
  return (
    <>
      <h2>Exercice {i + 1}.</h2>
      {e.type === 'qcm' && (
        <>
          <p className="sub">Choisis la bonne réponse.</p>
          {e.items.map((q, j) => (
            <Qcm key={j} q={q} />
          ))}
        </>
      )}
      {e.type === 'vf' && (
        <>
          <p className="sub">Vrai ou faux ?</p>
          {e.items.map((v, j) => (
            <VraiFaux key={j} item={v} />
          ))}
        </>
      )}
      {e.type === 'relier' && (
        <>
          <p className="sub">Relie chaque mot à ce qui va avec : touche un mot à gauche, puis sa réponse à droite.</p>
          <Relier paires={e.paires} />
        </>
      )}
      {e.type === 'ordre' && (
        <>
          <p className="sub">
            <T t={e.consigne} /> Touche les étiquettes dans le bon ordre.
          </p>
          <Ordre items={e.items} />
        </>
      )}
    </>
  )
}

function Vocabulaire({ mots }: { mots: [string, string][] }) {
  const [k, setK] = useState(0)
  const [vu, setVu] = useState(false)
  const [mot, def] = mots[k]
  return (
    <>
      <h2>Vocabulaire.</h2>
      <p className="sub">
        Mot {k + 1} sur {mots.length}. Dis la définition dans ta tête, puis retourne la carte.
      </p>
      <button className="l-fc" onClick={() => setVu(!vu)}>
        {vu ? (
          <>
            <span className="w petit">
              <T t={mot} />
            </span>
            <span className="d">
              <T t={def} />
            </span>
          </>
        ) : (
          <>
            <span className="w">
              <T t={mot} />
            </span>
            <span className="h">Touche pour voir la définition</span>
          </>
        )}
      </button>
      <div className="l-fcnav">
        <button className="btn" disabled={k === 0} onClick={() => (setK(k - 1), setVu(false))}>
          Mot précédent
        </button>
        <button className="btn" disabled={k === mots.length - 1} onClick={() => (setK(k + 1), setVu(false))}>
          Mot suivant
        </button>
      </div>
      <p className="sub">Ces mots reviendront aussi dans ta révision du jour.</p>
    </>
  )
}

/* ---------- Lecteur ---------- */

type Etape = { k: 'notion' | 'verif' | 'terrain' | 'bonus' | 'pg' | 'voc' | 'ex'; i?: number; t: string; p: 'c' | 'p' }

const etapes = (c: CoursCourt): Etape[] => [
  ...c.notion.map((_, i): Etape => ({ k: 'notion', i, t: 'La notion', p: 'c' })),
  { k: 'verif', t: 'Je vérifie', p: 'c' },
  ...(c.terrain.length ? [{ k: 'terrain', t: 'Sur le terrain', p: 'c' } as Etape] : []),
  ...(c.bonus ? [{ k: 'bonus', t: 'Le savais-tu ?', p: 'c' } as Etape] : []),
  { k: 'pg', t: 'Ta progression', p: 'c' },
  ...(c.mots.length ? [{ k: 'voc', t: 'Vocabulaire', p: 'p' } as Etape] : []),
  ...c.ex.map((_, i): Etape => ({ k: 'ex', i, t: `Exercice ${i + 1}`, p: 'p' })),
]

export function LeconLecteur({ r }: { r: FicheRef }) {
  const etat = useEtat()
  const { fiche, matiere, blocId } = r
  const { cours: c, total, chapitreTitre } = fiche.lecon!
  const st = useMemo(() => etapes(c), [c])
  const [k, setK] = useState(0)
  const [signaler, setSignaler] = useState(false)
  const s = st[k]
  const nC = st.filter((x) => x.p === 'c').length
  const dernier = k === st.length - 1
  const versPratique = k === nC - 1
  const retourCours = () => aller(`/bloc/${matiere.id}/${blocId}`)

  // Cours du même chapitre déjà terminés, pour l'écran « Ta progression ».
  const prefixe = fiche.id.replace(/-c\d+$/, '-c')
  const finis = new Set(
    Object.keys(etat.fichesLues)
      .filter((id) => id.startsWith(prefixe))
      .map((id) => Number(id.slice(prefixe.length))),
  )

  const avancer = (d: number) => {
    if (d > 0 && dernier) {
      majEtat((e) => (e.fichesLues[fiche.id] ? e : { ...e, fichesLues: { ...e.fichesLues, [fiche.id]: new Date().toISOString() } }))
      marquerJour()
      return retourCours()
    }
    setK(Math.max(0, Math.min(st.length - 1, k + d)))
    window.scrollTo(0, 0)
  }

  let contenu: React.ReactNode = null
  if (s.k === 'notion') {
    const p = c.notion[s.i!]
    contenu = (
      <>
        <h2>
          <T t={p.t} />{/[.?!:]$/.test(p.t.trim()) ? "" : "."}
        </h2>
        {p.b.map((b, j) => (
          <Bloc key={j} b={b} />
        ))}
      </>
    )
  }
  if (s.k === 'verif')
    contenu = (
      <>
        <h2>Je vérifie.</h2>
        <p className="sub">Réponds sans relire. Tu peux revenir en arrière si tu bloques.</p>
        {c.verif.map((q, j) => (
          <Qcm key={j} q={q} />
        ))}
      </>
    )
  if (s.k === 'terrain')
    contenu = (
      <>
        <h2>Sur le terrain.</h2>
        <p className="sub">Des situations de stage où tu vas t'en servir.</p>
        {c.terrain.map((t, j) => (
          <div key={j} className="l-terr">
            <span className="tag">{t.lieu}</span>
            <p>
              <T t={t.txt} />
            </p>
          </div>
        ))}
      </>
    )
  if (s.k === 'bonus' && c.bonus)
    contenu = (
      <div className="l-bonus">
        <span className="eyebrow">Le savais-tu ?</span>
        <h3>
          <T t={c.bonus.t} />
        </h3>
        <p>
          <T t={c.bonus.txt} />
        </p>
        {c.bonus.verifier && <p className="warn">Information à vérifier avec ton prof.</p>}
      </div>
    )
  if (s.k === 'pg')
    contenu = (
      <div className="l-pg">
        <span className="eyebrow">Ta progression</span>
        <span className="big">
          {c.n} / {total}
        </span>
        <p>
          Cours terminé : <b>{c.t}</b>
        </p>
        <div className="dots">
          {Array.from({ length: total }, (_, j) => (
            <i key={j} className={j + 1 <= c.n || finis.has(j + 1) ? 'd' : ''} />
          ))}
        </div>
        <p className="sub">{c.mots.length} nouveaux mots à apprendre dans la pratique.</p>
      </div>
    )
  if (s.k === 'voc') contenu = <Vocabulaire mots={c.mots} />
  if (s.k === 'ex') contenu = <ExerciceEcran e={c.ex[s.i!]} i={s.i!} />

  return (
    <div className="lecon">
      <div className="l-head">
        <div className="l-row">
          <button className="l-back" onClick={retourCours}>
            ‹ Les cours
          </button>
          <span className="l-ct">
            <span className="l-ct-t">{chapitreTitre}, cours {c.n}</span>
            <button className="l-signal" onClick={() => setSignaler(true)} aria-label="Signaler une erreur">
              <Icone nom="alerte" taille={16} />
            </button>
          </span>
        </div>
        <div className="l-segs" aria-hidden="true">
          {st.map((x, j) => (
            <Fragment key={j}>
              {j === nC && <i className="gap" />}
              <i className={`${x.p} ${j < k ? 'd' : j === k ? 'on' : ''}`} />
            </Fragment>
          ))}
        </div>
        <p className={`l-pos ${s.p}`}>
          {s.p === 'c' ? (
            <>
              <b>Cours</b> · {s.t} · {k + 1} sur {nC}
            </>
          ) : (
            <>
              <b>Pratique</b> · {s.t} · {k - nC + 1} sur {st.length - nC}
            </>
          )}
        </p>
      </div>

      <div className="l-body" key={k}>
        {k === 0 && !fiche.verifiee && <p className="badge-verif">Cours à vérifier avec ton prof</p>}
        {contenu}
      </div>

      <div className="l-nav">
        <div className="in">
          {k > 0 && (
            <button className="l-b2" onClick={() => avancer(-1)} aria-label="Écran précédent">
              ‹
            </button>
          )}
          <button className={`l-b1 ${s.p === 'p' || versPratique ? 'or' : ''}`} onClick={() => avancer(1)}>
            {dernier ? 'Terminer le cours' : versPratique ? 'Passer à la pratique' : 'Suivant'}
          </button>
        </div>
      </div>

      {signaler && <Signalement titre={`${chapitreTitre}, cours ${c.n}`} id={fiche.id} fermer={() => setSignaler(false)} />}
    </div>
  )
}
