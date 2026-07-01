import { useNavigate, useLocation } from 'react-router-dom';

const PARENT_ROUTES: Record<string, string> = {
  '/games-menu': '/',
  '/play': '/games-menu',
  '/game': '/games-menu',
  '/result': '/games-menu',
  '/quick-game': '/games-menu',
  '/quick-game-result': '/games-menu',
  '/complete-expression': '/games-menu',
  '/leaderboard': '/',
  '/tutorial': '/',
  '/tutorial-lesson': '/tutorial',
  '/scenarios': '/',
  '/scenario-detail': '/scenarios',
  '/about': '/',
};

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const parentPath = PARENT_ROUTES[location.pathname];

  if (isHome || !parentPath) return null;

  return (
    <div className="topbar">
      <button className="topbar-back" onClick={() => navigate(parentPath)} aria-label="Volver">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    </div>
  );
}
