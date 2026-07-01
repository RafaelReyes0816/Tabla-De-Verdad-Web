import { Connector } from '../../types';
import { CONNECTOR_TOKENS } from '../../constants';

export interface Token {
  type: 'VARIABLE' | 'CONNECTOR' | 'PAREN_OPEN' | 'PAREN_CLOSE';
  value: string;
}

export function tokenize(expression: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < expression.length) {
    const char = expression[i];

    if (char === '(') {
      tokens.push({ type: 'PAREN_OPEN', value: char });
      i++;
      continue;
    }

    if (char === ')') {
      tokens.push({ type: 'PAREN_CLOSE', value: char });
      i++;
      continue;
    }

    if (CONNECTOR_TOKENS.includes(char)) {
      tokens.push({ type: 'CONNECTOR', value: char });
      i++;
      continue;
    }

    if (/\s/.test(char)) {
      i++;
      continue;
    }

    if (/[a-zA-Z]/.test(char)) {
      let varName = '';
      while (i < expression.length && /[a-zA-Z0-9]/.test(expression[i])) {
        varName += expression[i];
        i++;
      }
      tokens.push({ type: 'VARIABLE', value: varName });
      continue;
    }

    throw new Error(`Caracter no reconocido: "${char}" en posición ${i}`);
  }

  return tokens;
}
