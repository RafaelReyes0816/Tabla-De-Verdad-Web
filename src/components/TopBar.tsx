import { useNavigate, useLocation } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) return null;

  return (
    <div className="topbar">
      <button className="topbar-back" onClick={() => navigate(-1)} aria-label="Volver">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    </div>
  );
}
