export enum Connector {
  NOT = '∼',
  AND = '∧',
  OR = '∨',
  XOR = '∆',
  IMPLIES = '→',
  IFF = '↔',
}

export enum ASTNodeType {
  VARIABLE = 'VARIABLE',
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  NOT = 'NOT',
  AND = 'AND',
  OR = 'OR',
  XOR = 'XOR',
  IMPLIES = 'IMPLIES',
  IFF = 'IFF',
}

export interface VariableNode {
  type: ASTNodeType.VARIABLE;
  value: string;
}

export interface TrueNode {
  type: ASTNodeType.TRUE;
}

export interface FalseNode {
  type: ASTNodeType.FALSE;
}

export interface UnaryNode {
  type: ASTNodeType.NOT;
  operand: ASTNode;
}

export interface BinaryNode {
  type: ASTNodeType.AND | ASTNodeType.OR | ASTNodeType.XOR | ASTNodeType.IMPLIES | ASTNodeType.IFF;
  left: ASTNode;
  right: ASTNode;
}

export type ASTNode = VariableNode | TrueNode | FalseNode | UnaryNode | BinaryNode;

export type TruthValue = 'V' | 'F';

export interface TruthTableRow {
  values: Record<string, TruthValue>;
  result: TruthValue;
}

export interface TruthTableResult {
  variables: string[];
  rows: TruthTableRow[];
  classification: PropositionType;
}

export enum PropositionType {
  TAUTOLOGY = 'TAUTOLOGY',
  CONTRADICTION = 'CONTRADICTION',
  CONTINGENCY = 'CONTINGENCY',
}

export interface RoundResponse {
  codigo: string;
  expression: string;
  variables: string[];
  rows: string[][];
}

export interface RoundResult {
  mensaje: string;
  isCorrect: boolean;
  score: number;
  timeMs: number;
  correctAnswer: string[] | null;
  correctCount?: number;
  totalRows?: number;
}

export interface LeaderboardEntry {
  teamName: string;
  score: number;
  timeMs: number;
  submittedAt: string;
}

export interface AdminStats {
  totalRounds: number;
  correctRounds: number;
  incorrectRounds: number;
  averageTimeMs: number;
  accuracyPercent: number;
  recentRounds: LeaderboardEntry[];
}

export type GameType = 'standard' | 'quick' | 'expression';

export interface RoundInsert {
  codigo: string;
  team_name: string;
  expression: string;
  variables: string[];
  rows: string[][];
  correct_answer: string[];
  submitted_answer?: string[];
  is_correct: boolean;
  score: number;
  time_ms: number;
  started_at: string;
  submitted_at: string;
  game_type: GameType;
}
