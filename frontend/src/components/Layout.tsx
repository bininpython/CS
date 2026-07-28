import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { label: 'Colaboradores', path: '/colaboradores', icon: '👥' },
  { label: 'Postos de Trabalho', path: '/postos-de-trabalho', icon: '🏭' },
  { label: 'Férias', path: '/ferias', icon: '🏖️' },
  { label: 'Folgas', path: '/folgas', icon: '📋' },
];

const Layout: React.FC = () => {
  const { supervisor, setSupervisor } = useApp();
  const navigate = useNavigate();

  if (!supervisor) return null;

  const handleTrocarPerfil = () => {
    setSupervisor(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <header className="h-14 bg-white border-b border-border flex items-center justify-between px-5 fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-foreground tracking-tight">CP</span>
          <span className="text-sm text-foreground">
            {supervisor.emoji} {supervisor.name} — {supervisor.turn}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted">{supervisor.timeStart} – {supervisor.timeEnd}</span>
          <button
            onClick={handleTrocarPerfil}
            className="text-xs text-foreground border border-border rounded px-3 py-1.5 hover:bg-background transition-colors"
          >
            Trocar Perfil
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed top-14 left-0 bottom-0 w-40 bg-white border-r border-border z-20 flex flex-col justify-between">
        <nav className="pt-5 px-3">
          <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-3 px-2">Navegação</p>
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-2 rounded text-sm transition-colors ${
                      isActive
                        ? 'bg-accentLight text-accent font-medium'
                        : 'text-foreground hover:bg-background'
                    }`
                  }
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Supervisor info bottom */}
        <div className="p-3 border-t border-border">
          <p className="text-sm font-medium text-foreground">{supervisor.emoji} {supervisor.name}</p>
          <p className="text-xs text-accent">{supervisor.turn} · {supervisor.timeStart} – {supervisor.timeEnd}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-40 mt-14 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
