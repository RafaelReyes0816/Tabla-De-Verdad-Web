import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import scenariosData from '../data/scenarios';
import '../styles/global.css';

interface Question {
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const questionPool: Record<string, Question> = {
  alarma: {
    text: '¿Cuál es la expresión lógica que representa cuándo se activa la alarma?',
    options: ['(P ∨ V) ∧ ∼C', '(P ∧ V) ∧ ∼C', '(P ∨ V) ∧ C', '(P ∨ V) → ∼C'],
    correctIndex: 0,
    explanation: 'La alarma se activa si la puerta está abierta (P) O la ventana está rota (V), Y la casa no está encendida (∼C).',
  },
  semaforo: {
    text: '¿Cuál es la expresión que garantiza que nunca se enciendan verde y rojo al mismo tiempo?',
    options: ['∼(V ∧ R)', '∼V ∧ ∼R', 'V ∧ R', '∼(V ∨ R)'],
    correctIndex: 0,
    explanation: 'Nunca deben encenderse ambas luces simultáneamente. ∼(V ∧ R) es verdadero siempre que no estén ambas encendidas.',
  },
  acceso: {
    text: '¿Cuál es la expresión que modela el control de acceso biométrico?',
    options: ['(T ∧ P) ∨ H', 'T ∧ P ∧ H', '(T ∨ P) ∧ H', 'T → (P ∨ H)'],
    correctIndex: 0,
    explanation: 'Se ingresa si tienes tarjeta Y PIN, O si la huella te reconoce. Cualquiera de las dos vías es suficiente.',
  },
  lavadora: {
    text: '¿Cuál es la expresión que modela cuándo la lavadora inicia el ciclo?',
    options: ['(C ∧ L) ∧ ∼B', '(C ∨ L) ∧ ∼B', '(C ∧ L) ∧ B', 'C ∧ L ∧ B'],
    correctIndex: 0,
    explanation: 'La lavadora inicia si la puerta está cerrada (C) Y el tambor tiene agua (L) Y el bloqueo no está activado (∼B).',
  },
  votacion: {
    text: '¿Cuál es la expresión que modela la aprobación por mayoría?',
    options: [
      '(A ∧ B) ∨ (B ∧ C) ∨ (A ∧ C)',
      '(A ∨ B) ∧ (B ∨ C) ∧ (A ∨ C)',
      'A ∧ B ∧ C',
      'A ∨ B ∨ C',
    ],
    correctIndex: 0,
    explanation: 'Se aprueba si al menos 2 de 3 jueces votan a favor. Las combinaciones posibles son: A y B, B y C, o A y C.',
  },
  sumador: {
    text: '¿Cuál es la expresión para el bit de suma (sin acarreo) en un sumador binario de 1 bit?',
    options: ['A ∆ B', 'A ∧ B', 'A ∨ B', 'A → B'],
    correctIndex: 0,
    explanation: 'La suma de dos bits sin acarreo es A XOR B (A ∆ B). Da verdadero solo cuando los bits son diferentes.',
  },
};

export default function ScenarioDetailScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const scenarioId = searchParams.get('id');

  const scenario = scenariosData.find((s) => s.id === scenarioId);

  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!scenario) {
    return (
      <div className="container">
        <div className="loading">Escenario no encontrado</div>
        <button className="home-btn" onClick={() => navigate('/scenarios')}>
          Volver
        </button>
      </div>
    );
  }

  const question = questionPool[scenario.id];

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setAnswered(true);

    if (question && selected === question.correctIndex) {
      setCompleted(true);
    }
  };

  const handleNext = () => {
    navigate('/scenarios');
  };

  const isCorrect = question && selected === question.correctIndex;

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">{scenario.title}</h1>
      </div>

      <div className="scenario-content">{scenario.description}</div>

      <div style={{ marginBottom: 16 }}>
        <strong>Variables:</strong>
        <ul style={{ marginTop: 8, paddingLeft: 20, color: '#94a3b8' }}>
          {scenario.variables.map((v) => (
            <li key={v.symbol}>
              <strong>{v.symbol}</strong>: {v.label}
            </li>
          ))}
        </ul>
      </div>

      {question && (
        <div className="scenario-question">
          <div className="scenario-question-title">{question.text}</div>

          {question.options.map((opt, i) => {
            let className = 'scenario-option';
            if (answered) {
              if (i === question.correctIndex) className += ' correct';
              else if (i === selected && i !== question.correctIndex)
                className += ' incorrect';
            }
            return (
              <button
                key={i}
                className={className}
                onClick={() => handleSelect(i)}
                disabled={answered}
              >
                {opt}
              </button>
            );
          })}

          {!answered && (
            <button
              className="submit-btn"
              style={{ marginTop: 16 }}
              disabled={selected === null}
              onClick={handleSubmit}
            >
              Responder
            </button>
          )}

          {answered && (
            <div
              className="scenario-feedback"
              style={{
                color: isCorrect ? '#34d399' : '#fb7185',
                marginTop: 16,
                fontWeight: 700,
              }}
            >
              {isCorrect ? '¡Correcto!' : 'Incorrecto'}
            </div>
          )}

          {answered && (
            <div className="scenario-feedback" style={{ marginTop: 8 }}>
              {question.explanation}
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <div
          className="scenario-content"
          style={{ background: '#1e293b', borderRadius: '0.75rem', padding: 16 }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Expresión real:</div>
          <div style={{ fontFamily: 'monospace', fontSize: 16, color: '#fff' }}>
            {scenario.expression}
          </div>
          <div style={{ marginTop: 8, color: '#94a3b8', fontSize: 14 }}>
            {scenario.explanation}
          </div>
          {scenario.extraNote && (
            <div style={{ marginTop: 8, color: '#f59e0b', fontSize: 14 }}>
              {scenario.extraNote}
            </div>
          )}
        </div>
      </div>

      {answered && completed && (
        <div
          className="score-card"
          style={{ borderColor: '#10b981', marginTop: 24 }}
        >
          <div className="score-label" style={{ color: '#34d399' }}>
            ¡Completado!
          </div>
          <div className="score-value" style={{ fontSize: 32 }}>
            🎉
          </div>
          <div className="score-label">
            Has respondido correctamente este escenario.
          </div>
        </div>
      )}

      <button
        className="home-btn"
        onClick={handleNext}
        style={{ fontWeight: 700 }}
      >
        {answered ? 'Siguiente' : 'Volver'}
      </button>
    </div>
  );
}
