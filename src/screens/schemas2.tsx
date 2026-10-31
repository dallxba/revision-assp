// Schémas des chapitres organisation du corps, cellule et cancers, cardiovasculaire.
// Couleurs d'illustration fixes ; textes en couleur d'encre pour le mode sombre.

const C = {
  rouge: '#d64545',
  rougeClair: '#f3b3ad',
  bleu: '#4a6fd6',
  bleuClair: '#b9c8f2',
  orange: '#ef9a4a',
  jaune: '#f2cf5b',
  jauneClair: '#fbe7a6',
  rose: '#f6d7d0',
  violet: '#a98bc7',
  vert: '#6dbb8a',
  peau: '#f2c9a8',
  gris: '#c9c2b8',
}

const texte = { fill: 'var(--encre)', fontFamily: 'var(--sans)' } as const

function Txt({ x, y, t, taille = 11, ancre = 'middle', gras = false }: { x: number; y: number; t: string; taille?: number; ancre?: 'start' | 'middle' | 'end'; gras?: boolean }) {
  return (
    <text x={x} y={y} fontSize={taille} textAnchor={ancre} fontWeight={gras ? 700 : 400} {...texte}>
      {t}
    </text>
  )
}

function Lignes({ x, y, lignes, taille = 10.5, ancre = 'middle' }: { x: number; y: number; lignes: string[]; taille?: number; ancre?: 'start' | 'middle' | 'end' }) {
  return (
    <text x={x} y={y} fontSize={taille} textAnchor={ancre} {...texte}>
      {lignes.map((l, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : taille * 1.25}>
          {l}
        </tspan>
      ))}
    </text>
  )
}

function Fleche({ d, couleur = 'var(--encre-2)', id, epais = 1.6 }: { d: string; couleur?: string; id: string; epais?: number }) {
  return (
    <>
      <defs>
        <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={couleur} />
        </marker>
      </defs>
      <path d={d} fill="none" stroke={couleur} strokeWidth={epais} markerEnd={`url(#${id})`} />
    </>
  )
}

function Legende({ x, y, tx, ty, t }: { x: number; y: number; tx: number; ty: number; t: string }) {
  return (
    <g>
      <line x1={x} y1={y} x2={tx - 3} y2={ty} stroke="var(--encre-3)" strokeWidth={0.8} />
      <circle cx={x} cy={y} r={1.8} fill="var(--encre)" />
      <text x={tx} y={ty + 4} fontSize={12} {...texte}>
        {t}
      </text>
    </g>
  )
}

const coeurPath = 'M12 21s-7.5-4.6-9.6-9.2A5.4 5.4 0 0 1 12 6.3a5.4 5.4 0 0 1 9.6 5.5C19.5 16.4 12 21 12 21z'

function Silhouette({ x, y, s = 1, fill = C.gris }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <circle cx={0} cy={10} r={10} />
      <path d="M-15 24 Q0 20 15 24 L19 62 Q19 66 15 66 L12 66 L10 104 L2 104 L0 72 L-2 104 L-10 104 L-12 66 L-15 66 Q-19 66 -19 62 Z" />
    </g>
  )
}

/* ---------- Organisation du corps ---------- */

