import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { generateExpressionQuestion, submitExpressionGame } from '../logic/expressionGameService';
import { supabase } from '../services/supabase';
import { generateCodigo } from '../logic/codigo';
import { RoundResult } from '../types';
import '../styles/global.css';

interface Question {
  gameId: string;
  variables: string[];
  subExpressions: string[];
  rows: string[][];
  options: string[];
}

export default function CompleteExpressionScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const teamName = searchParams.get('teamName') || '';

  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [startedAt] = useState(() => new Date().toISOString());

  useEffect(() => {
    const q = generateExpressionQuestion();
    setQuestion({
      gameId: q.gameId,
      variables: q.variables,
      subExpressions: q.subExpressions,
      rows: q.rows,
      options: q.options,
    });
    setLoading(false);
  }, []);

  const handleSubmit = async () => {
    if (!question || selectedOption === null) return;

    const result = submitExpressionGame(question.gameId, selectedOption);
    if (!result) return;

    const codigo = generateCodigo('EXP');
    const submittedAt = new Date().toISOString();
    const timeMs = Date.parse(submittedAt) - Date.parse(startedAt);

    const roundResult: RoundResult = {
      mensaje: result.mensaje,
      isCorrect: result.isCorrect,
      score: result.score,
      timeMs,
      correctAnswer: result.isCorrect ? null : [result.correctExpression],
    };

    try {
      await supabase.from('rounds').insert({
        codigo,
        team_name: teamName,
        expression: question.options[selectedOption],
        variables: question.variables,
        rows: question.rows,
        correct_answer: [result.correctExpression],
        submitted_answer: [question.options[selectedOption]],
        is_correct: result.isCorrect,
        score: result.score,
        time_ms: timeMs,
        started_at: startedAt,
        submitted_at: submittedAt,
        game_type: 'expression',
      });
    } catch {
    }

    navigate('/result', { state: { result: roundResult } });
  };

  if (loading || !question) {
    return (
      <div className="container">
        <div className="loading">Generando pregunta...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Completa la expresión</h1>
        <p className="subtitle">Elige la expresión que corresponde a la tabla</p>
      </div>

      {teamName && <div className="team-name">Equipo: {teamName}</div>}

      <div className="truth-table-container">
        <table className="truth-table">
          <thead>
            <tr>
              {question.variables.map((v) => (
                <th key={v} className="truth-th-var">{v}</th>
              ))}
              {question.subExpressions.map((_, i) => (
                <th key={i} className={i === question.subExpressions.length - 1 ? 'truth-th-result' : 'truth-th-sub'}>
                  E{i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {question.rows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? 'truth-row-even' : 'truth-row-odd'}>
                {row.map((cell, ci) => {
                  const isVar = ci < question.variables.length;
                  const isResult = ci === row.length - 1;
                  return (
                    <td key={ci} className={isVar ? 'truth-td-var' : isResult ? 'truth-td-result' : 'truth-td-sub'}>
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="truth-legend" style={{ marginBottom: 16 }}>
        {question.subExpressions.map((expr, i) => (
          <div key={i} className={i === question.subExpressions.length - 1 ? 'truth-legend-last' : 'truth-legend-item'}>
            E{i + 1} = {expr}
            {i === question.subExpressions.length - 1 ? '  ← resultado' : ''}
          </div>
        ))}
      </div>

      <div className="button-group">
        {question.options.map((opt, i) => (
          <button
            key={i}
            className={`expression-option${selectedOption === i ? ' selected' : ''}`}
            onClick={() => setSelectedOption(i)}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        className="submit-btn"
        disabled={selectedOption === null}
        onClick={handleSubmit}
      >
        Enviar
      </button>
    </div>
  );
}
