import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { LeaderboardEntry } from '../types';
import LeaderboardTable from '../components/LeaderboardTable';
import '../styles/global.css';

export default function LeaderboardScreen() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from('rounds')
          .select('team_name, score, time_ms, submitted_at')
          .order('score', { ascending: false })
          .order('time_ms', { ascending: true })
          .limit(50);

        if (data) {
          setEntries(
            data.map((row: any) => ({
              teamName: row.team_name,
              score: row.score,
              timeMs: row.time_ms,
              submittedAt: row.submitted_at,
            }))
          );
        }
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Leaderboard</h1>
        <p className="subtitle">Los mejores puntajes</p>
      </div>
      <LeaderboardTable entries={entries} loading={loading} />
    </div>
  );
}
