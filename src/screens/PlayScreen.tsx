import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import '../styles/global.css';

const MODE_INFO: Record<string, { title: string; subtitle: string }> = {
  standard: { title: 'Completar tabla', subtitle: 'Llena la tabla de verdad' },
  quick: { title: 'V o F rápido', subtitle: 'Responde lo más rápido posible' },
  expression: { title: 'Completar expresión', subtitle: 'Encuentra la expresión correcta' },
};

export default function PlayScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'standard';
  const [name, setName] = useState('');
  const info = MODE_INFO[mode] || MODE_INFO.standard;

  const handleSave = () => {
    if (!name.trim()) {
      window.alert('Ingresa un nombre de equipo');
      return;
    }
    localStorage.setItem('teamName', name.trim());
    const routeMap: Record<string, string> = {
      standard: '/game',
      quick: '/quick-game',
      expression: '/complete-expression',
    };
    navigate(`${routeMap[mode]}?teamName=${encodeURIComponent(name.trim())}`);
  };

  return (
    <div className="container">
      <div className="scroll-content">
        <div className="header">
          <h1 className="title">{info.title}</h1>
          <p className="subtitle">{info.subtitle}</p>
        </div>

        <input
          className="input"
          type="text"
          placeholder="Nombre de tu equipo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="submit-btn" onClick={handleSave}>
          Guardar
        </button>
      </div>
    </div>
  );
}
