import React from 'react';

const PostosDeTrabalho: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Postos de Trabalho</h1>
          <p className="text-sm text-muted mt-0.5">Gerenciamento dos equipamentos e postos operacionais.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm text-foreground border border-border px-4 py-2 hover:bg-white transition-colors font-medium">
            📄 Baixar Relatório (PDF)
          </button>
          <button className="text-sm text-white bg-purple px-4 py-2 hover:bg-purple/90 transition-colors font-medium">
            + Novo Posto
          </button>
        </div>
      </div>

      <div className="bg-white border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Posto</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Setor</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Descrição</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Colaboradores Alocados</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="text-center py-16">
                <p className="text-sm font-medium text-foreground mb-1">Nenhum posto cadastrado.</p>
                <p className="text-xs text-muted">Clique em "+ Novo Posto" para começar.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostosDeTrabalho;
