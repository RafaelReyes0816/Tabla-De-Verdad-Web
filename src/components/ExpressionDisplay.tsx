interface Props {
  expression: string;
}

export default function ExpressionDisplay({ expression }: Props) {
  return (
    <div style={{
      background: '#1e293b',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    }}>
      <div style={{
        color: '#94a3b8',
        fontSize: 12,
        marginBottom: 8,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}>
        Expresión lógica
      </div>
      <div style={{
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: 700,
        fontFamily: "'SF Mono', 'Fira Code', monospace",
        overflowX: 'auto',
        whiteSpace: 'nowrap',
      }}>
        {expression}
      </div>
    </div>
  );
}
