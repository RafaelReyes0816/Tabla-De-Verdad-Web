import { generateExercise } from './exerciseGenerator';

interface QuickGameQuestion {
  expression: string;
  variableValues: Record<string, string>;
  correctAnswer: string;
}

interface QuickGameSession {
  questions: QuickGameQuestion[];
  correctAnswers: string[];
  createdAt: number;
}

interface QuickGameStartResponse {
  gameId: string;
  timeLimitSeconds: number;
  questions: QuickGameQuestion[];
}

interface QuickGameSubmitResponse {
  mensaje: string;
  correctCount: number;
  totalCount: number;
  score: number;
  details: QuickGameResultDetail[];
}

interface QuickGameResultDetail {
  expression: string;
  variableValues: Record<string, string>;
  givenAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

const sessions = new Map<string, QuickGameSession>();

export function startQuickGame(questionCount: number): QuickGameStartResponse {
  const questions: QuickGameQuestion[] = [];
  const correctAnswers: string[] = [];

  for (let i = 0; i < questionCount; i++) {
    const exercise = generateExercise();
    const rowIndex = Math.floor(Math.random() * exercise.rows.length);
    const row = exercise.rows[rowIndex];

    const variableValues: Record<string, string> = {};
    for (let j = 0; j < exercise.variables.length; j++)
      variableValues[exercise.variables[j]] = row[j];

    const answer = row[row.length - 1];
    questions.push({ expression: exercise.expression, variableValues, correctAnswer: answer });
    correctAnswers.push(answer);
  }

  const gameId = Math.random().toString(36).substring(2, 10);
  sessions.set(gameId, { questions, correctAnswers, createdAt: Date.now() });

  return { gameId, timeLimitSeconds: 30, questions };
}

export function submitQuickGame(gameId: string, answers: string[]): QuickGameSubmitResponse | null {
  const session = sessions.get(gameId);
  if (!session) return null;

  const details: QuickGameResultDetail[] = [];
  let correct = 0;

  for (let i = 0; i < session.correctAnswers.length; i++) {
    const userAnswer = i < answers.length ? answers[i] : '';
    const isCorrect = session.correctAnswers[i].toLowerCase() === userAnswer.toLowerCase();
    if (isCorrect) correct++;

    if (i < session.questions.length) {
      details.push({
        expression: session.questions[i].expression,
        variableValues: session.questions[i].variableValues,
        givenAnswer: userAnswer,
        correctAnswer: session.correctAnswers[i],
        isCorrect,
      });
    }
  }

  sessions.delete(gameId);

  return {
    mensaje: `Acertaste ${correct} de ${session.correctAnswers.length}.`,
    correctCount: correct,
    totalCount: session.correctAnswers.length,
    score: correct * 100,
    details,
  };
}
