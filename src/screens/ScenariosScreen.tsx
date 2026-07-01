import { useNavigate } from 'react-router-dom';
import scenariosData from '../data/scenarios';
import '../styles/global.css';

const scenarioColors: Record<string, string> = {
  alarma: '#f43f5e',
  semaforo: '#10b981',
  acceso: '#3b82f6',
  lavadora: '#f59e0b',
  votacion: '#8b5cf6',
  sumador: '#ec4899',
};

export default function ScenariosScreen() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Escenarios</h1>
        <p className="subtitle">Lógica aplicada a situaciones reales</p>
      </div>

      {scenariosData.map((scenario) => (
        <div
          key={scenario.id}
          className="tutorial-card"
          style={{ borderLeftColor: scenarioColors[scenario.id] || '#64748b', cursor: 'pointer' }}
          onClick={() => navigate(`/scenario-detail?id=${scenario.id}`)}
        >
          <div className="tutorial-card-title">{scenario.title}</div>
          <div className="tutorial-card-desc">{scenario.description}</div>
        </div>
      ))}
    </div>
  );
}
