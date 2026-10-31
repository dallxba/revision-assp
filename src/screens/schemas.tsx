// Schémas dessinés, insérés dans un cours avec une ligne « ::schema[nom] ».
// Couleurs d'illustration fixes (lisibles en clair et en sombre), textes en couleur d'encre.

const T = { fill: 'var(--encre)', fontSize: 12, fontFamily: 'var(--sans)' } as const
const trait = { stroke: 'var(--encre-3)', strokeWidth: 0.8 } as const

function Legende({ x, y, tx, ty, texte }: { x: number; y: number; tx: number; ty: number; texte: string }) {
  return (
    <g>
      <line x1={x} y1={y} x2={tx - 3} y2={ty} {...trait} />
      <circle cx={x} cy={y} r={1.8} fill="var(--encre)" />
      <text x={tx} y={ty + 3.5} {...T}>
        {texte}
      </text>
    </g>
  )
}

function PeauCoupe() {
  // Zone de dessin : x 10→210 ; légendes à droite à partir de x 226.
  const vague = 'M10 52 Q35 60 60 52 Q85 44 110 52 Q135 60 160 52 Q185 44 210 52'
  return (
    <svg viewBox="0 0 360 300" role="img" aria-labelledby="t-peau-coupe">
      <title id="t-peau-coupe">Coupe de la peau : épiderme, derme, hypoderme et leurs annexes</title>
      {/* Couches */}
      <path d={`${vague} V190 H10 Z`} fill="#f6d7d0" />
      <path d="M10 30 H210 V52 Q185 44 160 52 Q135 60 110 52 Q85 44 60 52 Q35 60 10 52 Z" fill="#f2c9a8" />
      <rect x="10" y="30" width="200" height="6" fill="#e0aa86" />
      <rect x="10" y="190" width="200" height="90" fill="#fbe7a6" />
      {/* Cellules adipeuses */}
      {Array.from({ length: 14 }, (_, i) => (
        <ellipse key={i} cx={22 + (i % 7) * 28 + (i > 6 ? 14 : 0)} cy={i > 6 ? 252 : 220} rx={12} ry={11} fill="#fff3c4" stroke="#e5c766" strokeWidth={1} />
      ))}
      {/* Vaisseaux */}
      <path d="M10 120 C60 110 90 135 140 118 S200 112 210 122" fill="none" stroke="#d64545" strokeWidth={3} />
      <path d="M10 132 C60 124 92 148 140 130 S200 126 210 136" fill="none" stroke="#4a6fd6" strokeWidth={3} />
      {/* Poil, follicule, glande sébacée, muscle */}
      <path d="M58 175 Q52 120 56 52" fill="none" stroke="#c99a7d" strokeWidth={9} strokeLinecap="round" opacity={0.7} />
      <path d="M57 176 Q51 110 58 8" fill="none" stroke="#3b2a20" strokeWidth={3} strokeLinecap="round" />
      <ellipse cx={74} cy={98} rx={10} ry={13} fill="#f0b25e" />
      <line x1={50} y1={140} x2={96} y2={62} stroke="#b0515e" strokeWidth={3} strokeLinecap="round" />
      {/* Glande sudoripare et pore */}
      <path d="M170 182 q-10 -6 0 -12 q10 -6 0 -12 q-10 -6 0 -12 q10 -6 0 -12" fill="none" stroke="#5aa0a8" strokeWidth={4} />
      <path d="M170 134 Q176 90 168 31" fill="none" stroke="#5aa0a8" strokeWidth={2} />
      {/* Terminaison nerveuse */}
      <path d="M120 175 Q118 140 122 78" fill="none" stroke="#e1b12c" strokeWidth={2} />
      <ellipse cx={122} cy={72} rx={6} ry={8} fill="#e1b12c" />
      {/* Légendes */}
      <Legende x={55} y={14} tx={226} ty={14} texte="Poil" />
      <Legende x={150} y={33} tx={226} ty={34} texte="Couche cornée" />
      <Legende x={190} y={44} tx={226} ty={52} texte="Épiderme" />
      <Legende x={168} y={33} tx={226} ty={72} texte="Pore sudoripare" />
      <Legende x={124} y={70} tx={226} ty={90} texte="Terminaison nerveuse" />
      <Legende x={80} y={98} tx={226} ty={108} texte="Glande sébacée" />
      <Legende x={196} y={118} tx={226} ty={126} texte="Vaisseaux sanguins" />
      <Legende x={86} y={78} tx={226} ty={144} texte="Muscle arrecteur" />
      <Legende x={176} y={164} tx={226} ty={162} texte="Glande sudoripare" />
      <Legende x={200} y={175} tx={226} ty={180} texte="Derme" />
      <Legende x={196} y={236} tx={226} ty={236} texte="Hypoderme" />
      <Legende x={152} y={252} tx={226} ty={256} texte="Cellules adipeuses" />
    </svg>
  )
}

function PeauCouches() {
  const couches = [
    { nom: 'Épiderme', y: 0, h: 52, c: '#f2c9a8', role: 'Barrière : protège, imperméable, pas de vaisseaux' },
    { nom: 'Derme', y: 52, h: 76, c: '#f6d7d0', role: 'Solide et souple : vaisseaux, nerfs, glandes' },
    { nom: 'Hypoderme', y: 128, h: 70, c: '#fbe7a6', role: 'Graisse : réserve, isolant, amortit les chocs' },
  ]
  return (
    <svg viewBox="0 0 360 200" role="img" aria-labelledby="t-peau-couches">
      <title id="t-peau-couches">Les trois couches de la peau et leur rôle</title>
      {couches.map((c, i) => (
        <g key={c.nom}>
          <rect x={0} y={c.y + 1} width={360} height={c.h - 2} rx={10} fill={c.c} />
          <text x={14} y={c.y + c.h / 2 - 4} fontSize={15} fontWeight={700} fill="#1c2427" fontFamily="var(--serif)">
            {i + 1}. {c.nom}
          </text>
          <text x={14} y={c.y + c.h / 2 + 14} fontSize={11.5} fill="#3d4649" fontFamily="var(--sans)">
            {c.role}
          </text>
        </g>
      ))}
      <path d="M346 10 V188" stroke="#1c2427" strokeWidth={1.2} markerEnd="url(#fl)" opacity={0.5} />
      <defs>
        <marker id="fl" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#1c2427" />
        </marker>
      </defs>
    </svg>
  )
}

export const schemas: Record<string, () => React.ReactElement> = {
  'peau-coupe': PeauCoupe,
  'peau-couches': PeauCouches,
}

export function Schema({ nom }: { nom: string }) {
  const S = schemas[nom]
  return <figure className="schema">{S ? <S /> : <figcaption>Schéma « {nom} » à venir</figcaption>}</figure>
}
