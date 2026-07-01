import { ASTNode, ASTNodeType, TruthValue, TruthTableResult, TruthTableRow, PropositionType } from '../../types';
import { evaluate } from '../evaluator';
import { getVariables } from '../../utils/ast';

function generateCombinations(variables: string[]): Record<string, TruthValue>[] {
  const total = 1 << variables.length;
  const result: Record<string, TruthValue>[] = [];

  for (let i = total - 1; i >= 0; i--) {
    const assignment: Record<string, TruthValue> = {};
    for (let j = 0; j < variables.length; j++) {
      assignment[variables[j]] = (i & (1 << (variables.length - 1 - j))) ? 'V' : 'F';
    }
    result.push(assignment);
  }

  return result;
}

export function generateTruthTable(ast: ASTNode): TruthTableResult {
  const variables = getVariables(ast);
  const combinations = generateCombinations(variables);
  const rows: TruthTableRow[] = [];

  for (const assignment of combinations) {
    const values: Record<string, TruthValue> = { ...assignment };
    const result = evaluate(ast, assignment);
    rows.push({ values, result });
  }

  const allResults = rows.map(r => r.result);
  let classification: PropositionType;
  if (allResults.every(v => v === 'V')) {
    classification = PropositionType.TAUTOLOGY;
  } else if (allResults.every(v => v === 'F')) {
    classification = PropositionType.CONTRADICTION;
  } else {
    classification = PropositionType.CONTINGENCY;
  }

  return {
    variables,
    rows,
    classification,
  };
}
