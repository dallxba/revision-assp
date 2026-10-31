// Schémas d'anatomie : respiratoire, digestif, urinaire, neurone, œil, squelette.
// Vue de face : la droite de la personne est à gauche du dessin.

const os = '#d9cdb2'
const tube = '#ef9a4a'
const glande = '#6dbb8a'
const urine = '#d4a72c'

type Ancre = 'start' | 'middle' | 'end'

/** Légende : point sur le dessin relié à un texte (plusieurs lignes avec \n). */
function P({ x, y, tx, ty, t, a = 'start', taille = 11.5 }: { x: number; y: number; tx: number; ty: number; t: string; a?: Ancre; taille?: number }) {
  const lignes = t.split('\n')
  const lx = a === 'start' ? tx - 3 : a === 'end' ? tx + 3 : tx
  const ly = a === 'middle' ? (ty > y ? ty - taille : ty + 4) : ty
  return (
    <g>
      <line x1={x} y1={y} x2={lx} y2={ly} stroke="var(--encre-3)" strokeWidth={0.8} />
      <circle cx={x} cy={y} r={1.8} fill="var(--encre)" />
      <text x={tx} y={ty + 4} fontSize={taille} textAnchor={a} fill="var(--encre)" fontFamily="var(--sans)">
        {lignes.map((l, i) => (
          <tspan key={i} x={tx} dy={i === 0 ? 0 : taille * 1.2}>
            {l}
          </tspan>
        ))}
      </text>
    </g>
  )
}

function Petit({ x, y, t, a = 'middle' }: { x: number; y: number; t: string; a?: Ancre }) {
  return (
    <text x={x} y={y} fontSize={10} textAnchor={a} fill="var(--encre-3)" fontFamily="var(--sans)">
      {t}
    </text>
  )
}

/* ---------- Respiratoire ---------- */

function AppareilRespiratoire() {
  const poumonG = 'M168 100 Q120 92 108 160 Q100 230 116 262 Q140 256 170 246 Z'
  const poumonD = 'M192 100 Q240 92 252 160 Q260 230 244 262 Q220 256 190 246 Z'
  return (
    <svg viewBox="0 0 360 340" role="img" aria-labelledby="t-resp">
      <title id="t-resp">L'appareil respiratoire de face, avec un zoom sur les alvéoles</title>
      <path d={poumonG} fill="#f3b3ad" stroke="#c98a80" strokeWidth={3} />
      <path d={poumonD} fill="#f3b3ad" stroke="#c98a80" strokeWidth={3} />
      {/* Lobes : 3 à droite de la personne (à gauche du dessin), 2 de l'autre côté */}
      <path d="M112 150 Q140 150 166 140 M108 205 Q140 195 166 190 M248 175 Q220 170 194 150" fill="none" stroke="#c98a80" strokeWidth={1.2} />
      {/* Voies aériennes */}
      <ellipse cx={180} cy={24} rx={16} ry={8} fill="#f6d7d0" stroke="#c98a80" />
      <path d="M173 30 V70 H187 V30" fill="#f6d7d0" stroke="#c98a80" />
      <rect x={172} y={70} width={16} height={16} rx={4} fill="#c9c2b8" />
      <rect x={174} y={86} width={12} height={46} fill="#ece6da" stroke="#b9ad94" />
      {[92, 98, 104, 110, 116, 122, 128].map((y) => (
        <line key={y} x1={174} x2={186} y1={y} y2={y} stroke="#b9ad94" />
      ))}
      <g stroke="#b9ad94" strokeLinecap="round" fill="none">
        <path d="M180 132 L150 156 M180 132 L210 156" strokeWidth={7} />
        <path d="M150 156 L130 180 M150 156 L150 204 M210 156 L230 180 M210 156 L210 204" strokeWidth={3.5} />
        <path d="M130 180 L120 212 M130 180 L140 214 M150 204 L144 232 M150 204 L160 230 M230 180 L240 212 M230 180 L220 214 M210 204 L216 232 M210 204 L200 230" strokeWidth={1.8} />
      </g>
      <path d="M100 272 Q180 226 260 272" fill="none" stroke="#b0515e" strokeWidth={5} strokeLinecap="round" />
      {/* Loupe sur les alvéoles */}
      <line x1={120} y1={212} x2={74} y2={262} stroke="var(--encre-3)" strokeDasharray="3 3" />
      <circle cx={52} cy={288} r={32} fill="var(--papier)" stroke="var(--encre-3)" strokeWidth={1.5} />
      <path d="M52 262 V276" stroke="#b9ad94" strokeWidth={2.5} />
      {[[44, 284], [60, 284], [52, 298], [38, 298], [66, 298], [46, 311], [60, 311]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={7.5} fill="#f3b3ad" stroke="#c98a80" />
      ))}
      <Petit x={52} y={334} t="Alvéoles" />
      <P x={166} y={24} tx={98} ty={24} t="Fosses nasales" a="end" />
      <P x={173} y={52} tx={98} ty={50} t="Pharynx" a="end" />
      <P x={172} y={78} tx={98} ty={76} t="Larynx" a="end" />
      <P x={174} y={110} tx={98} ty={104} t="Trachée" a="end" />
      <P x={238} y={122} tx={266} ty={110} t="Poumon" />
      <P x={204} y={151} tx={266} ty={138} t="Bronche" />
      <P x={234} y={192} tx={266} ty={166} t="Bronchiole" />
      <P x={255} y={216} tx={266} ty={196} t="Plèvre" />
      <P x={248} y={264} tx={266} ty={236} t="Diaphragme" />
    </svg>
  )
}

