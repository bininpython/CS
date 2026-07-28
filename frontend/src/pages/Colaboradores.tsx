import React from 'react';

const Colaboradores: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Colaboradores</h1>
          <p className="text-sm text-muted mt-0.5">Gerenciamento e histórico de colaboradores.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm text-foreground border border-border rounded-lg px-4 py-2 hover:bg-white transition-colors font-medium">
            📄 Baixar Relatório (PDF)
          </button>
          <button className="text-sm text-white bg-purple rounded-lg px-4 py-2 hover:bg-purple/90 transition-colors font-medium">
            + Novo Colaborador
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Nome</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Matrícula</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Função</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Setor</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Equipamentos</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="text-center py-16">
                <p className="text-sm font-medium text-foreground mb-1">Nenhum colaborador cadastrado.</p>
                <p className="text-xs text-muted">Clique em "+ Novo Colaborador" para começar.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Colaboradores;
