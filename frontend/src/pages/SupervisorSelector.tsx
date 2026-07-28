import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SUPERVISORS, useApp } from '../App';

const SupervisorSelector: React.FC = () => {
  const navigate = useNavigate();
  const { setSupervisor } = useApp();

  const handleSelect = (supId: number) => {
    const sup = SUPERVISORS.find(s => s.id === supId);
    if (sup) {
      setSupervisor(sup);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <header className="h-14 bg-white border-b border-border flex items-center px-5">
        <span className="text-sm font-bold text-foreground tracking-tight mr-3">CP</span>
        <span className="text-sm text-foreground">Controle Supervisão</span>
      </header>

      {/* Selector Content */}
      <div className="flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <h1 className="text-xl font-semibold text-foreground mb-2">Selecione o Supervisor</h1>
        <p className="text-sm text-muted mb-10">Escolha o perfil do turno para acessar o painel de controle.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl w-full px-6">
          {SUPERVISORS.map((sup) => (
            <button
              key={sup.id}
              onClick={() => handleSelect(sup.id)}
              className="bg-white border border-border rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer hover:border-accent hover:shadow-md transition-all group"
            >
              <span className="text-4xl">{sup.emoji}</span>
              <span className="text-base font-semibold text-foreground">{sup.name}</span>
              <span className="text-xs text-muted">{sup.turn} ({sup.code})</span>
              <span className="text-xs text-muted">{sup.timeStart} – {sup.timeEnd}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupervisorSelector;
