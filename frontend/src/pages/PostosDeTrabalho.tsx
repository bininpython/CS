import React, { useState } from 'react';
import { Download, Save } from 'lucide-react';
import { useApp } from '../App';

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const COLABORADORES = [
  { id: '1', nome: 'LUCAS DOS SANTOS MORAIS', equipamento: 'RB4' },
  { id: '2', nome: 'FLEWDSON CAMPOS DOS SANTOS', equipamento: 'RB4' },
  { id: '3', nome: 'WILDSON JUNIO RODRIGUES DINIZ', equipamento: 'RB4' },
  { id: '4', nome: 'TULYO FERREIRA SILVA NESCAU', equipamento: 'RB4' },
  { id: '5', nome: 'JOÃO PAULO', equipamento: 'RB4' },
  { id: '6', nome: 'ÍTALO MIRANDA DE RAMOS', equipamento: 'RB4' },
  { id: '7', nome: 'ABNER LUCAS ALMEIDA PASSOS', equipamento: 'RB1' },
  { id: '8', nome: 'TALES JACOB DE SOUZA', equipamento: 'RB1' },
  { id: '9', nome: 'LETICIA DO CARMO FIALHO', equipamento: 'OUTRO' },
  { id: '10', nome: 'RAFAEL HENRIQUE OLIVEIRA LINHARES', equipamento: 'RB1' },
  { id: '11', nome: 'WILLIAM JUNIO SIMÕES', equipamento: 'LE1' },
  { id: '12', nome: 'ISRAEL LUCAS FREITAS NUNES', equipamento: 'RB1' },
  { id: '13', nome: 'DAVI FERREIRA LIMA', equipamento: 'RB1' },
  { id: '14', nome: 'KELLEN YARA VIEIRA', equipamento: 'RB4' },
  { id: '15', nome: 'RODRIGO CUNHA SOUZA', equipamento: 'LE1' },
  { id: '16', nome: 'FERNANDA MORAIS VIRTUOSO', equipamento: 'LE1' },
  { id: '17', nome: 'AMOS RAFAEL MARTINS DE ALMEIDA', equipamento: 'RB1' },
  { id: '18', nome: 'JACQUELINE SILVA GARCIA', equipamento: 'RB4' },
  { id: '19', nome: 'ALEXANDRE SILVA RODRIGUES', equipamento: 'RB1' },
  { id: '20', nome: 'RODRIGO OLIVEIRA MOREIRA', equipamento: 'RB1' },
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

interface AlocacaoState {
  [mes: number]: {
    [equipamentoId: string]: {
      [postoNome: string]: string; // colaboradorId
    }
  }
}

const PostosDeTrabalho: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(7); // Agosto default
  const { alocacoesPostos, setAlocacoesPostos } = useApp();

  const handleAlocacaoChange = (equipamentoId: string, postoNome: string, colaboradorId: string) => {
    setAlocacoesPostos(prev => {
      const monthData = prev[selectedMonth] || {};
      const equipData = monthData[equipamentoId] || {};
      
      return {
        ...prev,
        [selectedMonth]: {
          ...monthData,
          [equipamentoId]: {
            ...equipData,
            [postoNome]: colaboradorId
          }
        }
      };
    });
  };

  const getColaboradorId = (equipamentoId: string, postoNome: string) => {
    return alocacoesPostos[selectedMonth]?.[equipamentoId]?.[postoNome] || '';
  };

  // Função para retornar os colaboradores ordenados (pessoas do próprio equipamento primeiro)
  const getOpcoesColaboradores = (equipamentoId: string) => {
    const equipePropria = COLABORADORES.filter(c => c.equipamento === equipamentoId);
    const outros = COLABORADORES.filter(c => c.equipamento !== equipamentoId);
    
    return { equipePropria, outros };
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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 overflow-y-auto pb-6">
        {EQUIPAMENTOS.map((equipamento) => {
          const { equipePropria, outros } = getOpcoesColaboradores(equipamento.id);
          
          return (
            <div key={equipamento.id} className="bg-white border-2 border-black h-fit flex flex-col">
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
                      const selectedId = getColaboradorId(equipamento.id, posto);
                      const isAssigned = selectedId !== '';
                      
                      return (
                        <tr key={idx} className={`border-b border-black last:border-0 hover:bg-gray-50 transition-colors group ${isAssigned ? 'bg-blue-50/30' : ''}`}>
                          <td className="px-4 py-4 border-r-2 border-black">
                            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">{posto}</span>
                          </td>
                          <td className="px-4 py-3">
                            <select 
                              value={selectedId}
                              onChange={(e) => handleAlocacaoChange(equipamento.id, posto, e.target.value)}
                              className={`w-full text-xs font-bold uppercase tracking-wider px-3 py-2 border-2 outline-none transition-colors appearance-none cursor-pointer ${
                                isAssigned 
                                  ? 'border-blue-500 bg-blue-50 text-blue-900 focus:border-blue-700' 
                                  : 'border-black bg-white focus:bg-gray-50'
                              }`}
                            >
                              <option value="">-- SELECIONE --</option>
                              
                              <optgroup label={`Equipe ${equipamento.id}`}>
                                {equipePropria.map(c => (
                                  <option key={c.id} value={c.id}>{c.nome}</option>
                                ))}
                              </optgroup>
                              
                              <optgroup label="Outros Equipamentos">
                                {outros.map(c => (
                                  <option key={c.id} value={c.id}>{c.nome} ({c.equipamento})</option>
                                ))}
                              </optgroup>
                            </select>
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

export default PostosDeTrabalho;
