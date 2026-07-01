import type { TruthValue } from '../types';

interface Props {
  variables: string[];
  subExpressions: string[];
  rows: string[][];
  answers: ('' | TruthValue)[];
  onChangeAnswer: (rowIndex: number, value: TruthValue) => void;
  readOnly?: boolean;
  correctAnswer?: string[];
}

export default function TruthTableGrid({
  variables,
  subExpressions,
  rows,
  answers,
  onChangeAnswer,
  readOnly = false,
  correctAnswer,
}: Props) {
  const varCount = variables.length;

  return (
    <div className="truth-table-wrap">
      <div className="truth-table-container">
        <table className="truth-table">
          <thead>
            <tr>
              {variables.map(v => (
                <th key={v} className="truth-th-var">{v}</th>
              ))}
              {subExpressions.map((_, i) => (
                <th
                  key={i}
                  className={i === subExpressions.length - 1 ? 'truth-th-result' : 'truth-th-sub'}
                >
                  E{i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? 'truth-row-even' : 'truth-row-odd'}>
                {row.slice(0, varCount).map((cell, ci) => (
                  <td key={ci} className="truth-td-var">{cell}</td>
                ))}
                {row.slice(varCount, -1).map((cell, ci) => (
                  <td key={ci} className="truth-td-sub">{cell}</td>
                ))}
                <td className="truth-td-result">
                  {!readOnly ? (
                    <div className="truth-btn-group">
                      {(['V', 'F'] as TruthValue[]).map(val => {
                        const selected = answers[ri] === val;
                        return (
                          <button
                            key={val}
                            onClick={() => onChangeAnswer(ri, val)}
                            className={
                              `truth-btn${selected ? (val === 'V' ? ' truth-btn-v' : ' truth-btn-f') : ''}`
                            }
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <span className={
                      correctAnswer && answers[ri] === correctAnswer[ri]
                        ? 'truth-answer-correct'
                        : (answers[ri] !== '' && correctAnswer && answers[ri] !== correctAnswer[ri]
                          ? 'truth-answer-wrong'
                          : 'truth-answer-neutral')
                    }>
                      {answers[ri] || ''}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="truth-legend">
        {subExpressions.map((expr, i) => (
          <div key={i} className={i === subExpressions.length - 1 ? 'truth-legend-last' : 'truth-legend-item'}>
            E{i + 1} = {expr}
            {i === subExpressions.length - 1 ? '  ← responder' : ''}
          </div>
        ))}
      </div>
    </div>
  );
}
