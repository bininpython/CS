import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SUPERVISORS, useApp } from '../App';
import { User } from 'lucide-react';

const SupervisorSelector: React.FC = () => {
  const navigate = useNavigate();
  const { setRole, setSupervisor } = useApp();

  const handleSupervisorSelect = (supId: number) => {
    const sup = SUPERVISORS.find(s => s.id === supId);
    if (sup) {
      setRole('SUPERVISOR');
      setSupervisor(sup);
      navigate('/dashboard');
    }
  };

  const handleColaboradorSelect = () => {
    setRole('COLABORADOR');
    setSupervisor(null);
    navigate('/colaborador/postos');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Topbar */}
      <header className="h-14 bg-white border-b-2 border-black flex items-center px-6">
        <div className="w-8 h-8 bg-black flex items-center justify-center mr-3">
          <span className="text-xs font-bold text-white uppercase">GS</span>
        </div>
        <span className="text-sm font-bold text-black uppercase tracking-widest">Portal de Acesso</span>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        
        <div className="w-full max-w-3xl mb-12">
          <h1 className="text-2xl font-bold text-black uppercase tracking-widest mb-2 text-center">Acesso Supervisor</h1>
          <p className="text-sm font-medium text-gray-500 mb-8 text-center uppercase tracking-wider">Escolha o perfil para gerenciar o turno</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {SUPERVISORS.map((sup) => (
              <button
                key={sup.id}
                onClick={() => handleSupervisorSelect(sup.id)}
                className="bg-white border-2 border-black p-8 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group"
              >
                <span className="text-xl font-bold text-black uppercase tracking-widest">{sup.name}</span>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">{sup.turn} ({sup.code})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="w-full max-w-3xl flex items-center gap-4 mb-12 opacity-50">
          <div className="h-0.5 flex-1 bg-black"></div>
          <span className="text-xs font-bold text-black uppercase tracking-widest">OU</span>
          <div className="h-0.5 flex-1 bg-black"></div>
        </div>

        {/* Colaborador Section */}
        <div className="w-full max-w-sm text-center">
          <h2 className="text-xl font-bold text-black uppercase tracking-widest mb-2">Área do Colaborador</h2>
          <p className="text-xs font-medium text-gray-500 mb-6 uppercase tracking-wider">Visualize sua escala e faça solicitações</p>
          
          <button
            onClick={handleColaboradorSelect}
            className="w-full bg-black text-white border-2 border-black p-4 flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <User size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Acesso Colaborador (Visualizar)</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default SupervisorSelector;
