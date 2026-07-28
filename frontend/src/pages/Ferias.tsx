import React from 'react';

const Ferias: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Férias</h1>
          <p className="text-sm text-muted mt-0.5">Gerenciamento de solicitações e períodos de férias.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm text-foreground border border-border px-4 py-2 hover:bg-white transition-colors font-medium">
            📄 Baixar Relatório (PDF)
          </button>
          <button className="text-sm text-white bg-purple px-4 py-2 hover:bg-purple/90 transition-colors font-medium">
            + Nova Solicitação
          </button>
        </div>
      </div>

      <div className="bg-white border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Colaborador</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Início</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Fim</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Dias</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Impacto</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="text-center py-16">
                <p className="text-sm font-medium text-foreground mb-1">Nenhuma solicitação de férias registrada.</p>
                <p className="text-xs text-muted">Clique em "+ Nova Solicitação" para começar.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ferias;
