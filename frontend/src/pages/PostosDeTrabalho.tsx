import React, { useState } from 'react';
import { Download, Save } from 'lucide-react';
import { useApp } from '../App';

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];


const EQUIPAMENTOS = [
  { 
    id: 'RB1', 
    nome: 'RECOZIMENTO FINAL I', 
    postos: ['PR25', 'ENTRADA', 'MÁQUINA DE SOLDA', 'FORNO', 'DECAPAGEM', 'SAÍDA'] 
  },
  { 
    id: 'LE1', 
    nome: 'LAMINADOR DE ENCRUAMENTO 1', 
    postos: ['ENTRADA', 'SAÍDA'] 
  },
  { 
    id: 'RB4', 
    nome: 'RECOZIMENTO FINAL IV', 
    postos: ['ENTRADA', 'MÁQUINA DE SOLDA', 'FORNO', 'LE2', 'DECAPAGEM'] 
  },
];


const PostosDeTrabalho: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(7); // Agosto default
  const { alocacoesPostos, setAlocacoesPostos } = useApp();

  const handleAlocacaoChange = (equipamentoId: string, postoNome: string, folgaId: number, value: string) => {
    setAlocacoesPostos(prev => {
      const monthData = prev[selectedMonth] || {};
      const equipData = monthData[equipamentoId] || {};
      const postoData = equipData[postoNome] || {};
      
      return {
        ...prev,
        [selectedMonth]: {
          ...monthData,
          [equipamentoId]: {
            ...equipData,
            [postoNome]: {
              ...postoData,
              [folgaId]: value
            }
          }
        }
      };
    });
  };

  const getColaboradorText = (equipamentoId: string, postoNome: string, folgaId: number) => {
    return alocacoesPostos[selectedMonth]?.[equipamentoId]?.[postoNome]?.[folgaId] || '';
  };

  const getSequenceColor = (seq: number) => {
    switch (seq) {
      case 1: return 'bg-blue-100 text-blue-800 border-blue-300';
      case 2: return 'bg-orange-100 text-orange-800 border-orange-300';
      case 3: return 'bg-pink-100 text-pink-800 border-pink-300';
      case 4: return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="flex flex-col h-full w-full min-w-0 p-2 md:p-0">
      {/* Header Brutalista */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 flex-shrink-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-black uppercase tracking-widest">Postos de Trabalho</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1 font-bold uppercase tracking-widest">Alocação de equipes por equipamento</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 w-full md:w-auto">
          <select 
            className="w-full sm:w-auto border-2 border-black bg-white px-4 py-3 text-xs font-bold uppercase tracking-widest outline-none focus:bg-gray-50 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {MONTH_NAMES.map((mes, idx) => (
              <option key={idx} value={idx}>{mes} 2026</option>
            ))}
          </select>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold text-black bg-white border-2 border-black px-3 md:px-5 py-3 hover:bg-gray-100 transition-colors uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Download size={16} /> Exportar
            </button>
            <button 
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold text-white bg-black border-2 border-black px-3 md:px-5 py-3 hover:bg-gray-800 transition-colors uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <Save size={16} /> Salvar Mês
            </button>
          </div>
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

      {/* Grid de Equipamentos */}
      <div className="grid grid-cols-1 gap-8 flex-1 overflow-y-auto pb-6">
        {EQUIPAMENTOS.map((equipamento) => {
          return (
            <div key={equipamento.id} className="bg-white border-2 border-black h-fit flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="px-5 py-4 border-b-2 border-black bg-black flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-widest">{equipamento.id}</h2>
                <span className="text-xs font-bold text-gray-300 uppercase">{equipamento.nome}</span>
              </div>
              
              <div className="w-full overflow-x-auto">
                <table className="w-full text-sm border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="text-center px-4 py-3 text-xs font-bold text-black uppercase tracking-widest w-48 border-r-2 border-black bg-gray-50">Posto</th>
                      {[1, 2, 3, 4].map(folgaId => (
                        <th key={folgaId} className={`text-center py-3 text-sm font-bold uppercase tracking-widest w-[20%] border-r-2 border-black last:border-r-0 ${getSequenceColor(folgaId)}`}>
                          {folgaId}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {equipamento.postos.map((posto, idx) => {
                      return (
                        <tr key={idx} className="border-b border-black last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="px-2 py-2 border-r-2 border-black bg-gray-50/50">
                            <span className="text-xs font-bold text-black uppercase tracking-wider">{posto}</span>
                          </td>
                          {[1, 2, 3, 4].map(folgaId => (
                            <td key={folgaId} className="p-0 border-r-2 border-black last:border-r-0 h-full">
                              <textarea
                                value={getColaboradorText(equipamento.id, posto, folgaId)}
                                onChange={(e) => handleAlocacaoChange(equipamento.id, posto, folgaId, e.target.value)}
                                className="w-full h-full min-h-[60px] p-2 text-xs font-bold uppercase tracking-wider text-center resize-none outline-none focus:bg-yellow-50 bg-transparent"
                                placeholder="..."
                              />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                    {/* Linha FOLGA */}
                    <tr className="border-t-4 border-black hover:bg-gray-50 transition-colors">
                      <td className="px-2 py-2 border-r-2 border-black bg-blue-100">
                        <span className="text-xs font-bold text-blue-900 italic uppercase tracking-wider">FOLGA</span>
                      </td>
                      {[1, 2, 3, 4].map(folgaId => (
                        <td key={folgaId} className="p-0 border-r-2 border-black last:border-r-0 h-full bg-blue-50">
                          <textarea
                            value={getColaboradorText(equipamento.id, 'FOLGA', folgaId)}
                            onChange={(e) => handleAlocacaoChange(equipamento.id, 'FOLGA', folgaId, e.target.value)}
                            className="w-full h-full min-h-[60px] p-2 text-xs font-bold uppercase tracking-wider text-center resize-none outline-none focus:bg-blue-100 bg-transparent text-blue-900"
                            placeholder="Nomes em folga"
                          />
                        </td>
                      ))}
                    </tr>
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

export default PostosDeTrabalho;
