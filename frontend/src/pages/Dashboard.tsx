import React from 'react';
import { useApp } from '../App';

const statCards = [
  { label: 'COLABORADORES', value: 0, sub: '0 ativos', color: 'text-foreground' },
  { label: 'POSTOS DE TRABALHO', value: 0, sub: 'cadastrados', color: 'text-foreground' },
  { label: 'EM FÉRIAS HOJE', value: 0, sub: 'colaboradores', color: 'text-warning' },
  { label: 'FOLGAS PENDENTES', value: 0, sub: 'aguardando aprovação', color: 'text-foreground' },
];

const Dashboard: React.FC = () => {
  const { supervisor } = useApp();

  if (!supervisor) return null;

  return (
    <div>
      <h1 className="text-lg font-semibold text-foreground mb-6">
        Painel — {supervisor.turn} ({supervisor.code})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white border border-border rounded-lg p-5"
          >
            <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-3">
              {card.label}
            </p>
            <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-xs text-muted mt-1">{card.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
