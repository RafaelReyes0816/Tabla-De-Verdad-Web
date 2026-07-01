export type ScoreColors = {
  bg: string;
  border: string;
  text: string;
};

export function getScoreColors(score: number): ScoreColors {
  if (score >= 100) return { bg: '#052e16', border: '#166534', text: '#22c55e' };
  if (score >= 75) return { bg: '#083344', border: '#0e7490', text: '#22d3ee' };
  if (score >= 50) return { bg: '#422006', border: '#a16207', text: '#fbbf24' };
  if (score >= 25) return { bg: '#431407', border: '#c2410c', text: '#fb923c' };
  return { bg: '#2d0a0a', border: '#7f1d1d', text: '#f87171' };
}
