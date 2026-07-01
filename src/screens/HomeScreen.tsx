import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="scroll-content">
        <div className="header">
          <h1 className="title">Tablas de Verdad</h1>
          <p className="subtitle">Juego de competencia</p>
        </div>

        <div className="button-group">
          <div className="button tutorial" onClick={() => navigate('/tutorial')}>
            <div style={{ flex: 1 }}>
              <div className="button-title">Aprender</div>
              <div className="button-desc">Descubre cómo funcionan las tablas de verdad</div>
            </div>
            <span className="button-arrow" style={{ color: '#10b981' }}>&rarr;</span>
          </div>

          <div className="button scenario" onClick={() => navigate('/scenarios')}>
            <div style={{ flex: 1 }}>
              <div className="button-title">Lógica en tu día a día</div>
              <div className="button-desc">Aplica la lógica a situaciones cotidianas</div>
            </div>
            <span className="button-arrow" style={{ color: '#8b5cf6' }}>&rarr;</span>
          </div>

          <div className="button play" onClick={() => navigate('/games-menu')}>
            <div style={{ flex: 1 }}>
              <div className="button-title">Juegos</div>
              <div className="button-desc">Pon a prueba tus conocimientos</div>
            </div>
            <span className="button-arrow" style={{ color: '#3b82f6' }}>&rarr;</span>
          </div>
        </div>

        <div className="leaderboard-link" onClick={() => navigate('/leaderboard')}>
          Ver Leaderboard
        </div>

        <div className="about-btn-wrap">
          <button className="about-btn" onClick={() => navigate('/about')}>
            Sobre la app
          </button>
        </div>
      </div>
    </div>
  );
}
