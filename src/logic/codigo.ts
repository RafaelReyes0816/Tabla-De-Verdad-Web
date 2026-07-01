export function generateCodigo(prefix: string): string {
  const rand = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `${prefix}-${rand}`;
}
