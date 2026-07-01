import '../styles/global.css';

export default function AboutScreen() {
  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Sobre la app</h1>
      </div>

      <div className="about-group">
        <div className="about-card">
          <div className="about-label">Desarrollada por</div>
          <div className="about-dev-list">
            <div className="about-value">Rafael Reyes</div>
            <div className="about-value">Jhordy Castillo</div>
            <div className="about-value">Noel Gareca</div>
          </div>
        </div>

        <div className="about-card">
          <div className="about-label">Versión</div>
          <div className="about-value">1.0.0</div>
        </div>

        <div className="about-card" style={{ alignItems: 'flex-start' }}>
          <div className="about-label">Privacidad</div>
          <div style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>
            Esta aplicación recopila únicamente los nombres de equipo y puntajes necesarios para el funcionamiento del leaderboard. No compartimos tus datos con terceros.
          </div>
          <a
            className="privacy-link"
            href="https://www.termsfeed.com/live/c5359cea-0ed9-4df3-9a4d-7d2d6c6b4ada"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver política de privacidad completa
          </a>
        </div>
      </div>
    </div>
  );
}
