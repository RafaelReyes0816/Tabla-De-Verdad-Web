import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

export default function GamesMenuScreen() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('teamName');
    if (stored) setTeamName(stored);
  }, []);

  const handleMode = (mode: 'standard' | 'quick' | 'expression') => {
    if (!teamName) {
      navigate(`/play?mode=${mode}`);
    } else {
      const routeMap: Record<string, string> = {
        standard: `/game?teamName=${encodeURIComponent(teamName)}`,
        quick: `/quick-game?teamName=${encodeURIComponent(teamName)}`,
        expression: `/complete-expression?teamName=${encodeURIComponent(teamName)}`,
      };
      navigate(routeMap[mode]);
    }
  };

  return (
    <div className="container">
      <div className="scroll-content">
        <div className="header">
          <h1 className="title">Elige un juego</h1>
        </div>

        {teamName && (
          <div className="name-row">
            <span className="name-text">{teamName}</span>
            <span className="change-text" onClick={() => navigate('/play')}>
              Cambiar
            </span>
          </div>
        )}

        <div className="button-group">
          <div className="button standard" onClick={() => handleMode('standard')}>
            <div style={{ flex: 1 }}>
              <div className="button-title">Completar tabla</div>
              <div className="button-desc">Llena la tabla de verdad de la expresión</div>
            </div>
            <span className="button-arrow" style={{ color: '#3b82f6' }}>&rarr;</span>
          </div>

          <div className="button quick" onClick={() => handleMode('quick')}>
            <div style={{ flex: 1 }}>
              <div className="button-title">V o F rápido</div>
              <div className="button-desc">Responde verdadero o falso contra el reloj</div>
            </div>
            <span className="button-arrow" style={{ color: '#f59e0b' }}>&rarr;</span>
          </div>

          <div className="button expression" onClick={() => handleMode('expression')}>
            <div style={{ flex: 1 }}>
              <div className="button-title">Completar expresión</div>
              <div className="button-desc">Elige la expresión correcta para la tabla</div>
            </div>
            <span className="button-arrow" style={{ color: '#f43f5e' }}>&rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
