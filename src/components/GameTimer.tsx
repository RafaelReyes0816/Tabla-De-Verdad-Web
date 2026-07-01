import { formatTime } from '../hooks/useTimer';

interface Props {
  elapsed: number;
}

export default function GameTimer({ elapsed }: Props) {
  return (
    <div style={{
      textAlign: 'center',
      marginBottom: 16,
    }}>
      <span style={{
        color: '#f8fafc',
        fontSize: 36,
        fontWeight: 700,
        fontFamily: "'SF Mono', 'Fira Code', monospace",
      }}>
        {formatTime(elapsed)}
      </span>
    </div>
  );
}
