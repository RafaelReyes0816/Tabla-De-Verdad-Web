import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/global.css';

interface QuestionDetail {
  expression: string;
  variableValues: Record<string, string>;
  givenAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface QuickGameResult {
  mensaje: string;
  correctCount: number;
  totalCount: number;
  score: number;
  details: QuestionDetail[];
}

export default function QuickGameResultScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { result: QuickGameResult; teamName: string } | null;

  if (!state) {
    return (
      <div className="container">
        <div className="loading">Sin resultados</div>
      </div>
    );
  }

  const { result, teamName } = state;

  const getScoreColors = (score: number) => {
    if (score >= 100) return { bg: '#052e16', text: '#22c55e' };
    if (score >= 75) return { bg: '#083344', text: '#22d3ee' };
    if (score >= 50) return { bg: '#422006', text: '#fbbf24' };
    if (score >= 25) return { bg: '#431407', text: '#fb923c' };
    return { bg: '#2d0a0a', text: '#f87171' };
  };

  const colors = getScoreColors(result.score);

  return (
    <div className="container">
      <div className="scroll-content">
        <div className="header">
          <h1 className="title">Resultado Rápido</h1>
          {teamName && <p className="subtitle">{teamName}</p>}
        </div>

        <div
          className="score-card"
          style={{ background: colors.bg, borderColor: colors.text }}
        >
          <div className="score-value" style={{ color: colors.text }}>
            {result.score}%
          </div>
          <div className="score-label" style={{ color: colors.text }}>
            {result.correctCount} de {result.totalCount} correctos
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          {result.details.map((detail, i) => (
            <div
              key={i}
              className={`correct-answer-card detail-card ${detail.isCorrect ? 'detail-card-correct' : 'detail-card-incorrect'}`}
            >
              <div className="quick-expression" style={{ fontSize: 14, marginBottom: 4 }}>
                {detail.expression}
              </div>
              <div className="detail-vars">
                {Object.entries(detail.variableValues).map(([k, v]) => (
                  <span key={k} style={{ marginRight: 8 }}>{k} = {v}</span>
                ))}
              </div>
              <div className="detail-answers">
                Respuesta: <span className="detail-given">{detail.givenAnswer || '—'}</span> | Correcta: {detail.correctAnswer}
              </div>
            </div>
          ))}
        </div>

        <div className="button-group">
          <button className="play-again-btn" onClick={() => navigate(`/quick-game?teamName=${encodeURIComponent(teamName)}`)}>
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
