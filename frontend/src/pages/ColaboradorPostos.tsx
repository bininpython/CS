import React, { useState } from 'react';
import { useApp } from '../App';
import { COLABORADORES_DB } from '../App';

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const EQUIPAMENTOS = [
  { id: 'RB1', nome: 'RECOZIMENTO FINAL I', postos: ['PR25', 'ENTRADA', 'MÁQUINA DE SOLDA', 'FORNO', 'DECAPAGEM', 'SAÍDA'] },
  { id: 'LE1', nome: 'LAMINADOR DE ENCRUAMENTO 1', postos: ['ENTRADA', 'SAÍDA'] },
  { id: 'RB4', nome: 'RECOZIMENTO FINAL IV', postos: ['ENTRADA', 'MÁQUINA DE SOLDA', 'FORNO', 'LE2', 'DECAPAGEM'] },
];

const ColaboradorPostos: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(7); // Agosto default
  const { alocacoesPostos } = useApp();

  const getColaboradorNome = (equipamentoId: string, postoNome: string) => {
    const id = alocacoesPostos[selectedMonth]?.[equipamentoId]?.[postoNome];
    if (!id) return null;
    const emp = COLABORADORES_DB.find(c => c.id === id);
    return emp ? emp.nome : null;
  };

  return (
    <div className="flex flex-col h-full max-w-[100vw] overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-black uppercase tracking-wide">Postos de Trabalho</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Escala oficial publicada pelo supervisor</p>
        </div>
      </div>

      {/* Month selector tabs */}
      <div className="flex items-center gap-0 mb-6 border-b-2 border-black flex-shrink-0 overflow-x-auto">
        {MONTH_NAMES.map((name, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedMonth(idx)}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors border-x border-t border-transparent ${
              selectedMonth === idx
                ? 'bg-black text-white border-black'
                : 'bg-white text-black hover:bg-gray-100 hover:border-gray-200'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Tabelas de Equipamentos */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pb-10">
        {EQUIPAMENTOS.map((equipamento) => {
          return (
            <div key={equipamento.id} className="bg-white border-2 border-black h-fit flex flex-col shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="px-5 py-4 border-b-2 border-black bg-black flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-widest">{equipamento.id}</h2>
                <span className="text-xs font-bold text-gray-300 uppercase">{equipamento.nome}</span>
              </div>
              
              <div className="w-full">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b-2 border-black">
                      <th className="text-left px-4 py-3 text-[10px] font-bold text-black uppercase tracking-widest w-1/3 border-r-2 border-black">Posto</th>
                      <th className="text-left px-4 py-3 text-[10px] font-bold text-black uppercase tracking-widest w-2/3">Colaborador Alocado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipamento.postos.map((posto, idx) => {
                      const nomeAlocado = getColaboradorNome(equipamento.id, posto);
                      const isAssigned = !!nomeAlocado;
                      
                      return (
                        <tr key={idx} className={`border-b border-black last:border-0 transition-colors group ${isAssigned ? 'bg-blue-50' : 'bg-white'}`}>
                          <td className="px-4 py-4 border-r-2 border-black">
                            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">{posto}</span>
                          </td>
                          <td className="px-4 py-4">
                            {isAssigned ? (
                              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">{nomeAlocado}</span>
                            ) : (
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Aguardando Escala</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColaboradorPostos;
