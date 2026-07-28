import React from 'react';
import { Download, UserPlus } from 'lucide-react';

const Colaboradores: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Colaboradores</h1>
          <p className="text-sm text-muted mt-0.5">Gerenciamento e histórico de colaboradores.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm text-foreground border border-border px-4 py-2 hover:bg-white transition-colors font-medium">
            <Download size={16} /> Baixar Relatório (PDF)
          </button>
          <button className="flex items-center gap-2 text-sm text-white bg-purple px-4 py-2 hover:bg-purple/90 transition-colors font-medium">
            <UserPlus size={16} /> Novo Colaborador
          </button>
        </div>
      </div>

      <div className="bg-white border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-gray-50">
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider w-32">Status</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Nome</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Equipamento</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Nº de Folga</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-wider">Aniversário</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="text-center py-16">
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
