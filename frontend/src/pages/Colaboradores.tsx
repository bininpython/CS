import React from 'react';

const Colaboradores: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-foreground">Colaboradores</h1>
          <span className="text-[10px] font-bold bg-accentLight text-accent px-2 py-0.5 rounded uppercase">
            0 ativos
          </span>
        </div>
        <button className="bg-accent text-white text-sm font-medium px-4 py-2 rounded hover:bg-accent/90 transition-colors">
          Novo Colaborador
        </button>
      </div>

      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 text-xs font-medium text-muted">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted">Nome</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted">Matrícula</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted">Função</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted">Setor</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="text-center py-12 text-sm text-muted">
                Nenhum colaborador cadastrado.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Colaboradores;