/* ---------- Digestif ---------- */

function AppareilDigestif() {
  const grele =
    'M150 224 q7.5 8 15 0 t15 0 t15 0 t15 0 Q220 234 210 244 q-7.5 8 -15 0 t-15 0 t-15 0 t-15 0 Q140 254 150 264 q7.5 8 15 0 t15 0 t15 0 t15 0 Q220 274 210 284 q-7.5 8 -15 0 t-15 0 t-15 0'
  return (
    <svg viewBox="0 0 360 340" role="img" aria-labelledby="t-dig">
      <title id="t-dig">L'appareil digestif : tube digestif en orange, glandes annexes en vert</title>
      <ellipse cx={180} cy={28} rx={14} ry={7} fill="#e07a7a" />
      <ellipse cx={158} cy={42} rx={7} ry={5} fill={glande} />
      <ellipse cx={202} cy={42} rx={7} ry={5} fill={glande} />
      <path d="M180 34 L180 70 Q182 100 200 124" fill="none" stroke={tube} strokeWidth={7} strokeLinecap="round" />
      <path d="M100 116 Q180 98 260 116" fill="none" stroke="#c9c2b8" strokeWidth={2} strokeDasharray="5 4" />
      <path d="M168 190 Q200 182 236 190 Q204 202 168 198 Z" fill={glande} />
      <path d="M106 122 Q170 108 196 124 Q186 142 158 152 Q120 164 108 150 Z" fill="#4f9a6a" />
      <ellipse cx={150} cy={158} rx={8} ry={6} fill="#2f7a4c" />
      <path d="M196 120 Q236 110 246 140 Q252 180 216 188 Q196 190 192 174 Q208 174 216 164 Q224 148 198 136 Z" fill={tube} />
      <path d="M136 300 V210 H224 V292 Q224 308 202 308 H182 V326" fill="none" stroke="#d9803a" strokeWidth={13} strokeLinejoin="round" />
      <path d={grele} fill="none" stroke="#f2b77c" strokeWidth={6} strokeLinecap="round" />
      <Petit x={180} y={112} t="diaphragme" />
      <P x={166} y={28} tx={98} ty={28} t="Bouche" a="end" />
      <P x={130} y={136} tx={98} ty={124} t="Foie" a="end" />
      <P x={146} y={162} tx={98} ty={160} t={'Vésicule\nbiliaire'} a="end" />
      <P x={136} y={252} tx={98} ty={252} t="Côlon" a="end" />
      <P x={182} y={318} tx={98} ty={318} t="Rectum" a="end" />
      <P x={183} y={62} tx={266} ty={58} t="Œsophage" />
      <P x={238} y={148} tx={266} ty={140} t="Estomac" />
      <P x={232} y={192} tx={266} ty={190} t="Pancréas" />
      <P x={204} y={262} tx={266} ty={262} t={'Intestin\ngrêle'} />
    </svg>
  )
}

