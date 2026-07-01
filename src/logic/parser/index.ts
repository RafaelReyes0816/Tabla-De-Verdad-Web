import { ASTNode } from '../../types';
import { tokenize } from './tokenizer';
import { parse } from './parser';

export function parseExpression(expression: string): ASTNode {
  const tokens = tokenize(expression);
  return parse(tokens);
}

export { tokenize } from './tokenizer';
export { parse } from './parser';
