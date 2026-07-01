import { TruthValue, PropositionType } from '../../types';

export function classify(results: TruthValue[]): PropositionType {
  if (results.length === 0) {
    return PropositionType.CONTINGENCY;
  }

  const allTrue = results.every(v => v === 'V');
  const allFalse = results.every(v => v === 'F');

  if (allTrue) {
    return PropositionType.TAUTOLOGY;
  }

  if (allFalse) {
    return PropositionType.CONTRADICTION;
  }

  return PropositionType.CONTINGENCY;
}

export function classifyLabel(type: PropositionType): string {
  switch (type) {
    case PropositionType.TAUTOLOGY:
      return 'Tautología';
    case PropositionType.CONTRADICTION:
      return 'Contradicción';
    case PropositionType.CONTINGENCY:
      return 'Contingencia';
  }
}
