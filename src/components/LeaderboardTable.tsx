import { FC } from 'react';
import { formatTime } from '../hooks/useTimer';

interface LeaderboardEntry {
  teamName: string;
  score: number;
  timeMs: number;
  submittedAt: string;
}

interface Props {
  entries: LeaderboardEntry[];
  loading?: boolean;
}

const medalColors: Record<number, string> = {
  1: '#fbbf24',
  2: '#94a3b8',
  3: '#b45309',
};

const LeaderboardTable: FC<Props> = ({ entries, loading = false }) => {
  if (loading) {
    return (
      <div className="loading">Cargando...</div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="leaderboard-empty">Aún no hay puntajes registrados.</div>
    );
  }

  return (
    <div>
      {entries.map((entry, index) => {
        const rank = index + 1;
        const medalColor = medalColors[rank];

        return (
          <div key={index} className="leaderboard-item">
            <div
              className="leaderboard-rank"
              style={medalColor ? { color: medalColor } : undefined}
            >
              {rank}
            </div>
            <div className="leaderboard-info">
              <div className="leaderboard-name">{entry.teamName}</div>
              <div className="leaderboard-meta">{formatTime(entry.timeMs)}</div>
            </div>
            <div className="leaderboard-score">{entry.score}</div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaderboardTable;