function NiveauxOrganisation() {
  const cx = [36, 108, 180, 252, 324]
  return (
    <svg viewBox="0 0 360 170" role="img" aria-labelledby="t-niv">
      <title id="t-niv">Niveaux d'organisation : cellule, tissu, organe, appareil, organisme</title>
      {/* Cellule */}
      <rect x={cx[0] - 14} y={52} width={28} height={12} rx={6} fill={C.rougeClair} stroke={C.rouge} />
      <circle cx={cx[0]} cy={58} r={3} fill={C.rouge} />
      {/* Tissu */}
      {[0, 1, 2].map((r) =>
        [0, 1].map((c) => <rect key={`${r}${c}`} x={cx[1] - 22 + c * 23 + (r % 2) * 6} y={40 + r * 13} width={21} height={11} rx={5} fill={C.rougeClair} stroke={C.rouge} strokeWidth={0.8} />),
      )}
      {/* Organe */}
      <path d={coeurPath} transform={`translate(${cx[2] - 21} 34) scale(1.75)`} fill={C.rouge} />
      {/* Appareil */}
      <path d={coeurPath} transform={`translate(${cx[3] - 14} 42) scale(1.15)`} fill={C.rouge} />
      <path d={`M${cx[3] - 4} 46 Q${cx[3] - 6} 22 ${cx[3] - 26} 20 M${cx[3] + 4} 46 Q${cx[3] + 8} 20 ${cx[3] + 28} 24 M${cx[3] - 10} 62 Q${cx[3] - 26} 80 ${cx[3] - 24} 96 M${cx[3] + 10} 62 Q${cx[3] + 26} 80 ${cx[3] + 24} 96`} fill="none" stroke={C.rouge} strokeWidth={2.2} />
      <path d={`M${cx[3] - 8} 48 Q${cx[3] - 30} 40 ${cx[3] - 30} 70 M${cx[3] + 8} 48 Q${cx[3] + 30} 40 ${cx[3] + 30} 70`} fill="none" stroke={C.bleu} strokeWidth={2} />
      {/* Organisme */}
      <Silhouette x={cx[4]} y={14} s={0.8} />
      <path d={coeurPath} transform={`translate(${cx[4] + 1} 36) scale(0.45)`} fill={C.rouge} />
      {/* Flèches */}
      {[0, 1, 2, 3].map((i) => (
        <Fleche key={i} id={`fn${i}`} d={`M${cx[i] + 22} 58 L${cx[i + 1] - 26} 58`} />
      ))}
      <Lignes x={cx[0]} y={128} lignes={['Cellule']} />
      <Lignes x={cx[1]} y={128} lignes={['Tissu', '(myocarde)']} />
      <Lignes x={cx[2]} y={128} lignes={['Organe', '(cœur)']} />
      <Lignes x={cx[3]} y={128} lignes={['Appareil', '(cardio-', 'vasculaire)']} />
      <Lignes x={cx[4]} y={128} lignes={['Organisme']} />
      <Fleche id="fn-grand" d="M20 112 L340 112" couleur="var(--encre-3)" epais={1} />
      <Txt x={180} y={106} t="de plus en plus grand et complexe" taille={9.5} />
    </svg>
  )
}

function FonctionsNutrition() {
  const boite = (x: number, y: number, w: number, couleur: string, titre: string, sous: string) => (
    <g>
      <rect x={x} y={y} width={w} height={44} rx={12} fill={couleur} />
      <text x={x + w / 2} y={y + 19} fontSize={12} fontWeight={700} textAnchor="middle" fill="#1c2427" fontFamily="var(--sans)">
        {titre}
      </text>
      <text x={x + w / 2} y={y + 34} fontSize={10.5} textAnchor="middle" fill="#3d4649" fontFamily="var(--sans)">
        {sous}
      </text>
    </g>
  )
  return (
    <svg viewBox="0 0 360 290" role="img" aria-labelledby="t-fn">
      <title id="t-fn">Les fonctions de nutrition : respiration, digestion, circulation, excrétion autour de la cellule</title>
      {boite(10, 10, 150, C.bleuClair, 'Respiratoire', 'O₂ entre, CO₂ sort')}
      {boite(10, 230, 150, '#f7cfa6', 'Digestif', 'apporte les nutriments')}
      {boite(200, 230, 150, C.jauneClair, 'Urinaire', 'élimine les déchets')}
      {/* Sang */}
      <rect x={30} y={112} width={150} height={56} rx={28} fill={C.rougeClair} stroke={C.rouge} strokeWidth={1.5} />
      <text x={105} y={136} fontSize={12} fontWeight={700} textAnchor="middle" fill="#1c2427" fontFamily="var(--sans)">
        Sang
      </text>
      <text x={105} y={152} fontSize={10.5} textAnchor="middle" fill="#3d4649" fontFamily="var(--sans)">
        cœur + vaisseaux : transport
      </text>
      {/* Cellule */}
      <circle cx={295} cy={140} r={42} fill={C.rose} stroke="#c98a80" strokeWidth={1.5} />
      <circle cx={295} cy={140} r={13} fill="#c98a80" />
      <Txt x={295} y={196} t="Cellule" gras />
      {/* Échanges */}
      <Fleche id="fa1" d="M70 56 L70 108" couleur={C.bleu} />
      <Txt x={64} y={86} t="O₂" ancre="end" />
      <Fleche id="fa2" d="M130 110 L130 58" couleur="var(--encre-2)" />
      <Txt x={136} y={86} t="CO₂" ancre="start" />
      <Fleche id="fa3" d="M85 228 L85 172" couleur={C.orange} />
      <Txt x={91} y={204} t="nutriments" ancre="start" />
      <Fleche id="fa4" d="M182 128 L250 128" couleur={C.rouge} />
      <Txt x={216} y={120} t="O₂ + nutriments" taille={10} />
      <Fleche id="fa5" d="M252 156 L184 156" couleur="var(--encre-2)" />
      <Txt x={216} y={172} t="CO₂ + déchets" taille={10} />
      <Fleche id="fa6" d="M170 168 Q230 200 250 226" couleur="#b9912a" />
    </svg>
  )
}

