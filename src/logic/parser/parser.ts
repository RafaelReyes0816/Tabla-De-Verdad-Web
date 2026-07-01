import { ASTNode, ASTNodeType, Connector } from '../../types';
import { CONNECTOR_PRECEDENCE } from '../../constants';
import { Token } from './tokenizer';

function connectorToNodeType(connector: string): ASTNodeType {
  switch (connector) {
    case Connector.NOT: return ASTNodeType.NOT;
    case Connector.AND: return ASTNodeType.AND;
    case Connector.OR: return ASTNodeType.OR;
    case Connector.XOR: return ASTNodeType.XOR;
    case Connector.IMPLIES: return ASTNodeType.IMPLIES;
    case Connector.IFF: return ASTNodeType.IFF;
    default: throw new Error(`Conector desconocido: ${connector}`);
  }
}

export function parse(tokens: Token[]): ASTNode {
  let index = 0;

  function peek(): Token | undefined {
    return tokens[index];
  }

  function consume(): Token {
    if (index >= tokens.length) {
      throw new Error('Se esperaba más tokens pero la expresión terminó');
    }
    return tokens[index++];
  }

  function parsePrimary(): ASTNode {
    const token = peek();
    if (!token) {
      throw new Error('Expresión incompleta');
    }

    if (token.type === 'VARIABLE') {
      consume();
      let node: ASTNode;
      if (token.value === 'V') {
        node = { type: ASTNodeType.TRUE };
      } else if (token.value === 'F') {
        node = { type: ASTNodeType.FALSE };
      } else {
        node = { type: ASTNodeType.VARIABLE, value: token.value };
      }
      return node;
    }

    if (token.type === 'PAREN_OPEN') {
      consume();
      const node = parseExpression(0);
      const close = peek();
      if (!close || close.type !== 'PAREN_CLOSE') {
        throw new Error('Se esperaba paréntesis de cierre');
      }
      consume();
      return node;
    }

    if (token.type === 'CONNECTOR' && token.value === Connector.NOT) {
      consume();
      const operand = parsePrimary();
      return { type: ASTNodeType.NOT, operand };
    }

    throw new Error(`Token inesperado: ${token.value}`);
  }

  function parseExpression(minPrecedence: number): ASTNode {
    let left = parsePrimary();

    while (true) {
      const token = peek();
      if (!token || token.type === 'PAREN_CLOSE') {
        break;
      }

      if (token.type === 'CONNECTOR') {
        const precedence = CONNECTOR_PRECEDENCE[token.value] ?? 0;
        if (precedence < minPrecedence) {
          break;
        }
        consume();
        const right = parseExpression(precedence + 1);
        left = {
          type: connectorToNodeType(token.value),
          left,
          right,
        } as ASTNode;
        continue;
      }

      break;
    }

    return left;
  }

  const result = parseExpression(0);

  if (index < tokens.length) {
    throw new Error(`Tokens no procesados después de la expresión: ${tokens.slice(index).map(t => t.value).join(' ')}`);
  }

  return result;
}
