import React from 'react';
import { Users, Factory, Palmtree, ClipboardList, Filter, Plus, CalendarClock } from 'lucide-react';
import { useApp } from '../App';
import { getSequenceForDay, getSequenceColor } from './Folgas';

const Dashboard: React.FC = () => {
  const { supervisor, solicitacoesFerias, solicitacoesFolga, colaboradores } = useApp();

  if (!supervisor) return null;

  const statCards = [
    { label: 'COLABORADORES', value: 20, sub: 'ativos', icon: Users },
    { label: 'POSTOS DE TRABALHO', value: 13, sub: 'cadastrados', icon: Factory },
    { label: 'FÉRIAS PENDENTES', value: solicitacoesFerias.filter(s => s.status === 'Pendente').length, sub: 'aguardando aprovação', icon: Palmtree },
    { label: 'FOLGAS PENDENTES', value: solicitacoesFolga.filter(s => s.status === 'Pendente').length, sub: 'aguardando aprovação', icon: ClipboardList },
  ];

  // Atividades Recentes (combining both solicitacoes)
  const atividades = [
    ...solicitacoesFolga.map(s => ({ id: `folga-${s.id}`, nome: s.nome, tipo: 'Folga', data: s.data, status: s.status })),
    ...solicitacoesFerias.map(s => ({ id: `ferias-${s.id}`, nome: s.nome, tipo: `Férias (Mês ${s.mes})`, status: s.status }))
  ].slice(0, 5); // Take last 5 for now

  // Lógica Folga de Amanhã
  const amanha = new Date();
  amanha.setDate(amanha.getDate() + 1);
  const sequenciaAmanha = getSequenceForDay(amanha);
  const colorClass = getSequenceColor(sequenciaAmanha);
  const colaboradoresFolgaAmanha = colaboradores.filter(c => Number(c.numeroFolga) === sequenciaAmanha);
  
  const byEquipamento = colaboradoresFolgaAmanha.reduce((acc, colab) => {
    if (!acc[colab.equipamento]) acc[colab.equipamento] = [];
    acc[colab.equipamento].push(colab.nome);
    return acc;
  }, {} as Record<string, string[]>);

  // Lógica Aniversariantes
  const currentMonthStr = String(new Date().getMonth() + 1).padStart(2, '0');
  const aniversariantesDoMes = colaboradores.filter(c => {
    if (!c.aniversario) return false;
    const parts = c.aniversario.split('/');
    return parts.length === 2 && parts[1] === currentMonthStr;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-black uppercase tracking-widest">Dashboard Operacional</h1>
          <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Visão geral da disponibilidade das equipes</p>
        </div>
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold text-black bg-white border-2 border-black px-3 md:px-5 py-3 hover:bg-gray-100 transition-colors uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Filter size={16} /> Filtros
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold text-white bg-black border-2 border-black px-3 md:px-5 py-3 hover:bg-gray-800 transition-colors uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
                {atividades.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-12 text-gray-500 bg-white">
                      NENHUMA ATIVIDADE RECENTE ENCONTRADA.
                    </td>
                  </tr>
                ) : (
                  atividades.map((ativ, idx) => (
                    <tr key={ativ.id} className={`border-b-2 border-black hover:bg-gray-50 transition-colors ${idx === atividades.length - 1 ? 'border-b-0' : ''}`}>
                      <td className="px-6 py-4 border-r-2 border-black">{ativ.nome}</td>
                      <td className="px-6 py-4 border-r-2 border-black">{ativ.tipo} {ativ.data ? `(${ativ.data})` : ''}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-sm ${
                          ativ.status === 'Aprovado' ? 'bg-[#00FF00] text-black' :
                          ativ.status === 'Recusado' ? 'bg-red-500 text-white' :
                          'bg-yellow-300 text-black'
                        }`}>
                          {ativ.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b-2 border-black bg-gray-50">
            <h2 className="text-sm font-bold text-black uppercase tracking-widest flex items-center gap-2">
              <CalendarClock size={18} /> Folga de Amanhã
            </h2>
            <div className={`w-8 h-8 flex items-center justify-center font-extrabold text-sm border-2 ${colorClass}`}>
              {sequenciaAmanha}
            </div>
          </div>
          <div className="p-6 flex-1 bg-white overflow-y-auto max-h-[400px] custom-scrollbar">
            {Object.keys(byEquipamento).length === 0 ? (
              <div className="text-center py-10 text-gray-500 uppercase font-bold text-xs">
                Ninguém está de folga amanhã (Folga {sequenciaAmanha}).
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(byEquipamento).map(([equip, nomes]) => (
                  <div key={equip}>
                    <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-3 border-b-2 border-black pb-1 inline-block">
                      Equipamento: {equip}
                    </h3>
                    <ul className="space-y-2">
                      {nomes.map((nome, idx) => (
                        <li key={idx} className="text-xs font-bold text-gray-700 uppercase flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${colorClass.split(' ')[0]}`}></span>
                          {nome}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
          </div>
          
          {/* Aniversariantes do Mês */}
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b-2 border-black bg-gray-50">
              <h2 className="text-sm font-bold text-black uppercase tracking-widest flex items-center gap-2">
                🎂 Aniversariantes do Mês
              </h2>
            </div>
            <div className="p-6 flex-1 bg-white overflow-y-auto max-h-[300px] custom-scrollbar">
              {aniversariantesDoMes.length === 0 ? (
                <div className="text-center py-6 text-gray-500 uppercase font-bold text-xs">
                  Nenhum aniversariante neste mês.
                </div>
              ) : (
                <ul className="space-y-3">
                  {aniversariantesDoMes.map((c, idx) => (
                    <li key={idx} className="flex items-center justify-between border-b-2 border-black pb-2 last:border-0 last:pb-0">
                      <span className="text-xs font-bold text-gray-700 uppercase">{c.nome}</span>
                      <span className="text-[10px] font-bold text-black border-2 border-black px-2 py-1 bg-yellow-300">
                        {c.aniversario}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