function CavitesCorps() {
  return (
    <svg viewBox="0 0 360 330" role="img" aria-labelledby="t-cav">
      <title id="t-cav">Les cavités du corps vues de profil</title>
      {/* Silhouette de profil */}
      <ellipse cx={95} cy={52} rx={40} ry={44} fill={C.peau} />
      <rect x={78} y={88} width={30} height={22} fill={C.peau} />
      <path d="M48 112 Q95 98 140 112 L146 250 Q120 300 60 296 Q40 280 44 250 Z" fill={C.peau} />
      {/* Cavités */}
      <ellipse cx={92} cy={48} rx={30} ry={32} fill={C.violet} opacity={0.75} />
      <rect x={128} y={70} width={7} height={200} rx={3.5} fill={C.vert} />
      <path d="M58 122 Q92 112 122 122 L122 182 Q92 168 58 182 Z" fill={C.bleuClair} />
      <path d="M56 186 Q92 168 124 186" fill="none" stroke={C.rouge} strokeWidth={4} />
      <path d="M58 194 Q92 178 122 194 L122 240 L58 240 Z" fill="#f7cfa6" />
      <path d="M60 244 L122 244 Q118 282 90 284 Q64 282 60 244 Z" fill={C.jauneClair} />
      <Legende x={92} y={40} tx={190} ty={34} t="Cavité crânienne" />
      <Legende x={131} y={110} tx={190} ty={78} t="Canal vertébral" />
      <Legende x={100} y={150} tx={190} ty={140} t="Cavité thoracique" />
      <Legende x={110} y={180} tx={190} ty={184} t="Diaphragme" />
      <Legende x={100} y={216} tx={190} ty={222} t="Cavité abdominale" />
      <Legende x={96} y={264} tx={190} ty={264} t="Cavité pelvienne" />
      <Txt x={24} y={318} t="dos → à droite du dessin" taille={10} ancre="start" />
    </svg>
  )
}

/* ---------- Cellule et cancers ---------- */

function Mito({ x, y, r = 0 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <ellipse rx={18} ry={8} fill={C.orange} />
      <path d="M-13 0 l4 -5 l4 10 l4 -10 l4 10 l4 -10 l4 10" fill="none" stroke="#a3561c" strokeWidth={1.2} />
    </g>
  )
}

function Cellule() {
  const points = [
    [70, 90], [84, 150], [150, 70], [160, 205], [95, 196], [196, 150], [120, 60], [66, 128], [190, 100], [130, 215],
  ]
  return (
    <svg viewBox="0 0 360 260" role="img" aria-labelledby="t-cel">
      <title id="t-cel">Cellule animale : membrane, cytoplasme, noyau, mitochondries, ribosomes</title>
      <circle cx={130} cy={135} r={105} fill={C.rose} stroke="#b06d63" strokeWidth={2.5} />
      <circle cx={130} cy={135} r={36} fill={C.violet} />
      <circle cx={136} cy={130} r={9} fill="#6d4f8c" />
      <Mito x={80} y={170} r={30} />
      <Mito x={185} y={185} r={-20} />
      <Mito x={190} y={80} r={50} />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.6} fill="#5a3b35" />
      ))}
      <Legende x={226} y={110} tx={250} ty={40} t="Membrane" />
      <Legende x={204} y={66} tx={250} ty={68} t="Mitochondrie" />
      <Legende x={152} y={128} tx={250} ty={110} t="Noyau (ADN)" />
      <Legende x={198} y={150} tx={250} ty={152} t="Ribosomes" />
      <Legende x={110} y={210} tx={250} ty={210} t="Cytoplasme" />
    </svg>
  )
}

