import React, { useState } from 'react';
import { Save, Settings2, User, Calendar } from 'lucide-react';
import { useApp } from '../App';

const Configuracoes: React.FC = () => {
  const { supervisor, setSupervisor } = useApp();
  const [nome, setNome] = useState(supervisor?.name || '');
  const [turno, setTurno] = useState(supervisor?.turn || '');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (supervisor) {
      setSupervisor({
        ...supervisor,
        name: nome,
        turn: turno
      });
      alert('Perfil atualizado para a sessão atual.');
    }
  };

  const handleSaveSystem = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Configurações do sistema salvas!');
  };

  return (
    <div className="flex flex-col h-full w-full min-w-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 flex-shrink-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-black uppercase tracking-wide">Configurações</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">Ajustes do Sistema e Perfil</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-y-auto custom-scrollbar pr-2">
        
        {/* Painel Perfil */}
        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
            <User size={24} className="text-black" />
            <h2 className="text-lg font-bold text-black uppercase tracking-widest">Perfil do Supervisor</h2>
          </div>
          
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-widest mb-2">Nome de Exibição</label>
              <input 
                type="text" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full border-2 border-black p-3 text-sm font-bold uppercase tracking-widest focus:bg-gray-50 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-widest mb-2">Turno / Horário</label>
              <input 
                type="text" 
                value={turno}
                onChange={(e) => setTurno(e.target.value)}
                className="w-full border-2 border-black p-3 text-sm font-bold uppercase tracking-widest focus:bg-gray-50 outline-none"
                required
              />
            </div>
            <button 
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 text-xs font-bold text-white bg-black px-6 py-4 hover:bg-gray-800 transition-colors uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <Save size={18} /> Salvar Perfil
            </button>
          </form>
        </div>

        {/* Painel Sistema */}
        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
            <Settings2 size={24} className="text-black" />
            <h2 className="text-lg font-bold text-black uppercase tracking-widest">Ajustes do Sistema</h2>
          </div>
          
          <form onSubmit={handleSaveSystem} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-widest mb-2 flex items-center gap-2">
                <Calendar size={14} /> Ano Base Operacional
              </label>
              <select 
                className="w-full border-2 border-black p-3 text-sm font-bold uppercase tracking-widest focus:bg-gray-50 outline-none"
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option selected value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
              <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase">Define o ano base para a escala de folgas automáticas.</p>
            </div>
            
            <button 
              type="submit"
              className="mt-auto flex items-center justify-center gap-2 text-xs font-bold text-black bg-white border-2 border-black px-6 py-4 hover:bg-gray-100 transition-colors uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <Save size={18} /> Aplicar Ajustes
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Configuracoes;
