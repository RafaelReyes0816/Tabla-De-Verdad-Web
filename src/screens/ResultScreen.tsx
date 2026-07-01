import { useNavigate, useLocation } from 'react-router-dom';
import type { RoundResult } from '../types';
import { formatTime } from '../hooks/useTimer';
import { getScoreColors } from '../logic/scoreColors';
import '../styles/global.css';

export default function ResultScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { result: RoundResult; teamName: string } | null;

  if (!state) {
    return (
      <div className="container">
        <div className="loading">Sin resultados</div>
      </div>
    );
  }

  const { result, teamName } = state;
  const colors = getScoreColors(result.score);

  const renderIcon = () => {
    if (result.score >= 100) {
      return (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    }
    if (result.score >= 75) {
      return (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      );
    }
    if (result.score >= 50) {
      return (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
    }
    return (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    );
  };

  return (
    <div className="container">
      <div className="scroll-content">
        <div className="header">
          <h1 className="title">Resultado</h1>
          {teamName && <p className="subtitle">{teamName}</p>}
        </div>

        <div className="score-card" style={{ background: colors.bg, borderColor: colors.border }}>
          {renderIcon()}
          <div className="score-value" style={{ color: colors.text }}>
            {result.score}%
          </div>
          <div className="score-label" style={{ color: colors.text }}>
            {result.mensaje}
          </div>
        </div>

        {result.totalRows !== undefined && result.correctCount !== undefined && (
          <div className="correct-count">
            {result.correctCount} de {result.totalRows} correctos
          </div>
        )}

        <div className="time-value" style={{ textAlign: 'center', marginBottom: 24 }}>
          <div className="time-label">Tiempo</div>
          {formatTime(result.timeMs)}
        </div>

        {result.correctAnswer && (
          <div className="correct-answer-card">
            <div className="correct-answer-title">Respuesta correcta:</div>
            <div className="correct-answer">
              {result.correctAnswer.join(', ')}
            </div>
          </div>
        )}

        <div className="button-group">
          <button className="play-again-btn" onClick={() => navigate(-1)}>
            Jugar de nuevo
          </button>
          <button className="leaderboard-btn" onClick={() => navigate('/leaderboard')}>
            Ver Leaderboard
          </button>
          <button className="home-btn" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
