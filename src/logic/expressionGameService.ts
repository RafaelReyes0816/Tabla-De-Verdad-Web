import { generateExercise } from './exerciseGenerator';

interface ExpressionGameQuestion {
  gameId: string;
  variables: string[];
  subExpressions: string[];
  rows: string[][];
  options: string[];
}

interface ExpressionGameSubmitResponse {
  mensaje: string;
  isCorrect: boolean;
  correctExpression: string;
  score: number;
}

interface ExpressionGameSession {
  correctIndex: number;
  options: string[];
  correctExpression: string;
}

const sessions = new Map<string, ExpressionGameSession>();

const OPERATOR_OPPOSITES: Record<string, string> = {
  '∧': '∨',
  '∨': '∧',
  '→': '↔',
  '↔': '→',
  '∆': '∧',
};

function addModifiedDistractors(expression: string, distractors: string[]): void {
  for (const [op, opposite] of Object.entries(OPERATOR_OPPOSITES)) {
    if (expression.includes(op)) {
      const d = expression.replace(op, opposite);
      if (d !== expression && !distractors.includes(d))
        distractors.push(d);
    }
  }

  if (!expression.startsWith('∼') && distractors.length < 3) {
    const d = `∼${expression}`;
    if (!distractors.includes(d))
      distractors.push(d);
  } else if (expression.startsWith('∼') && distractors.length < 3) {
    const d = expression.length > 1 ? expression.substring(1) : expression;
    if (d !== expression && !distractors.includes(d))
      distractors.push(d);
  }
}

export function generateExpressionQuestion(): ExpressionGameQuestion {
  const correct = generateExercise();

  const distractors: string[] = [];
  addModifiedDistractors(correct.expression, distractors);

  while (distractors.length < 3) {
    const rand = generateExercise().expression;
    if (rand !== correct.expression && !distractors.includes(rand))
      distractors.push(rand);
  }

  const options = [correct.expression, ...distractors.slice(0, 3)];
  const shuffled = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffled.indexOf(correct.expression);

  const gameId = Math.random().toString(36).substring(2, 10);
  sessions.set(gameId, { correctIndex, options: shuffled, correctExpression: correct.expression });

  return {
    gameId,
    variables: correct.variables,
    subExpressions: correct.subExpressions,
    rows: correct.rows,
    options: shuffled,
  };
}

export function submitExpressionGame(gameId: string, selectedOption: number): ExpressionGameSubmitResponse | null {
  const session = sessions.get(gameId);
  if (!session) return null;

  const isCorrect = selectedOption === session.correctIndex;
  sessions.delete(gameId);

  return {
    mensaje: isCorrect ? '¡Correcto!' : 'Incorrecto.',
    isCorrect,
    score: isCorrect ? 100 : 0,
    correctExpression: session.correctExpression,
  };
}
