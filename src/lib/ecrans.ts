import type { Fiche, QuestionQuiz } from '../content/types'

export type Ecran =
  | { type: 'notion'; titre: string | null; md: string }
  | { type: 'question'; question: QuestionQuiz }
  | { type: 'fin' }

/** Découpe un cours en notions : une par titre « ## » (hors blocs de code). */
export const decouperNotions = (md: string) => {
  const res: { titre: string | null; lignes: string[] }[] = [{ titre: null, lignes: [] }]
  let dansCode = false
  for (const l of md.split('\n')) {
    if (/^```/.test(l)) dansCode = !dansCode
    const m = !dansCode && l.match(/^## (.+)$/)
    if (m) res.push({ titre: m[1].trim(), lignes: [] })
    else res[res.length - 1].lignes.push(l)
  }
  return res.map((r) => ({ titre: r.titre, md: r.lignes.join('\n').trim() })).filter((r) => r.md || r.titre)
}

/** Une fiche se lit en écrans si elle a des cartes ou un quiz (pas les exercices ni les mémos). */
export const lectureParEcrans = (f: Fiche) => f.cartes.length > 0 || f.quiz.length > 0

/** Notions, avec une question du quiz toutes les 2 notions, puis l'écran de fin. */
export const construireEcrans = (f: Fiche): Ecran[] => {
  const notions = decouperNotions(f.cours)
  const questions = [...f.quiz]
  const ecrans: Ecran[] = []
  notions.forEach((n, i) => {
    ecrans.push({ type: 'notion', ...n })
    const pasDerniere = i < notions.length - 1
    if ((i + 1) % 2 === 0 && pasDerniere && questions.length) ecrans.push({ type: 'question', question: questions.shift()! })
  })
  if (questions.length) ecrans.push({ type: 'question', question: questions.shift()! })
  ecrans.push({ type: 'fin' })
  return ecrans
}
