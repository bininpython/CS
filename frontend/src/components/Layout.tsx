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
    <div className="min-h-screen flex">
      {/* ─── Sidebar escura ─── */}
      <aside className="w-56 bg-sidebar flex flex-col fixed top-0 left-0 bottom-0 z-30">
        {/* Logo */}
        <div className="px-5 py-5 flex items-center gap-3">
          <div className="w-9 h-9 bg-purple flex items-center justify-center">
            <span className="text-sm font-bold text-white">CS</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">Controle Supervisão</p>
            <p className="text-[10px] text-gray-500">Gestão Industrial</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-2">
          <ul className="space-y-0">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-5 py-3 text-sm transition-colors border-l-3 ${
                      isActive
                        ? 'border-l-purple bg-sidebarHover text-purple font-medium'
                        : 'border-l-transparent text-gray-400 hover:bg-sidebarHover hover:text-white'
                    }`
                  }
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom: Configurações */}
        <div className="border-t border-gray-800">
          <button className="flex items-center gap-3 px-5 py-3 text-sm text-gray-400 hover:bg-sidebarHover hover:text-white transition-colors w-full border-l-3 border-l-transparent">
            <span className="text-base">⚙️</span>
            <span>Configurações</span>
          </button>
        </div>

        {/* Supervisor info */}
        <div className="px-5 py-4 border-t border-gray-800">
          <p className="text-sm font-medium text-white">{supervisor.emoji} {supervisor.name}</p>
          <p className="text-[11px] text-purple">{supervisor.turn} · {supervisor.timeStart} – {supervisor.timeEnd}</p>
        </div>
      </aside>

      {/* ─── Área principal ─── */}
      <div className="flex-1 ml-56">
        {/* Topbar branca */}
        <header className="h-14 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-2 bg-background px-3 py-2 w-96 border border-border">
            <span className="text-muted text-sm">🔍</span>
            <input
              type="text"
              placeholder="Buscar colaboradores, postos, escalas..."
              className="bg-transparent text-sm text-foreground outline-none w-full placeholder-muted"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted">
              {supervisor.name} — {supervisor.turn} · {supervisor.timeStart} – {supervisor.timeEnd}
            </span>
            <button
              onClick={handleTrocarPerfil}
              className="text-xs text-foreground border border-border px-3 py-1.5 hover:bg-background transition-colors font-medium"
            >
              Trocar Perfil
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
