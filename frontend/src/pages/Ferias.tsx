import React from 'react';
import { Download, CheckCircle, XCircle } from 'lucide-react';

const PESOS_MESES = [
  { mes: 'JANEIRO', peso: 1 },
  { mes: 'FEVEREIRO', peso: 2 },
  { mes: 'MARÇO', peso: 3 },
  { mes: 'ABRIL', peso: 6 },
  { mes: 'MAIO', peso: 8 },
  { mes: 'JUNHO', peso: 8 },
  { mes: 'JULHO', peso: 1 },
  { mes: 'AGOSTO', peso: 10 },
  { mes: 'SETEMBRO', peso: 10 },
  { mes: 'OUTUBRO', peso: 10 },
  { mes: 'NOVEMBRO', peso: 10 },
  { mes: 'DEZEMBRO', peso: 3 },
];

const EQUIPAMENTOS = [
  { 
    id: 'RB1', 
    nome: 'RECOZIMENTO FINAL I', 
    solicitacoes: [
      { id: 1, colaborador: 'Ana Souza', inicio: '10/01/2026', fim: '25/01/2026', dias: 15, peso: 1, status: 'Pendente' }
    ] 
  },
  { 
    id: 'LE1', 
    nome: 'LAMINADOR DE ENCRUAMENTO 1', 
    solicitacoes: [] 
  },
  { 
    id: 'RB4', 
    nome: 'RECOZIMENTO FINAL IV', 
    solicitacoes: [
      { id: 2, colaborador: 'Pedro Costa', inicio: '05/08/2026', fim: '04/09/2026', dias: 30, peso: 10, status: 'Aprovado' }
    ] 
  },
];

const Ferias: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Solicitações de Férias</h1>
          <p className="text-sm text-muted mt-0.5">Avaliação e acompanhamento de férias por equipamento.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm text-foreground border border-border px-4 py-2 hover:bg-white transition-colors font-medium">
            <Download size={16} /> Baixar Relatório (PDF)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabela de Pesos (Sidebar) */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-border">
            <div className="px-4 py-3 border-b border-border bg-gray-50">
              <h2 className="text-sm font-bold text-foreground">Tabela de Pesos</h2>
              <p className="text-[10px] text-muted">Peso do mês para férias</p>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-2 font-semibold text-muted uppercase tracking-wider border-r border-border w-2/3">Mês</th>
                  <th className="text-center px-4 py-2 font-semibold text-muted uppercase tracking-wider w-1/3">Peso</th>
                </tr>
              </thead>
              <tbody>
                {PESOS_MESES.map((item) => (
                  <tr key={item.mes} className="border-b border-border last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-foreground border-r border-border">{item.mes}</td>
                    <td className={`px-4 py-2 text-center font-bold ${item.peso >= 8 ? 'text-red-600' : item.peso >= 3 ? 'text-warning' : 'text-success'}`}>
                      {item.peso}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabelas de Equipamentos */}
        <div className="lg:col-span-3 space-y-6">
          {EQUIPAMENTOS.map((equipamento) => (
            <div key={equipamento.id} className="bg-white border border-border">
              <div className="px-5 py-3 border-b border-border bg-gray-50 flex items-center justify-between">
                <h2 className="text-sm font-bold text-foreground">{equipamento.id} - {equipamento.nome}</h2>
                <span className="text-xs text-muted">
                  {equipamento.solicitacoes.length} {equipamento.solicitacoes.length === 1 ? 'solicitação' : 'solicitações'}
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Colaborador</th>
                      <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Período</th>
                      <th className="text-center px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Dias</th>
                      <th className="text-center px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Peso</th>
                      <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Status</th>
                      <th className="text-right px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipamento.solicitacoes.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8">
                          <p className="text-sm text-muted">Nenhuma solicitação pendente para este equipamento.</p>
                        </td>
                      </tr>
                    ) : (
                      equipamento.solicitacoes.map((sol) => (
                        <tr key={sol.id} className="border-b border-border last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3 text-sm text-foreground font-medium whitespace-nowrap">
                            {sol.colaborador}
                          </td>
                          <td className="px-5 py-3 text-xs text-muted whitespace-nowrap">
                            {sol.inicio} a {sol.fim}
                          </td>
                          <td className="px-5 py-3 text-sm text-center">
                            {sol.dias}
                          </td>
                          <td className="px-5 py-3 text-sm text-center font-bold">
                            <span className={sol.peso >= 8 ? 'text-red-600' : sol.peso >= 3 ? 'text-warning' : 'text-success'}>
                              {sol.peso}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <span className={`px-2 py-1 text-[10px] font-medium uppercase ${
                              sol.status === 'Aprovado' 
                                ? 'bg-success/10 text-success' 
                                : sol.status === 'Recusado'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-warning/10 text-warning'
                            }`}>
                              {sol.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right">
                            {sol.status === 'Pendente' && (
                              <div className="flex items-center justify-end gap-2">
                                <button className="text-success hover:bg-success/10 p-1.5 rounded transition-colors" title="Aprovar">
                                  <CheckCircle size={18} />
                                </button>
                                <button className="text-red-600 hover:bg-red-50 p-1.5 rounded transition-colors" title="Recusar">
                                  <XCircle size={18} />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ferias;
