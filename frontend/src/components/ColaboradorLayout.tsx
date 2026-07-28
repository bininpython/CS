import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Factory, Palmtree, CalendarDays } from 'lucide-react';
import { useApp } from '../App';

const ColaboradorLayout: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useApp();

  const handleLogout = () => {
    setRole(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Topbar */}
      <header className="h-16 bg-white border-b-2 border-black flex items-center justify-between px-3 md:px-6 shrink-0 sticky top-0 z-50 w-full gap-2">
        <div className="flex items-center gap-2 md:gap-4 shrink-0 min-w-0">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-black flex items-center justify-center shrink-0">
            <span className="text-xs md:text-sm font-bold text-white uppercase">COL</span>
          </div>
          <div className="min-w-0 truncate">
            <h1 className="text-xs md:text-sm font-bold text-black uppercase tracking-widest truncate">Portal do Colaborador</h1>
            <p className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate">Autoatendimento</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          <NavLink
            to="/colaborador/postos"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                isActive ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Factory size={16} />
            Postos de Trabalho
          </NavLink>
          <NavLink
            to="/colaborador/ferias"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                isActive ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Palmtree size={16} />
            Férias
          </NavLink>
          <NavLink
            to="/colaborador/folgas"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                isActive ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <CalendarDays size={16} />
            Folgas
          </NavLink>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-1 md:gap-2 text-[10px] md:text-xs font-bold text-black uppercase tracking-widest border-2 border-black px-2 py-1.5 md:px-4 md:py-2 hover:bg-gray-100 transition-colors shrink-0"
        >
          <LogOut size={16} className="shrink-0" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </header>

      {/* Mobile Nav */}
      <nav className="md:hidden flex border-b-2 border-black bg-white">
        <NavLink
          to="/colaborador/postos"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors border-r-2 border-black ${
              isActive ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <Factory size={16} />
          Postos
        </NavLink>
        <NavLink
          to="/colaborador/ferias"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors border-r-2 border-black ${
              isActive ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <Palmtree size={16} />
          Férias
        </NavLink>
        <NavLink
          to="/colaborador/folgas"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${
              isActive ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <CalendarDays size={16} />
          Folgas
        </NavLink>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ColaboradorLayout;