/* ---------- Urinaire ---------- */

function Rein({ cx, cy, sens }: { cx: number; cy: number; sens: 1 | -1 }) {
  const s = sens
  const d = `M${cx} ${cy - 36} Q${cx - 24 * s} ${cy - 36} ${cx - 24 * s} ${cy} Q${cx - 24 * s} ${cy + 36} ${cx} ${cy + 36} Q${cx + 14 * s} ${cy + 36} ${cx + 12 * s} ${cy + 18} Q${cx + 4 * s} ${cy} ${cx + 12 * s} ${cy - 18} Q${cx + 14 * s} ${cy - 36} ${cx} ${cy - 36} Z`
  return <path d={d} fill="#b5524f" stroke="#8e3b39" strokeWidth={1.5} />
}

function AppareilUrinaire() {
  return (
    <svg viewBox="0 0 360 280" role="img" aria-labelledby="t-uri">
      <title id="t-uri">L'appareil urinaire de face : reins, uretères, vessie, urètre</title>
      <rect x={172} y={16} width={16} height={196} rx={4} fill="#ece6da" stroke="#b9ad94" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={172} x2={188} y1={30 + i * 15} y2={30 + i * 15} stroke="#b9ad94" />
      ))}
      <line x1={164} y1={16} x2={164} y2={206} stroke="#4a6fd6" strokeWidth={9} />
      <line x1={196} y1={16} x2={196} y2={206} stroke="#d64545" strokeWidth={8} />
      <line x1={136} y1={84} x2={164} y2={84} stroke="#4a6fd6" strokeWidth={4} />
      <line x1={136} y1={96} x2={196} y2={96} stroke="#d64545" strokeWidth={3} />
      <line x1={224} y1={74} x2={196} y2={74} stroke="#d64545" strokeWidth={3} />
      <line x1={224} y1={86} x2={164} y2={86} stroke="#4a6fd6" strokeWidth={4} opacity={0.9} />
      <Rein cx={128} cy={90} sens={1} />
      <Rein cx={232} cy={80} sens={-1} />
      <path d="M136 108 Q150 170 170 214" fill="none" stroke={urine} strokeWidth={3.5} />
      <path d="M224 98 Q210 170 190 214" fill="none" stroke={urine} strokeWidth={3.5} />
      <ellipse cx={180} cy={226} rx={30} ry={22} fill="#fbe7a6" stroke={urine} strokeWidth={2} />
      <line x1={180} y1={248} x2={180} y2={272} stroke={urine} strokeWidth={4} />
      <P x={164} y={30} tx={98} ty={24} t="Veine cave" a="end" />
      <P x={110} y={90} tx={98} ty={90} t="Rein" a="end" />
      <P x={148} y={160} tx={98} ty={160} t="Uretère" a="end" />
      <P x={180} y={264} tx={98} ty={264} t="Urètre" a="end" />
      <P x={196} y={30} tx={266} ty={24} t="Aorte" />
      <P x={208} y={226} tx={266} ty={226} t="Vessie" />
    </svg>
  )
}

/* ---------- Neurone ---------- */

