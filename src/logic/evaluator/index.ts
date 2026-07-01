import { ASTNode, ASTNodeType, TruthValue } from '../../types';
import {
  NEGATION_TABLE,
  CONJUNCTION_TABLE,
  DISJUNCTION_TABLE,
  XOR_TABLE,
  IMPLIES_TABLE,
  IFF_TABLE,
} from '../../constants';

export function evaluate(node: ASTNode, variableValues: Record<string, TruthValue>): TruthValue {
  switch (node.type) {
    case ASTNodeType.VARIABLE: {
      if (node.value === 'V') return 'V';
      if (node.value === 'F') return 'F';
      const value = variableValues[node.value];
      if (!value) {
        throw new Error(`Variable "${node.value}" no tiene valor asignado`);
      }
      return value;
    }

    case ASTNodeType.TRUE:
      return 'V';

    case ASTNodeType.FALSE:
      return 'F';

    case ASTNodeType.NOT: {
      const operand = evaluate(node.operand, variableValues);
      return NEGATION_TABLE[operand];
    }

    case ASTNodeType.AND: {
      const left = evaluate(node.left, variableValues);
      const right = evaluate(node.right, variableValues);
      return CONJUNCTION_TABLE[`${left}∧${right}`];
    }

    case ASTNodeType.OR: {
      const left = evaluate(node.left, variableValues);
      const right = evaluate(node.right, variableValues);
      return DISJUNCTION_TABLE[`${left}∨${right}`];
    }

    case ASTNodeType.XOR: {
      const left = evaluate(node.left, variableValues);
      const right = evaluate(node.right, variableValues);
      return XOR_TABLE[`${left}∆${right}`];
    }

    case ASTNodeType.IMPLIES: {
      const left = evaluate(node.left, variableValues);
      const right = evaluate(node.right, variableValues);
      return IMPLIES_TABLE[`${left}→${right}`];
    }

    case ASTNodeType.IFF: {
      const left = evaluate(node.left, variableValues);
      const right = evaluate(node.right, variableValues);
      return IFF_TABLE[`${left}↔${right}`];
    }
  }
}
