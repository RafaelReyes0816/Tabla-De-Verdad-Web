import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { generateExercise } from '../logic/exerciseGenerator';
import { generateCodigo } from '../logic/codigo';
import { supabase } from '../services/supabase';
import ExpressionDisplay from '../components/ExpressionDisplay';
import TruthTableGrid from '../components/TruthTableGrid';
import GameTimer from '../components/GameTimer';
import { useTimer } from '../hooks/useTimer';
import type { RoundResult, TruthValue, GameType } from '../types';
import '../styles/global.css';

export default function GameScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const teamName = searchParams.get('teamName') || '';

  const [exercise, setExercise] = useState<ReturnType<typeof generateExercise> | null>(null);
  const [answers, setAnswers] = useState<('' | 'V' | 'F')[]>([]);
  const [codigo, setCodigo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { elapsed, start, stop } = useTimer();

  useEffect(() => {
    const ex = generateExercise();
    setExercise(ex);
    setAnswers(new Array(ex.rows.length).fill(''));
    setCodigo(generateCodigo('TAB'));
    start();
  }, [start]);

  const handleChangeAnswer = useCallback((rowIndex: number, value: 'V' | 'F') => {
    setAnswers((prev) => {
      const next = [...prev];
      next[rowIndex] = value;
      return next;
    });
  }, []);

  const handleSubmit = async () => {
    if (!exercise || submitting) return;
    setSubmitting(true);
    stop();

    const totalRows = exercise.rows.length;
    const correctCount = exercise.correctAnswer.reduce(
      (acc, ans, i) => acc + (answers[i] === ans ? 1 : 0),
      0
    );
    const score = Math.round((correctCount / totalRows) * 100);
    const isCorrect = score === 100;

    const result: RoundResult = {
      mensaje: isCorrect ? '¡Correcto!' : 'Sigue practicando',
      isCorrect,
      score,
      timeMs: elapsed,
      correctAnswer: isCorrect ? null : exercise.correctAnswer,
      correctCount,
      totalRows,
    };

    try {
      await supabase.from('rounds').insert({
        codigo,
        team_name: teamName,
        expression: exercise.expression,
        variables: exercise.variables,
        rows: exercise.rows,
        correct_answer: exercise.correctAnswer,
        submitted_answer: answers,
        is_correct: isCorrect,
        score,
        time_ms: elapsed,
        started_at: new Date(Date.now() - elapsed).toISOString(),
        submitted_at: new Date().toISOString(),
        game_type: 'standard' as GameType,
      });
    } catch {
      // supabase insert failed, proceed anyway
    }

    navigate('/result', { state: { result, teamName } });
  };

  if (!exercise) {
    return (
      <div className="container">
        <div className="loading">Generando ejercicio...</div>
      </div>
    );
  }

  const allAnswered = answers.every((a) => a !== '');

  return (
    <div className="container">
      <div className="scroll-content">
        <div className="header">
          <h1 className="title">Completar tabla</h1>
        </div>

        <GameTimer elapsed={elapsed} />

        <ExpressionDisplay expression={exercise.expression} />

        <TruthTableGrid
          variables={exercise.variables}
          subExpressions={exercise.subExpressions}
          rows={exercise.rows}
          answers={answers}
          onChangeAnswer={handleChangeAnswer}
        />

        <button
          className="submit-btn"
          disabled={!allAnswered || submitting}
          onClick={handleSubmit}
        >
          {submitting ? 'Enviando...' : 'Enviar respuestas'}
        </button>
      </div>
    </div>
  );
}