function Neurone() {
  const etoile = 'M70 74 L80 88 L98 90 L88 104 L94 122 L76 116 L62 128 L60 110 L44 100 L60 92 Z'
  return (
    <svg viewBox="0 0 360 190" role="img" aria-labelledby="t-neur">
      <title id="t-neur">Un neurone transmet le message par son axone jusqu'à la synapse</title>
      <defs>
        <marker id="fl-neur" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--encre-2)" />
        </marker>
      </defs>
      <g stroke="#e0b23c" strokeWidth={2.5} fill="none" strokeLinecap="round">
        <path d="M70 76 L64 52 M64 52 L54 40 M64 52 L72 36 M46 98 L24 88 M24 88 L12 78 M24 88 L14 100 M62 126 L50 148 M50 148 L36 156 M50 148 L54 166 M84 90 L96 66 M96 66 L108 58" />
      </g>
      <path d={etoile} fill="#f2cf5b" stroke="#d4a72c" />
      <circle cx={71} cy={103} r={8} fill="#b07c14" />
      <path d="M94 104 C140 96 200 110 258 102" fill="none" stroke="#e0b23c" strokeWidth={5} strokeLinecap="round" />
      <g stroke="#e0b23c" strokeWidth={2} fill="none">
        <path d="M258 102 L278 88 M258 102 L282 102 M258 102 L278 116" />
      </g>
      {[[280, 87], [285, 102], [280, 117]].map(([x, y]) => (
        <circle key={y} cx={x} cy={y} r={4} fill="#d4a72c" />
      ))}
      <path d="M300 102 L338 80 L350 106 L334 128 Z" fill="#f2cf5b" opacity={0.65} stroke="#d4a72c" />
      <Petit x={326} y={148} t="2e neurone" />
      <path d="M120 140 H240" stroke="var(--encre-2)" strokeWidth={1.6} markerEnd="url(#fl-neur)" />
      <Petit x={180} y={158} t="sens du message" />
      <P x={64} y={52} tx={30} ty={20} t="Dendrites" a="middle" />
      <P x={71} y={103} tx={128} ty={48} t="Noyau" a="middle" />
      <P x={84} y={118} tx={110} ty={178} t="Corps cellulaire" a="middle" />
      <P x={190} y={106} tx={200} ty={64} t="Axone" a="middle" />
      <P x={292} y={102} tx={300} ty={52} t="Synapse" a="middle" />
    </svg>
  )
}

/* ---------- Œil ---------- */

function Oeil() {
  return (
    <svg viewBox="0 0 360 220" role="img" aria-labelledby="t-oeil">
      <title id="t-oeil">Coupe de l'œil : la lumière traverse la cornée et le cristallin, l'image se forme à l'envers sur la rétine</title>
      <defs>
        <marker id="fl-oeil" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#d9803a" />
        </marker>
      </defs>
      <rect x={262} y={100} width={70} height={20} rx={4} fill="#f2cf5b" />
      <circle cx={200} cy={110} r={70} fill="#f4f1ea" stroke="#c9c2b8" strokeWidth={3} />
      <path d="M233 53 A66 66 0 0 1 233 167" fill="none" stroke="#d64545" strokeWidth={5} />
      <path d="M138 78 Q114 110 138 142" fill="#d9eef7" stroke="#7fb3c9" strokeWidth={2} />
      <path d="M146 82 V100 M146 120 V138" stroke="#5b8a72" strokeWidth={5} />
      <ellipse cx={157} cy={110} rx={7} ry={20} fill="#cfe6f0" stroke="#7fb3c9" />
      <path d="M30 80 L157 110 L262 135 M30 132 L157 110 L262 85" fill="none" stroke="#d9803a" strokeWidth={1.2} />
      <path d="M30 132 V82" stroke="#d9803a" strokeWidth={3} markerEnd="url(#fl-oeil)" />
      <path d="M258 86 V130" stroke="#d9803a" strokeWidth={3} markerEnd="url(#fl-oeil)" />
      <Petit x={30} y={150} t="objet" />
      <P x={146} y={88} tx={118} ty={22} t="Iris" a="middle" />
      <P x={158} y={94} tx={190} ty={22} t="Cristallin" a="middle" />
      <P x={126} y={120} tx={90} ty={198} t="Cornée" a="middle" />
      <P x={146} y={112} tx={160} ty={198} t="Pupille" a="middle" />
      <P x={234} y={160} tx={240} ty={198} t="Rétine" a="middle" />
      <P x={310} y={110} tx={308} ty={62} t="Nerf optique" a="middle" />
    </svg>
  )
}

/* ---------- Squelette ---------- */

