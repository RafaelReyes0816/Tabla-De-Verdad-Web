import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';

export default function Layout() {
  return (
    <div className="app-layout">
      <TopBar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
