import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Factory, Calendar, Palmtree, ClipboardList, Settings, Search, LogOut } from 'lucide-react';
import { useApp } from '../App';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Colaboradores', path: '/colaboradores', icon: Users },
  { label: 'Postos de Trabalho', path: '/postos-de-trabalho', icon: Factory },
  { label: 'Férias', path: '/ferias', icon: Palmtree },
  { label: 'Folgas', path: '/folgas', icon: ClipboardList },
];

const Layout: React.FC = () => {
  const { supervisor, setSupervisor, setRole } = useApp();
  const navigate = useNavigate();

  if (!supervisor) return null;

  const handleTrocarPerfil = () => {
    setSupervisor(null);
    setRole(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 font-sans pb-16 md:pb-0">
      {/* Sidebar Brutalista (Desktop) */}
      <aside className="hidden md:flex w-64 bg-white flex-col fixed top-0 left-0 bottom-0 z-30 border-r-2 border-black">
        {/* Logo */}
        <div className="px-6 py-6 flex flex-col gap-2 border-b-2 border-black bg-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white flex items-center justify-center">
              <span className="text-sm font-bold text-black uppercase tracking-widest">CS</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-widest leading-tight">Controle</p>
              <p className="text-sm font-bold text-white uppercase tracking-widest leading-tight">Supervisão</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-2 border-t border-gray-800 pt-2">Gestão Industrial</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-0">
          <ul className="flex flex-col">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path} className="border-b-2 border-black last:border-b-0">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-6 py-4 text-xs uppercase tracking-widest font-bold transition-colors ${
                        isActive
                          ? 'bg-black text-white'
                          : 'bg-white text-black hover:bg-gray-100'
                      }`
                    }
                  >
                    <Icon size={18} className="shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Supervisor info & Configurações */}
        <div className="mt-auto flex flex-col">
          <div className="border-t-2 border-black">
            <button className="flex items-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest text-black bg-white hover:bg-gray-100 transition-colors w-full border-b-2 border-black">
              <Settings size={18} className="shrink-0" />
              <span>Configurações</span>
            </button>
          </div>
          <div className="px-6 py-5 bg-white">
            <p className="text-sm font-bold text-black uppercase tracking-widest truncate">
              SUPERVISOR {supervisor.name}
            </p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
              {supervisor.turn} ({supervisor.timeStart} – {supervisor.timeEnd})
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black z-50 flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full text-[10px] uppercase font-bold tracking-widest border-r-2 border-black last:border-0 ${
                  isActive ? 'bg-black text-white' : 'text-black hover:bg-gray-100'
                }`
              }
            >
              <Icon size={18} className="mb-1" />
              <span className="sr-only">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Área principal */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0 w-full overflow-hidden">
        {/* Topbar Brutalista */}
        <header className="h-16 bg-white border-b-2 border-black flex items-center justify-between px-4 md:px-8 sticky top-0 z-20 shrink-0 w-full">
          <div className="flex-1 max-w-[200px] md:max-w-[400px] flex items-center gap-2 bg-white px-3 py-2 border-2 border-black focus-within:bg-gray-50 transition-colors">
            <Search size={16} className="text-black shrink-0" />
            <input
              type="text"
              placeholder="BUSCAR..."
              className="bg-transparent text-xs font-bold uppercase tracking-widest text-black outline-none w-full placeholder-gray-400"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-bold text-black uppercase tracking-widest truncate max-w-[150px]">
                {supervisor.name}
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate">
                {supervisor.turn}
              </span>
            </div>
            <button
              onClick={handleTrocarPerfil}
              className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white bg-black border-2 border-black px-3 py-2 hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
            >
              <LogOut size={16} className="shrink-0" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