function Squelette() {
  const cotes = [0, 1, 2, 3, 4].map((i) => {
    const y = 88 + i * 11
    return `M147 ${y} Q${114 - i} ${y - 2} ${118 + i * 2} ${y + 16} M153 ${y} Q${186 + i} ${y - 2} ${182 - i * 2} ${y + 16}`
  })
  const membre = (s: 1 | -1) => {
    const x = (v: number) => 150 + s * v
    return (
      <g stroke={os} strokeLinecap="round" fill="none">
        <line x1={x(4)} y1={76} x2={x(38)} y2={72} strokeWidth={4} />
        <line x1={x(40)} y1={76} x2={x(48)} y2={150} strokeWidth={7} />
        <line x1={x(48)} y1={154} x2={x(56)} y2={224} strokeWidth={4} />
        <line x1={x(44)} y1={154} x2={x(50)} y2={226} strokeWidth={3} />
        <circle cx={x(55)} cy={234} r={6} fill={os} stroke="none" />
        <line x1={x(18)} y1={226} x2={x(22)} y2={300} strokeWidth={8} />
        <line x1={x(22)} y1={312} x2={x(24)} y2={370} strokeWidth={6} />
        <line x1={x(16)} y1={312} x2={x(16)} y2={368} strokeWidth={3} />
      </g>
    )
  }
  return (
    <svg viewBox="0 0 360 392" role="img" aria-labelledby="t-sq">
      <title id="t-sq">Le squelette de face, et la colonne vertébrale de profil avec ses courbures</title>
      {membre(1)}
      {membre(-1)}
      <circle cx={128} cy={305} r={5} fill="#c9b78f" />
      <circle cx={172} cy={305} r={5} fill="#c9b78f" />
      <line x1={150} y1={62} x2={150} y2={204} stroke={os} strokeWidth={7} strokeDasharray="6 2" />
      <path d={cotes.join(' ')} fill="none" stroke={os} strokeWidth={3} />
      <rect x={146} y={82} width={8} height={46} rx={3} fill="#c9b78f" />
      <path d="M120 196 Q150 180 180 196 Q186 222 166 228 L150 218 L134 228 Q114 222 120 196 Z" fill={os} />
      <ellipse cx={150} cy={36} rx={22} ry={26} fill={os} />
      <ellipse cx={142} cy={34} rx={5} ry={6} fill="var(--papier)" />
      <ellipse cx={158} cy={34} rx={5} ry={6} fill="var(--papier)" />
      <P x={132} y={24} tx={92} ty={26} t="Crâne" a="end" />
      <P x={120} y={104} tx={92} ty={100} t="Côtes" a="end" />
      <P x={104} y={126} tx={92} ty={132} t="Humérus" a="end" />
      <P x={98} y={192} tx={92} ty={186} t={'Radius et\ncubitus'} a="end" />
      <P x={130} y={262} tx={92} ty={262} t="Fémur" a="end" />
      <P x={124} y={305} tx={92} ty={302} t="Rotule" a="end" />
      <P x={126} y={344} tx={92} ty={336} t={'Tibia et\npéroné'} a="end" />
      <P x={154} y={100} tx={208} ty={92} t="Sternum" />
      <P x={151} y={160} tx={208} ty={142} t={'Colonne\nvertébrale'} />
      <P x={176} y={204} tx={208} ty={196} t="Bassin" />
      {/* Encart de profil */}
      <rect x={232} y={226} width={122} height={162} rx={10} fill="none" stroke="var(--encre-3)" strokeDasharray="4 3" />
      <Petit x={293} y={242} t="De profil (dos à droite)" />
      <path d="M262 254 Q254 270 262 286 Q276 306 262 328 Q254 340 262 352 Q268 360 266 368" fill="none" stroke={os} strokeWidth={7} strokeDasharray="5 2" />
      {[
        ['Cervicales', 270],
        ['Dorsales', 298],
        ['Lombaires', 330],
        ['Sacrum', 352],
        ['Coccyx', 368],
      ].map(([t, y]) => (
        <text key={t} x={284} y={Number(y) + 4} fontSize={10.5} fill="var(--encre)" fontFamily="var(--sans)">
          {t}
        </text>
      ))}
    </svg>
  )
}

export const schemas3: Record<string, () => React.ReactElement> = {
  'appareil-respiratoire': AppareilRespiratoire,
  'appareil-digestif': AppareilDigestif,
  'appareil-urinaire': AppareilUrinaire,
  neurone: Neurone,
  oeil: Oeil,
  squelette: Squelette,
}
