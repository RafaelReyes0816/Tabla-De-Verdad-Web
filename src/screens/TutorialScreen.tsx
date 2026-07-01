import { useNavigate } from 'react-router-dom';
import tutorialData from '../data/tutorial';
import '../styles/global.css';

const levelColors: Record<string, string> = {
  and: '#10b981',
  or: '#3b82f6',
  not: '#f59e0b',
  combine: '#8b5cf6',
  implies: '#f43f5e',
  expert: '#ec4899',
};

export default function TutorialScreen() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Tutorial</h1>
        <p className="subtitle">Aprende lógica paso a paso</p>
      </div>

      {tutorialData.map((level, index) => (
        <div
          key={level.id}
          className="tutorial-card"
          style={{ borderLeftColor: levelColors[level.id] || '#64748b' }}
          onClick={() => navigate(`/tutorial-lesson?id=${level.id}`)}
        >
          <div className="tutorial-level">Nivel {index + 1}</div>
          <div className="tutorial-card-title">{level.title}</div>
          <div className="tutorial-card-desc">{level.description}</div>
          <div className="tutorial-card-desc" style={{ marginTop: 4, color: '#64748b' }}>
            {level.exercises.length} fórmulas
          </div>
        </div>
      ))}
    </div>
  );
}
