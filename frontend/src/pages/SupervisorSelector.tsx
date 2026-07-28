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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Topbar */}
      <header className="h-14 bg-white border-b border-border flex items-center px-6">
        <div className="w-8 h-8 rounded-lg bg-purple flex items-center justify-center mr-3">
          <span className="text-xs font-bold text-white">CS</span>
        </div>
        <span className="text-sm font-semibold text-foreground">Controle Supervisão</span>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Selecione o Supervisor</h1>
        <p className="text-sm text-muted mb-10">Escolha o perfil do turno para acessar o painel de controle.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full">
          {SUPERVISORS.map((sup) => (
            <button
              key={sup.id}
              onClick={() => handleSelect(sup.id)}
              className="bg-white border border-border rounded-xl p-8 flex flex-col items-center gap-3 hover:border-purple hover:shadow-lg hover:shadow-purple/5 transition-all group"
            >
              <span className="text-4xl">{sup.emoji}</span>
              <span className="text-lg font-semibold text-foreground">{sup.name}</span>
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
