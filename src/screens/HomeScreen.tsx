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

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="button tutorial" onClick={() => navigate('/tutorial')}>
            <div style={{ flex: 1 }}>
              <div className="button-title">Aprender</div>
              <div className="button-desc">Descubre cómo funcionan las tablas de verdad</div>
            </div>
            <span style={{ color: '#10b981', fontSize: 20, fontWeight: 700 }}>&gt;</span>
          </div>

          <div className="button scenario" onClick={() => navigate('/scenarios')}>
            <div style={{ flex: 1 }}>
              <div className="button-title">Lógica en tu día a día</div>
              <div className="button-desc">Aplica la lógica a situaciones cotidianas</div>
            </div>
            <span style={{ color: '#8b5cf6', fontSize: 20, fontWeight: 700 }}>&gt;</span>
          </div>

          <div className="button play" onClick={() => navigate('/games-menu')}>
            <div style={{ flex: 1 }}>
              <div className="button-title">Juegos</div>
              <div className="button-desc">Pon a prueba tus conocimientos</div>
            </div>
            <span style={{ color: '#3b82f6', fontSize: 20, fontWeight: 700 }}>&gt;</span>
          </div>
        </div>

        <div
          style={{ textAlign: 'center', marginTop: 24, cursor: 'pointer' }}
          onClick={() => navigate('/leaderboard')}
        >
          <span style={{ color: '#60a5fa', fontSize: 14, textDecoration: 'underline' }}>
            Ver Leaderboard
          </span>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button
            onClick={() => navigate('/about')}
            style={{
              background: 'none',
              border: '1px solid #334155',
              borderRadius: 8,
              padding: '10px 24px',
              color: '#94a3b8',
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = '#64748b'; e.currentTarget.style.color = '#cbd5e1'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#94a3b8'; }}
          >
            Sobre la app
          </button>
        </div>
      </div>
    </div>
  );
}
