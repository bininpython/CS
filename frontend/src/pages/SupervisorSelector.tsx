import React from 'react';
import { useNavigate } from 'react-router-dom';

const SupervisorSelector: React.FC = () => {
  const navigate = useNavigate();

  const supervisors = [
    { id: 1, name: 'Petrus', turn: 'Turno Noite', code: 'TN', time: '22:00 às 06:00' },
    { id: 2, name: 'Axel', turn: 'Turno Manhã', code: 'TM', time: '06:00 às 14:00' },
    { id: 3, name: 'Sávio', turn: 'Turno Tarde', code: 'TT', time: '14:00 às 22:00' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-foreground text-center mb-2">Selecione seu Perfil</h1>
        <p className="text-textSecondary text-center mb-10">Escolha o turno que deseja administrar</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supervisors.map(sup => (
            <div 
              key={sup.id} 
              onClick={() => navigate('/dashboard')}
              className="bg-card border border-border rounded-xl p-6 cursor-pointer hover:border-primary transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 group"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-lg font-bold text-primary">{sup.code}</span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-1">{sup.name}</h2>
              <p className="text-sm font-medium text-textSecondary">{sup.turn}</p>
              <p className="text-xs text-textSecondary/60 mt-1">{sup.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupervisorSelector;
