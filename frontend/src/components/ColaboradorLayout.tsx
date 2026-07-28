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
      <header className="h-16 bg-white border-b-2 border-black flex items-center justify-between px-6 shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-black flex items-center justify-center">
            <span className="text-sm font-bold text-white uppercase">COL</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-black uppercase tracking-widest">Portal do Colaborador</h1>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Autoatendimento</p>
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
          className="flex items-center gap-2 text-xs font-bold text-black uppercase tracking-widest border-2 border-black px-4 py-2 hover:bg-gray-100 transition-colors"
        >
          <LogOut size={16} />
          Sair
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
