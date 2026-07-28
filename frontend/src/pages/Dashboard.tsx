import React from 'react';
import { Users, Factory, Palmtree, ClipboardList, Moon, Sun, Sunrise, Filter, Plus } from 'lucide-react';
import { useApp } from '../App';

const Dashboard: React.FC = () => {
  const { supervisor, solicitacoesFerias, solicitacoesFolga } = useApp();

  if (!supervisor) return null;

  const statCards = [
    { label: 'COLABORADORES', value: 20, sub: 'ativos', icon: Users },
    { label: 'POSTOS DE TRABALHO', value: 13, sub: 'cadastrados', icon: Factory },
    { label: 'FÉRIAS PENDENTES', value: solicitacoesFerias.filter(s => s.status === 'Pendente').length, sub: 'aguardando aprovação', icon: Palmtree },
    { label: 'FOLGAS PENDENTES', value: solicitacoesFolga.filter(s => s.status === 'Pendente').length, sub: 'aguardando aprovação', icon: ClipboardList },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black uppercase tracking-widest">Dashboard Operacional</h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Visão geral da disponibilidade das equipes</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-xs font-bold text-black bg-white border-2 border-black px-5 py-3 hover:bg-gray-100 transition-colors uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Filter size={16} /> Filtros
          </button>
          <button className="flex items-center gap-2 text-xs font-bold text-white bg-black border-2 border-black px-5 py-3 hover:bg-gray-800 transition-colors uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Plus size={16} /> Novo Registro
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{card.label}</p>
                <Icon size={24} className="text-black" />
              </div>
              <div>
                <p className="text-4xl font-bold text-black">{card.value}</p>
                <p className="text-xs font-bold text-black uppercase tracking-widest mt-2">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b-2 border-black bg-gray-50">
            <h2 className="text-sm font-bold text-black uppercase tracking-widest">Atividades Recentes</h2>
            <button className="text-xs font-bold text-black uppercase tracking-widest hover:underline">Ver todas →</button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-xs font-bold text-black uppercase tracking-widest">
              <thead className="border-b-2 border-black bg-white">
                <tr>
                  <th className="text-left px-6 py-4 border-r-2 border-black">Colaborador</th>
                  <th className="text-left px-6 py-4 border-r-2 border-black">Posto</th>
                  <th className="text-left px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={3} className="text-center py-12 text-gray-500 bg-white">
                    NENHUMA ATIVIDADE RECENTE ENCONTRADA.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-8 border-b-2 border-black pb-4">Cobertura por Turno</h2>
          <div className="space-y-8">
            {[
              { icon: Moon, label: 'Turno Noite (TN)', pct: 30 },
              { icon: Sun, label: 'Turno Manhã (TM)', pct: 45 },
              { icon: Sunrise, label: 'Turno Tarde (TT)', pct: 25 },
            ].map((t) => {
              const TurnoIcon = t.icon;
              return (
                <div key={t.label}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-black uppercase tracking-widest flex items-center gap-2">
                      <TurnoIcon size={16} className="text-black" /> {t.label}
                    </span>
                    <span className="text-xs font-bold text-black uppercase tracking-widest">{t.pct}%</span>
                  </div>
                  <div className="w-full h-4 bg-gray-100 border-2 border-black">
                    <div className="h-full bg-black" style={{ width: `${t.pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
