export default function AboutScreen() {
  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Sobre la app</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{
          background: '#1e293b',
          borderRadius: 12,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ fontSize: 14, color: '#64748b' }}>Desarrollada por</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc' }}>Rafael Reyes</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc' }}>Jhordy Castillo</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc' }}>Noel Gareca</div>
        </div>

        <div style={{
          background: '#1e293b',
          borderRadius: 12,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8' }}>Versión</div>
          <div style={{ fontSize: 16, color: '#f8fafc' }}>1.0.0</div>
        </div>

        <div style={{
          background: '#1e293b',
          borderRadius: 12,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8' }}>Privacidad</div>
          <div style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.6 }}>
            Esta aplicación recopila únicamente los nombres de equipo y puntajes necesarios para el funcionamiento del leaderboard. No compartimos tus datos con terceros.
          </div>
          <a
            className="privacy-link"
            href="https://www.termsfeed.com/live/c5359cea-0ed9-4df3-9a4d-7d2d6c6b4ada"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 14 }}
          >
            Ver política de privacidad completa
          </a>
        </div>
      </div>
    </div>
  );
}
