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
  const { supervisor, setSupervisor, setRole, colaboradores } = useApp();
  const navigate = useNavigate();
  const [globalSearch, setGlobalSearch] = React.useState('');
  const [showSearchDropdown, setShowSearchDropdown] = React.useState(false);

  // Filter for global search
  const searchResults = React.useMemo(() => {
    if (!globalSearch.trim()) return [];
    return colaboradores.filter(c => 
      c.nome.toLowerCase().includes(globalSearch.toLowerCase()) ||
      c.registro.includes(globalSearch)
    ).slice(0, 5); // Limit to 5 results
  }, [globalSearch, colaboradores]);

  const handleSelectResult = (nome: string) => {
    setGlobalSearch('');
    setShowSearchDropdown(false);
    navigate('/colaboradores', { state: { search: nome } });
  };

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
            <NavLink 
              to="/configuracoes"
              className={({ isActive }) => 
                `flex items-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-colors w-full border-b-2 border-black ${
                  isActive ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
                }`
              }
            >
              <Settings size={18} className="shrink-0" />
              <span>Configurações</span>
            </NavLink>
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
        <header className="h-16 bg-white border-b-2 border-black flex items-center justify-between px-4 sticky top-0 z-20 shrink-0 w-full gap-2">
          <div className="flex-1 max-w-[350px] relative">
            <div className="flex items-center gap-2 bg-white px-2 py-1.5 md:px-3 md:py-2 border-2 border-black focus-within:bg-gray-50 transition-colors">
              <Search size={16} className="text-black shrink-0 hidden sm:block" />
              <input
                type="text"
                placeholder="BUSCAR COLABORADOR..."
                value={globalSearch}
                onChange={(e) => {
                  setGlobalSearch(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                className="bg-transparent text-[10px] md:text-xs font-bold uppercase tracking-widest text-black outline-none w-full placeholder-gray-400"
              />
            </div>
            
            {showSearchDropdown && globalSearch.trim().length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 max-h-60 overflow-y-auto custom-scrollbar">
                {searchResults.length > 0 ? (
                  searchResults.map(colab => (
                    <div 
                      key={colab.id} 
                      onClick={() => handleSelectResult(colab.nome)}
                      className="p-3 border-b-2 border-black last:border-b-0 hover:bg-gray-100 cursor-pointer flex flex-col"
                    >
                      <span className="text-xs font-bold text-black uppercase tracking-widest">{colab.nome}</span>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{colab.equipamento} - Reg: {colab.registro}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-xs text-gray-500 font-bold uppercase tracking-widest text-center">
                    Nenhum colaborador encontrado
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] md:text-xs font-bold text-black uppercase tracking-widest truncate max-w-[100px] md:max-w-[150px]">
                {supervisor.name}
              </span>
              <span className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate">
                {supervisor.turn}
              </span>
            </div>
            <button
              onClick={handleTrocarPerfil}
              className="flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white bg-black border-2 border-black px-2 py-1.5 md:px-3 md:py-2 hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
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