function Mitose() {
  const chrom = (x: number, y: number, c: string) => (
    <path d={`M${x - 3} ${y - 6} L${x + 3} ${y + 6} M${x + 3} ${y - 6} L${x - 3} ${y + 6}`} stroke={c} strokeWidth={2.6} strokeLinecap="round" />
  )
  return (
    <svg viewBox="0 0 360 170" role="img" aria-labelledby="t-mit">
      <title id="t-mit">La mitose : une cellule mère donne deux cellules filles identiques</title>
      <circle cx={50} cy={64} r={38} fill={C.rose} stroke="#b06d63" strokeWidth={2} />
      <circle cx={50} cy={64} r={15} fill={C.violet} />
      <Fleche id="mi1" d="M94 64 L118 64" />
      <ellipse cx={178} cy={64} rx={52} ry={38} fill={C.rose} stroke="#b06d63" strokeWidth={2} />
      {[44, 58, 72, 86].map((y) => chrom(178, y - 1, '#6d4f8c'))}
      <Fleche id="mi2" d="M168 22 L140 22" couleur="var(--encre-3)" epais={1} />
      <Fleche id="mi3" d="M188 22 L216 22" couleur="var(--encre-3)" epais={1} />
      <Fleche id="mi4" d="M236 64 L258 64" />
      <circle cx={290} cy={36} r={26} fill={C.rose} stroke="#b06d63" strokeWidth={2} />
      <circle cx={290} cy={36} r={10} fill={C.violet} />
      <circle cx={290} cy={94} r={26} fill={C.rose} stroke="#b06d63" strokeWidth={2} />
      <circle cx={290} cy={94} r={10} fill={C.violet} />
      <Lignes x={50} y={132} lignes={['1 cellule mère']} />
      <Lignes x={178} y={132} lignes={["Copie de l'ADN,", 'séparation']} />
      <Lignes x={300} y={140} lignes={['2 cellules filles', 'identiques (46 chr.)']} />
    </svg>
  )
}

function Cancerisation() {
  const normal = (x: number, y: number, k: string, fill = C.rose) => <rect key={k} x={x} y={y} width={14} height={12} rx={4} fill={fill} stroke="#b06d63" strokeWidth={0.8} />
  const grille = (ox: number, anormales: [number, number][] = []) =>
    [0, 1, 2, 3].flatMap((r) => [0, 1, 2, 3].map((c) => normal(ox + c * 16, 40 + r * 14, `${ox}${r}${c}`, anormales.some(([a, b]) => a === r && b === c) ? '#e07a6a' : C.rose)))
  return (
    <svg viewBox="0 0 360 180" role="img" aria-labelledby="t-can">
      <title id="t-can">Les étapes d'un cancer : mutation, division incontrôlée, tumeur maligne, métastase</title>
      {grille(6, [[1, 2]])}
      <path d="M44 22 l-6 10 h6 l-5 10" fill="none" stroke="#e1b12c" strokeWidth={2.4} strokeLinejoin="round" />
      {grille(96, [[1, 1], [1, 2], [2, 1], [2, 2], [0, 2]])}
      {/* Tumeur */}
      {grille(186)}
      <path d="M200 52 q12 -18 30 -6 q16 -6 20 12 q14 12 0 26 q4 18 -16 18 q-16 12 -28 -2 q-18 2 -14 -18 q-12 -16 8 -30z" fill="#e07a6a" stroke="#a8473a" strokeWidth={1.2} />
      <path d="M186 106 H250" stroke="var(--encre-3)" strokeDasharray="3 3" />
      {/* Métastase */}
      <rect x={276} y={30} width={22} height={100} rx={11} fill={C.rougeClair} stroke={C.rouge} />
      {[50, 72, 94].map((y) => (
        <circle key={y} cx={287} cy={y} r={4} fill="#a8473a" />
      ))}
      <Fleche id="ca1" d="M300 110 Q330 120 336 90" couleur={C.rouge} />
      <ellipse cx={336} cy={70} rx={18} ry={14} fill={C.jauneClair} stroke="#b9912a" />
      <circle cx={334} cy={70} r={4} fill="#a8473a" />
      <Lignes x={36} y={128} lignes={['Mutation']} />
      <Lignes x={126} y={128} lignes={['Division', 'incontrôlée']} />
      <Lignes x={220} y={128} lignes={['Tumeur', 'maligne']} />
      <Lignes x={312} y={150} lignes={['Métastase']} />
    </svg>
  )
}

