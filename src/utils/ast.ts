import { ASTNode, ASTNodeType } from '../types';

export function getVariables(node: ASTNode): string[] {
  const vars = new Set<string>();

  function collect(n: ASTNode) {
    switch (n.type) {
      case ASTNodeType.VARIABLE:
        if (n.value !== 'V' && n.value !== 'F') {
          vars.add(n.value);
        }
        break;
      case ASTNodeType.NOT:
        collect(n.operand);
        break;
      case ASTNodeType.TRUE:
      case ASTNodeType.FALSE:
        break;
      default:
        collect((n as any).left);
        collect((n as any).right);
        break;
    }
  }

  collect(node);
  return Array.from(vars).sort();
}

export function astToString(node: ASTNode): string {
  switch (node.type) {
    case ASTNodeType.VARIABLE:
      return node.value;
    case ASTNodeType.TRUE:
      return 'V';
    case ASTNodeType.FALSE:
      return 'F';
    case ASTNodeType.NOT:
      return `∼${astToString(node.operand)}`;
    case ASTNodeType.AND:
      return `(${astToString(node.left)} ∧ ${astToString(node.right)})`;
    case ASTNodeType.OR:
      return `(${astToString(node.left)} ∨ ${astToString(node.right)})`;
    case ASTNodeType.XOR:
      return `(${astToString(node.left)} ∆ ${astToString(node.right)})`;
    case ASTNodeType.IMPLIES:
      return `(${astToString(node.left)} → ${astToString(node.right)})`;
    case ASTNodeType.IFF:
      return `(${astToString(node.left)} ↔ ${astToString(node.right)})`;
  }
}
