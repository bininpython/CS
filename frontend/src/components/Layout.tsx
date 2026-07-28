import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Factory, Calendar, Palmtree, ClipboardList, Settings, Search } from 'lucide-react';
import { useApp } from '../App';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Colaboradores', path: '/colaboradores', icon: Users },
  { label: 'Postos de Trabalho', path: '/postos-de-trabalho', icon: Factory },
  { label: 'Férias', path: '/ferias', icon: Palmtree },
  { label: 'Folgas', path: '/folgas', icon: ClipboardList },
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
      {/* Sidebar escura */}
      <aside className="w-64 bg-sidebar flex flex-col fixed top-0 left-0 bottom-0 z-30">
        {/* Logo */}
        <div className="px-6 py-6 flex items-center gap-3 border-b border-gray-800/50">
          <div className="w-10 h-10 bg-purple flex items-center justify-center">
            <span className="text-sm font-bold text-white">CS</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">Controle Supervisão</p>
            <p className="text-xs text-gray-500 mt-0.5">Gestão Industrial</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-6 py-3 text-sm transition-colors border-l-3 ${
                        isActive
                          ? 'border-l-purple bg-sidebarHover text-purple font-medium'
                          : 'border-l-transparent text-gray-400 hover:bg-sidebarHover hover:text-gray-200'
                      }`
                    }
                  >
                    <Icon size={20} className="shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom: Configurações */}
        <div className="border-t border-gray-800/50 pt-2 pb-2">
          <button className="flex items-center gap-4 px-6 py-3 text-sm text-gray-400 hover:bg-sidebarHover hover:text-gray-200 transition-colors w-full border-l-3 border-l-transparent">
            <Settings size={20} className="shrink-0" />
            <span>Configurações</span>
          </button>
        </div>

        {/* Supervisor info */}
        <div className="px-6 py-5 bg-[#07070A] border-t border-gray-800/50">
          <p className="text-sm font-medium text-white flex items-center gap-2">
            <span className="text-lg">{supervisor.emoji}</span> {supervisor.name}
          </p>
          <p className="text-xs text-purple mt-1">{supervisor.turn} · {supervisor.timeStart} – {supervisor.timeEnd}</p>
        </div>
      </aside>

      {/* Área principal */}
      <div className="flex-1 ml-64">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3 bg-background px-4 py-2 w-[400px] border border-border">
            <Search size={16} className="text-muted" />
            <input
              type="text"
              placeholder="Buscar colaboradores, postos..."
              className="bg-transparent text-sm text-foreground outline-none w-full placeholder-muted"
            />
          </div>
          <div className="flex items-center gap-5">
            <span className="text-sm text-muted">
              <strong className="font-medium text-foreground">{supervisor.name}</strong> — {supervisor.turn} ({supervisor.timeStart} – {supervisor.timeEnd})
            </span>
            <button
              onClick={handleTrocarPerfil}
              className="text-xs text-foreground border border-border px-4 py-2 hover:bg-background transition-colors font-medium"
            >
              Trocar Perfil
            </button>
          </div>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