/* ---------- Cardiovasculaire ---------- */

function SangComposition() {
  return (
    <svg viewBox="0 0 360 250" role="img" aria-labelledby="t-sang">
      <title id="t-sang">Composition du sang après centrifugation</title>
      <path d="M40 20 H96 V200 Q96 228 68 228 Q40 228 40 200 Z" fill="none" stroke="var(--encre-3)" strokeWidth={2} />
      <path d="M42 30 H94 V112 H42 Z" fill={C.jaune} opacity={0.75} />
      <rect x={42} y={112} width={52} height={7} fill="#f4f1ea" stroke="#ddd" strokeWidth={0.5} />
      <path d="M42 119 H94 V200 Q94 226 68 226 Q42 226 42 200 Z" fill={C.rouge} />
      <Legende x={94} y={70} tx={108} ty={60} t="Plasma (55 %)" />
      <Legende x={94} y={115} tx={108} ty={108} t="Globules blancs" />
      <text x={108} y={124} fontSize={12} {...texte}>
        et plaquettes
      </text>
      <Legende x={94} y={170} tx={108} ty={168} t="Globules rouges (45 %)" />
      {/* Cellules */}
      <ellipse cx={260} cy={46} rx={24} ry={16} fill={C.rouge} />
      <ellipse cx={260} cy={46} rx={10} ry={6} fill="#b53636" />
      <Lignes x={300} y={42} lignes={['Globule rouge', 'sans noyau']} ancre="start" taille={10} />
      <circle cx={260} cy={110} r={18} fill="#ece8f6" stroke={C.violet} strokeWidth={1.5} />
      <path d="M252 104 q8 -8 14 0 q4 10 -6 12 q-10 2 -8 -12z" fill={C.violet} />
      <Lignes x={300} y={106} lignes={['Globule blanc', 'avec noyau']} ancre="start" taille={10} />
      {[[248, 168], [262, 176], [270, 162], [254, 182]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={5} ry={3} fill="#c79bd0" transform={`rotate(${i * 40} ${x} ${y})`} />
      ))}
      <Lignes x={300} y={170} lignes={['Plaquettes', '(fragments)']} ancre="start" taille={10} />
    </svg>
  )
}

