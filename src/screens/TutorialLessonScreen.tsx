import { useNavigate, useSearchParams } from 'react-router-dom';
import tutorialData from '../data/tutorial';
import { parseExpression } from '../logic/parser';
import { generateTruthTable } from '../logic/truthTable';
import { classifyLabel } from '../logic/classifier';
import '../styles/global.css';

export default function TutorialLessonScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const levelId = searchParams.get('id');

  const level = tutorialData.find((l) => l.id === levelId);

  if (!level) {
    return (
      <div className="container">
        <div className="loading">Nivel no encontrado</div>
        <button className="home-btn" onClick={() => navigate('/tutorial')}>
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">{level.title}</h1>
        <p className="subtitle">{level.description}</p>
      </div>

      <div className="scenario-content" style={{ whiteSpace: 'pre-line', marginBottom: 24 }}>
        {level.connectorExplanation}
      </div>

      {level.exercises.map((ex, i) => {
        let resultType = '';
        try {
          const ast = parseExpression(ex.correctExpression);
          const table = generateTruthTable(ast);
          resultType = classifyLabel(table.classification);
        } catch {
          resultType = '—';
        }

        return (
          <div key={i} className="quick-question">
            <div className="quick-expression">{ex.phrase}</div>
            <div className="quick-vars" style={{ marginTop: 8 }}>
              Expresión: <strong>{ex.correctExpression}</strong>
            </div>
            <div className="quick-vars">
              Tipo: <strong>{resultType}</strong>
            </div>
            <div className="quick-vars" style={{ color: '#94a3b8' }}>
              {ex.explanation}
            </div>
          </div>
        );
      })}

      <button className="home-btn" onClick={() => navigate('/tutorial')}>
        Volver
      </button>
    </div>
  );
}
