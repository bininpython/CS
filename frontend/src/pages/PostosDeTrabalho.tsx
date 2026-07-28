import React from 'react';
import { Download } from 'lucide-react';

const EQUIPAMENTOS = [
  { id: 'RB1', nome: 'RECOZIMENTO FINAL I', equipe: [] },
  { id: 'LE1', nome: 'LAMINADOR DE ENCRUAMENTO 1', equipe: [] },
  { id: 'RB4', nome: 'RECOZIMENTO FINAL IV', equipe: [] },
];

const PostosDeTrabalho: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Postos de Trabalho</h1>
          <p className="text-sm text-muted mt-0.5">Visão geral dos colaboradores alocados por equipamento.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm text-foreground border border-border px-4 py-2 hover:bg-white transition-colors font-medium">
            <Download size={16} /> Baixar Relatório (PDF)
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {EQUIPAMENTOS.map((equipamento) => (
          <div key={equipamento.id} className="bg-white border border-border">
            <div className="px-5 py-3 border-b border-border bg-gray-50 flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">{equipamento.id} - {equipamento.nome}</h2>
              <span className="text-xs text-muted">{equipamento.equipe.length} colaboradores</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider w-32">Status</th>
                    <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Colaborador</th>
                  </tr>
                </thead>
                <tbody>
                  {equipamento.equipe.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="text-center py-6">
                        <p className="text-sm text-muted">Nenhum colaborador alocado neste equipamento.</p>
                      </td>
                    </tr>
                  ) : (
                    equipamento.equipe.map((colaborador: any, idx) => (
                      <tr key={idx} className="border-b border-border last:border-0">
                        <td className="px-5 py-3 text-sm">
                          <span className={`px-2 py-1 text-[10px] font-medium uppercase ${
                            colaborador.status === 'Ativo' 
                              ? 'bg-success/10 text-success' 
                              : 'bg-warning/10 text-warning'
                          }`}>
                            {colaborador.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-sm text-foreground font-medium">
                          {colaborador.nome}
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
  );
};

export default PostosDeTrabalho;