function Coeur() {
  return (
    <svg viewBox="0 0 360 300" role="img" aria-labelledby="t-coeur">
      <title id="t-coeur">Le cœur en coupe : quatre cavités, valvules et gros vaisseaux</title>
      {/* Vaisseaux */}
      <path d="M150 74 Q150 20 196 20 Q238 20 238 64" fill="none" stroke={C.rouge} strokeWidth={14} />
      <path d="M118 96 Q112 36 160 40" fill="none" stroke={C.bleu} strokeWidth={10} />
      <rect x={58} y={22} width={14} height={66} rx={4} fill={C.bleu} />
      <rect x={58} y={180} width={14} height={50} rx={4} fill={C.bleu} />
      <path d="M262 112 H300 M262 130 H300" stroke={C.rouge} strokeWidth={8} />
      {/* Cavités */}
      <rect x={52} y={84} width={86} height={70} rx={24} fill={C.bleuClair} stroke={C.bleu} strokeWidth={4} />
      <rect x={172} y={84} width={92} height={70} rx={24} fill={C.rougeClair} stroke={C.rouge} strokeWidth={4} />
      <path d="M58 164 H138 L134 218 Q120 260 108 266 Q76 236 58 196 Z" fill={C.bleuClair} stroke={C.bleu} strokeWidth={4} />
      <path d="M172 164 H262 Q264 210 222 252 Q168 296 108 266 Q160 250 172 216 Z" fill={C.rougeClair} stroke={C.rouge} strokeWidth={10} />
      <rect x={146} y={84} width={18} height={180} rx={6} fill={C.gris} />
      {/* Valvules */}
      <path d="M78 156 L92 168 L106 156 M110 156" fill="none" stroke="#fff" strokeWidth={3.5} strokeLinecap="round" />
      <path d="M198 156 L212 168 L226 156" fill="none" stroke="#fff" strokeWidth={3.5} strokeLinecap="round" />
      <Txt x={95} y={124} t="OD" gras taille={13} />
      <Txt x={218} y={124} t="OG" gras taille={13} />
      <Txt x={98} y={206} t="VD" gras taille={13} />
      <Txt x={210} y={210} t="VG" gras taille={13} />
      <Legende x={196} y={16} tx={248} ty={14} t="Aorte" />
      <Legende x={150} y={40} tx={4} ty={14} t="" />
      <Txt x={4} y={14} t="Artère pulmonaire" ancre="start" taille={11} />
      <Legende x={300} y={121} tx={304} ty={150} t="" />
      <Lignes x={290} y={164} lignes={['Veines', 'pulmonaires']} ancre="start" taille={11} />
      <Lignes x={6} y={250} lignes={['Veines caves', 'OD/VD : oreillette et', 'ventricule droits']} ancre="start" taille={10} />
      <Lignes x={250} y={256} lignes={['OG/VG : gauches', 'paroi du VG épaisse']} ancre="start" taille={10} />
      <Legende x={155} y={250} tx={176} ty={290} t="Cloison" />
      <Legende x={212} y={164} tx={276} ty={196} t="Valvules" />
      <Txt x={180} y={298} t="" />
    </svg>
  )
}

function DoubleCirculation() {
  return (
    <svg viewBox="0 0 360 330" role="img" aria-labelledby="t-dc">
      <title id="t-dc">La double circulation : petite circulation vers les poumons, grande circulation vers les organes</title>
      <rect x={110} y={10} width={140} height={46} rx={14} fill={C.bleuClair} />
      <Txt x={180} y={38} t="Poumons" gras taille={13} />
      <rect x={110} y={274} width={140} height={46} rx={14} fill={C.jauneClair} />
      <Txt x={180} y={302} t="Organes" gras taille={13} />
      {/* Cœur coupé en deux */}
      <path d="M180 140 V212 Q140 196 124 170 Q114 140 140 130 Q164 124 180 140z" fill={C.bleu} />
      <path d="M180 140 V212 Q220 196 236 170 Q246 140 220 130 Q196 124 180 140z" fill={C.rouge} />
      <Txt x={150} y={176} t="droit" taille={10} />
      <Txt x={210} y={176} t="gauche" taille={10} />
      {/* Petite circulation */}
      <Fleche id="dc1" d="M140 134 Q70 110 120 58" couleur={C.bleu} epais={3} />
      <Fleche id="dc2" d="M240 58 Q290 110 222 132" couleur={C.rouge} epais={3} />
      {/* Grande circulation */}
      <Fleche id="dc3" d="M228 204 Q300 240 240 272" couleur={C.rouge} epais={3} />
      <Fleche id="dc4" d="M120 272 Q60 240 134 204" couleur={C.bleu} epais={3} />
      <Lignes x={8} y={92} lignes={['Petite', 'circulation']} ancre="start" taille={11} />
      <Lignes x={8} y={240} lignes={['Grande', 'circulation']} ancre="start" taille={11} />
      <Lignes x={290} y={90} lignes={['sang riche', 'en O₂']} ancre="start" taille={10} />
      <Lignes x={290} y={240} lignes={['vers tout', 'le corps']} ancre="start" taille={10} />
      <Txt x={180} y={234} t="Cœur" gras taille={12} />
    </svg>
  )
}

