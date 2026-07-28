import React from 'react';
import { useApp } from '../App';

const statCards = [
  { label: 'COLABORADORES', value: 0, sub: '0 ativos', icon: '👥' },
  { label: 'POSTOS DE TRABALHO', value: 0, sub: 'cadastrados', icon: '🏭' },
  { label: 'EM FÉRIAS HOJE', value: 0, sub: 'colaboradores', icon: '🏖️' },
  { label: 'FOLGAS PENDENTES', value: 0, sub: 'aguardando aprovação', icon: '📋' },
];

const Dashboard: React.FC = () => {
  const { supervisor } = useApp();

  if (!supervisor) return null;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Dashboard Operacional</h1>
          <p className="text-sm text-muted mt-0.5">Visão geral da disponibilidade e distribuição operacional das equipes.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm text-foreground border border-border rounded-lg px-4 py-2 hover:bg-white transition-colors font-medium">
            🔽 Filtros
          </button>
          <button className="text-sm text-white bg-purple rounded-lg px-4 py-2 hover:bg-purple/90 transition-colors font-medium">
            + Novo Registro
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-semibold text-muted uppercase tracking-wider">{card.label}</p>
              <span className="text-lg">{card.icon}</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{card.value}</p>
            <p className="text-xs text-muted mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Atividades Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white border border-border rounded-xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Atividades Recentes</h2>
            <button className="text-xs text-purple font-medium hover:underline">Ver todas →</button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-background/50">
                <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Colaborador</th>
                <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Posto</th>
                <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3} className="text-center py-10 text-sm text-muted">
                  Nenhuma atividade recente encontrada.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Resumo lateral */}
        <div className="bg-white border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Cobertura por Turno</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">🌙 Turno Noite (TN)</span>
              <span className="text-xs font-medium text-foreground">0 alocados</span>
            </div>
            <div className="w-full h-2 bg-background rounded-full">
              <div className="h-2 bg-purple rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">☀️ Turno Manhã (TM)</span>
              <span className="text-xs font-medium text-foreground">0 alocados</span>
            </div>
            <div className="w-full h-2 bg-background rounded-full">
              <div className="h-2 bg-purple rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">🌅 Turno Tarde (TT)</span>
              <span className="text-xs font-medium text-foreground">0 alocados</span>
            </div>
            <div className="w-full h-2 bg-background rounded-full">
              <div className="h-2 bg-purple rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
