import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { startQuickGame, submitQuickGame } from '../logic/quickGameService';
import { generateCodigo } from '../logic/codigo';
import { supabase } from '../services/supabase';
import type { GameType } from '../types';
import '../styles/global.css';

const QUESTION_COUNT = 5;
const TIME_LIMIT = 30;

export default function QuickGameScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const teamName = searchParams.get('teamName') || '';

  const [game, setGame] = useState<ReturnType<typeof startQuickGame> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [submitting, setSubmitting] = useState(false);
  const codigoRef = useRef(generateCodigo('QR'));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const g = startQuickGame(QUESTION_COUNT);
    setGame(g);
    setAnswers([]);
    setCurrentIndex(0);
    setTimeLeft(TIME_LIMIT);
  }, []);

  useEffect(() => {
    if (!game) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [game]);

  useEffect(() => {
    if (timeLeft === 0 && game && !submitting) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleAnswer = useCallback((answer: string) => {
    if (!game || submitting) return;
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (newAnswers.length >= game.questions.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      finishGame(newAnswers);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [game, answers, submitting]);

  const handleSubmit = useCallback(() => {
    if (!game || submitting) return;
    if (timerRef.current) clearInterval(timerRef.current);
    const filledAnswers = [...answers];
    while (filledAnswers.length < game.questions.length) {
      filledAnswers.push('');
    }
    finishGame(filledAnswers);
  }, [game, answers, submitting]);

  const finishGame = async (finalAnswers: string[]) => {
    if (!game || submitting) return;
    setSubmitting(true);

    const result = submitQuickGame(game.gameId, finalAnswers);
    if (!result) return;

    try {
      await supabase.from('rounds').insert({
        codigo: codigoRef.current,
        team_name: teamName,
        expression: 'quick-game',
        variables: [],
        rows: [],
        correct_answer: game.questions.map((q) => q.correctAnswer),
        submitted_answer: finalAnswers,
        is_correct: result.correctCount === result.totalCount,
        score: result.score,
        time_ms: (TIME_LIMIT - timeLeft) * 1000,
        started_at: new Date(Date.now() - (TIME_LIMIT - timeLeft) * 1000).toISOString(),
        submitted_at: new Date().toISOString(),
        game_type: 'quick' as GameType,
      });
    } catch {
      // proceed
    }

    navigate('/quick-game-result', { state: { result, teamName } });
  };

  if (!game) {
    return (
      <div className="container">
        <div className="loading">Preparando juego...</div>
      </div>
    );
  }

  const question = game.questions[currentIndex];

  return (
    <div className="container">
      <div className="scroll-content">
        <div className="header">
          <h1 className="title">V o F rápido</h1>
        </div>

        <div className={`quick-timer${timeLeft <= 10 ? ' warning' : ''}`}>
          {timeLeft}s
        </div>

        <div className="quick-question">
          <div className="quick-expression">{question.expression}</div>
          <div className="quick-vars">
            {Object.entries(question.variableValues).map(([k, v]) => (
              <span key={k} style={{ marginRight: 12 }}>
                {k} = {v}
              </span>
            ))}
          </div>
          <div className="quick-btn-group">
            <button
              className="quick-btn quick-btn-true"
              onClick={() => handleAnswer('V')}
              disabled={submitting}
            >
              V
            </button>
            <button
              className="quick-btn quick-btn-false"
              onClick={() => handleAnswer('F')}
              disabled={submitting}
            >
              F
            </button>
          </div>
        </div>

        <div className="quick-progress">
          {currentIndex + 1} / {game.questions.length}
        </div>
      </div>
    </div>
  );
}