function Atherosclerose() {
  const art = (cx: number, contenu: React.ReactNode) => (
    <g>
      <circle cx={cx} cy={64} r={46} fill={C.rougeClair} stroke="#b06d63" strokeWidth={2} />
      <circle cx={cx} cy={64} r={30} fill={C.rouge} opacity={0.85} />
      {contenu}
    </g>
  )
  return (
    <svg viewBox="0 0 360 170" role="img" aria-labelledby="t-ath">
      <title id="t-ath">Athérosclérose : artère saine, plaque d'athérome, artère bouchée</title>
      {art(60, null)}
      {art(180, <path d="M150 64 A30 30 0 0 1 210 64 Q196 48 180 50 Q160 52 150 64z M150 64 A30 30 0 0 0 166 90 Q170 74 150 64z" fill={C.jaune} />)}
      {art(
        300,
        <>
          <path d="M270 64 A30 30 0 0 1 330 64 Q316 48 300 50 Q280 52 270 64z M270 64 A30 30 0 0 0 286 90 Q290 74 270 64z" fill={C.jaune} />
          <circle cx={302} cy={70} r={20} fill="#7a1f1f" />
        </>,
      )}
      <Lignes x={60} y={132} lignes={['Artère saine']} />
      <Lignes x={180} y={132} lignes={["Plaque d'athérome", 'passage réduit']} />
      <Lignes x={300} y={132} lignes={['Artère bouchée :', 'infarctus ou AVC']} />
    </svg>
  )
}

function PrisePouls() {
  return (
    <svg viewBox="0 0 360 220" role="img" aria-labelledby="t-pouls">
      <title id="t-pouls">Prise du pouls radial : trois doigts sur le poignet côté pouce</title>
      {/* Avant-bras et main, paume vers le haut */}
      <path d="M0 96 H200 Q214 96 222 88 L300 70 Q318 66 322 80 Q324 92 308 96 L340 98 Q356 100 354 112 Q352 124 336 122 L250 128 Q226 146 200 140 H0 Z" fill={C.peau} />
      <path d="M258 72 Q262 58 282 50 Q292 48 292 58 Q290 66 276 76" fill={C.peau} stroke="#d9a888" strokeWidth={1} />
      <path d="M0 118 H190" stroke={C.rouge} strokeWidth={3} strokeDasharray="6 4" />
      {/* Trois doigts posés */}
      {[150, 172, 194].map((x) => (
        <ellipse key={x} cx={x} cy={104} rx={9} ry={20} fill="#e8b48f" stroke="#b97f5c" strokeWidth={1.2} />
      ))}
      {/* Pas le pouce */}
      <g transform="translate(70 168)">
        <ellipse rx={10} ry={16} fill="#e8b48f" stroke="#b97f5c" />
        <path d="M-14 -14 L14 14 M14 -14 L-14 14" stroke={C.rouge} strokeWidth={3} strokeLinecap="round" />
      </g>
      <Txt x={92} y={172} t="Pas le pouce" ancre="start" taille={12} gras />
      <Legende x={110} y={118} tx={20} ty={60} t="Artère radiale (côté pouce)" />
      <Lignes x={172} y={172} lignes={['Index, majeur, annulaire', 'compter 1 minute']} ancre="start" taille={11} />
      <Txt x={286} y={42} t="pouce" taille={10} />
    </svg>
  )
}

export const schemas2: Record<string, () => React.ReactElement> = {
  'niveaux-organisation': NiveauxOrganisation,
  'fonctions-nutrition': FonctionsNutrition,
  'cavites-corps': CavitesCorps,
  cellule: Cellule,
  mitose: Mitose,
  cancerisation: Cancerisation,
  'sang-composition': SangComposition,
  coeur: Coeur,
  'double-circulation': DoubleCirculation,
  atherosclerose: Atherosclerose,
  'prise-pouls': PrisePouls,
}
