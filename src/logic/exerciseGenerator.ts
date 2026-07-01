const VARIABLES_POOL = ['p', 'q', 'r'];

type NodeType = 'Variable' | 'True' | 'False' | 'Not' | 'And' | 'Or' | 'Xor' | 'Implies' | 'Iff';

interface GenNode {
  type: NodeType;
  value?: string;
  left?: GenNode;
  right?: GenNode;
  operand?: GenNode;
}

const OP_AND: Record<string, string> = { VV: 'V', VF: 'F', FV: 'F', FF: 'F' };
const OP_OR: Record<string, string> = { VV: 'V', VF: 'V', FV: 'V', FF: 'F' };
const OP_XOR: Record<string, string> = { VV: 'F', VF: 'V', FV: 'V', FF: 'F' };
const OP_IMPLIES: Record<string, string> = { VV: 'V', VF: 'F', FV: 'V', FF: 'V' };
const OP_IFF: Record<string, string> = { VV: 'V', VF: 'F', FV: 'F', FF: 'V' };
const OP_NOT: Record<string, string> = { V: 'F', F: 'V' };

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAst(varCount: number, depth: number): GenNode {
  if (depth >= 2)
    return { type: 'Variable', value: VARIABLES_POOL[randomInt(0, varCount - 1)] };

  const r = Math.random();
  if (r < 0.15)
    return { type: 'Not', operand: generateAst(varCount, depth + 1) };
  if (depth > 0 && r < 0.25)
    return { type: 'Variable', value: VARIABLES_POOL[randomInt(0, varCount - 1)] };

  const left = generateAst(varCount, depth + 1);
  const right = generateAst(varCount, depth + 1);
  const types: NodeType[] = ['And', 'Or', 'Xor', 'Implies', 'Iff'];
  return { type: types[randomInt(0, types.length - 1)], left, right };
}

function astToString(node: GenNode): string {
  switch (node.type) {
    case 'Variable': return node.value!;
    case 'True': return 'V';
    case 'False': return 'F';
    case 'Not': return `∼${astToString(node.operand!)}`;
    case 'And': return `(${astToString(node.left!)} ∧ ${astToString(node.right!)})`;
    case 'Or': return `(${astToString(node.left!)} ∨ ${astToString(node.right!)})`;
    case 'Xor': return `(${astToString(node.left!)} ∆ ${astToString(node.right!)})`;
    case 'Implies': return `(${astToString(node.left!)} → ${astToString(node.right!)})`;
    case 'Iff': return `(${astToString(node.left!)} ↔ ${astToString(node.right!)})`;
  }
}

function evaluate(node: GenNode, values: Record<string, string>): string {
  switch (node.type) {
    case 'Variable': return values[node.value!];
    case 'True': return 'V';
    case 'False': return 'F';
    case 'Not': return OP_NOT[evaluate(node.operand!, values)];
    case 'And': return OP_AND[`${evaluate(node.left!, values)}${evaluate(node.right!, values)}`];
    case 'Or': return OP_OR[`${evaluate(node.left!, values)}${evaluate(node.right!, values)}`];
    case 'Xor': return OP_XOR[`${evaluate(node.left!, values)}${evaluate(node.right!, values)}`];
    case 'Implies': return OP_IMPLIES[`${evaluate(node.left!, values)}${evaluate(node.right!, values)}`];
    case 'Iff': return OP_IFF[`${evaluate(node.left!, values)}${evaluate(node.right!, values)}`];
  }
}

export interface SubExpr {
  expression: string;
  node: GenNode;
}

export interface GeneratedExercise {
  expression: string;
  variables: string[];
  subExpressions: string[];
  rows: string[][];
  correctAnswer: string[];
}

function collectSubExpressions(node: GenNode): SubExpr[] {
  const result: SubExpr[] = [];
  function traverse(n: GenNode): void {
    if (n.type === 'Not') {
      traverse(n.operand!);
      result.push({ expression: astToString(n), node: n });
    } else if (n.type !== 'Variable' && n.type !== 'True' && n.type !== 'False') {
      traverse(n.left!);
      traverse(n.right!);
      result.push({ expression: astToString(n), node: n });
    }
  }
  traverse(node);
  return result;
}

export function generateExercise(minVariables = 2, maxVariables = 3): GeneratedExercise {
  const varCount = randomInt(minVariables, maxVariables);
  const variables = VARIABLES_POOL.slice(0, varCount);
  const ast = generateAst(varCount, 0);
  const expression = astToString(ast);
  const totalRows = 1 << varCount;

  const subExprs = collectSubExpressions(ast);
  const subExpressions = subExprs.map(s => s.expression);

  const rows: string[][] = [];
  const correctAnswer: string[] = [];

  for (let i = totalRows - 1; i >= 0; i--) {
    const values: Record<string, string> = {};
    const row: string[] = [];

    for (let j = 0; j < varCount; j++) {
      const val = (i & (1 << (varCount - 1 - j))) !== 0 ? 'V' : 'F';
      values[variables[j]] = val;
      row.push(val);
    }

    for (const sub of subExprs) {
      row.push(evaluate(sub.node, values));
    }

    rows.push(row);
    correctAnswer.push(row[row.length - 1]);
  }

  return { expression, variables, subExpressions, rows, correctAnswer };
}
