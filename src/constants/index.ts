import { Connector, TruthValue } from '../types';

export const CONNECTOR_PRECEDENCE: Record<string, number> = {
  [Connector.NOT]: 5,
  [Connector.AND]: 4,
  [Connector.OR]: 3,
  [Connector.XOR]: 3,
  [Connector.IMPLIES]: 2,
  [Connector.IFF]: 1,
};

export const CONNECTOR_TOKENS: string[] = [
  Connector.NOT,
  Connector.AND,
  Connector.OR,
  Connector.XOR,
  Connector.IMPLIES,
  Connector.IFF,
];

export const TRUTH_VALUES: TruthValue[] = ['V', 'F'];

export const NEGATION_TABLE: Record<TruthValue, TruthValue> = {
  V: 'F',
  F: 'V',
};

export const CONJUNCTION_TABLE: Record<string, TruthValue> = {
  'V∧V': 'V',
  'V∧F': 'F',
  'F∧V': 'F',
  'F∧F': 'F',
};

export const DISJUNCTION_TABLE: Record<string, TruthValue> = {
  'V∨V': 'V',
  'V∨F': 'V',
  'F∨V': 'V',
  'F∨F': 'F',
};

export const XOR_TABLE: Record<string, TruthValue> = {
  'V∆V': 'F',
  'V∆F': 'V',
  'F∆V': 'V',
  'F∆F': 'F',
};

export const IMPLIES_TABLE: Record<string, TruthValue> = {
  'V→V': 'V',
  'V→F': 'F',
  'F→V': 'V',
  'F→F': 'V',
};

export const IFF_TABLE: Record<string, TruthValue> = {
  'V↔V': 'V',
  'V↔F': 'F',
  'F↔V': 'F',
  'F↔F': 'V',
};
