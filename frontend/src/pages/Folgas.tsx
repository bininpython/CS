import React, { useState } from 'react';
import { Download, Plus, X } from 'lucide-react';

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const YEAR = 2026;

// Lista de Colaboradores baseada na aba Colaboradores
const COLABORADORES = [
  { id: '1', nome: 'LUCAS DOS SANTOS MORAIS', equipamento: 'RB4', numeroFolga: 2 },
  { id: '2', nome: 'FLEWDSON CAMPOS DOS SANTOS', equipamento: 'RB4', numeroFolga: 4 },
  { id: '3', nome: 'WILDSON JUNIO RODRIGUES DINIZ', equipamento: 'RB4', numeroFolga: 3 },
  { id: '4', nome: 'TULYO FERREIRA SILVA NESCAU', equipamento: 'RB4', numeroFolga: 1 },
  { id: '5', nome: 'JOÃO PAULO', equipamento: 'RB4', numeroFolga: 2 },
  { id: '6', nome: 'ÍTALO MIRANDA DE RAMOS', equipamento: 'RB4', numeroFolga: 1 },
  { id: '7', nome: 'ABNER LUCAS ALMEIDA PASSOS', equipamento: 'RB1', numeroFolga: 1 },
  { id: '8', nome: 'TALES JACOB DE SOUZA', equipamento: 'RB1', numeroFolga: 1 },
  { id: '9', nome: 'LETICIA DO CARMO FIALHO', equipamento: 'OUTRO', numeroFolga: 3 },
  { id: '10', nome: 'RAFAEL HENRIQUE OLIVEIRA LINHARES', equipamento: 'RB1', numeroFolga: 4 },
  { id: '11', nome: 'WILLIAM JUNIO SIMÕES', equipamento: 'LE1', numeroFolga: 2 },
  { id: '12', nome: 'ISRAEL LUCAS FREITAS NUNES', equipamento: 'RB1', numeroFolga: 4 },
  { id: '13', nome: 'DAVI FERREIRA LIMA', equipamento: 'RB1', numeroFolga: 4 },
  { id: '14', nome: 'KELLEN YARA VIEIRA', equipamento: 'RB4', numeroFolga: 3 },
  { id: '15', nome: 'RODRIGO CUNHA SOUZA', equipamento: 'LE1', numeroFolga: 1 },
  { id: '16', nome: 'FERNANDA MORAIS VIRTUOSO', equipamento: 'LE1', numeroFolga: 3 },
  { id: '17', nome: 'AMOS RAFAEL MARTINS DE ALMEIDA', equipamento: 'RB1', numeroFolga: 3 },
  { id: '18', nome: 'JACQUELINE SILVA GARCIA', equipamento: 'RB4', numeroFolga: 4 },
  { id: '19', nome: 'ALEXANDRE SILVA RODRIGUES', equipamento: 'RB1', numeroFolga: 2 },
  { id: '20', nome: 'RODRIGO OLIVEIRA MOREIRA', equipamento: 'RB1', numeroFolga: 2 },
];

interface FolgaManual {
  id: string;
  colaboradorId: string;
  data: string; // YYYY-MM-DD
  tipo: string;
  motivo: string;
}

// Retorna o dia do ano (1 a 365/366)
const getDayOfYear = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

// Lógica Inteligente de Escala 6x2 (Válida para todo 2026)
const getSequenceForDay = (date: Date): number => {
  const dayOfYear = getDayOfYear(date);
  const mod = ((dayOfYear - 4) % 8 + 8) % 8;
  if (mod === 0 || mod === 1) return 3; // Seq 3
  if (mod === 2 || mod === 3) return 4; // Seq 4
  if (mod === 4 || mod === 5) return 1; // Seq 1
  if (mod === 6 || mod === 7) return 2; // Seq 2
  return 0;
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

const Folgas: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(7); 
  const [folgasManuais, setFolgasManuais] = useState<FolgaManual[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Form State
  const [formColaborador, setFormColaborador] = useState('');
  const [formTipo, setFormTipo] = useState('Ajuste de Folga');
  const [formMotivo, setFormMotivo] = useState('');

  // Calendar logic
  const daysInMonth = new Date(YEAR, selectedMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(YEAR, selectedMonth, 1).getDay();

  const handleDayClick = (day: number) => {
    const formattedDate = `${YEAR}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(formattedDate);
    setIsModalOpen(true);
  };

  const handleAddFolga = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formColaborador) return;

    const newFolga: FolgaManual = {
      id: Date.now().toString(),
      colaboradorId: formColaborador,
      data: selectedDate,
      tipo: formTipo,
      motivo: formMotivo
    };

    setFolgasManuais([...folgasManuais, newFolga]);
    
    // Reset form
    setFormColaborador('');
    setFormMotivo('');
    setFormTipo('Ajuste de Folga');
    setIsModalOpen(false);
  };

  const getFolgasForDay = (day: number) => {
    const date = new Date(YEAR, selectedMonth, day);
    const formattedDate = `${YEAR}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // 1. Folgas Inteligentes (Automáticas da Escala 6x2)
    const folgaSequence = getSequenceForDay(date);
    const autoFolgas = COLABORADORES.filter(c => c.numeroFolga === folgaSequence).map(c => ({
      ...c,
      isAuto: true,
      tipo: `Folga Sequência ${c.numeroFolga}`
    }));

    // 2. Folgas Manuais / Ajustes
    const manuais = folgasManuais.filter(f => f.data === formattedDate).map(f => {
      const c = COLABORADORES.find(col => col.id === f.colaboradorId);
      return {
        ...c!,
        isAuto: false,
        tipo: f.tipo
      };
    });

    return [...autoFolgas, ...manuais];
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-black uppercase tracking-wide">Programação de Folgas</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Calendário dinâmico inteligente (Escala 6x2) - Ano {YEAR}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm text-black border-2 border-black bg-white px-4 py-2 hover:bg-gray-100 transition-colors font-bold uppercase tracking-wider">
            <Download size={16} /> Exportar
          </button>
          <button 
            onClick={() => {
              const today = `${YEAR}-${String(selectedMonth + 1).padStart(2, '0')}-01`;
              setSelectedDate(today);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 text-sm text-white bg-black px-4 py-2 hover:bg-gray-800 transition-colors font-bold uppercase tracking-wider"
          >
            <Plus size={16} /> Lançamento Extra
          </button>
        </div>
      </div>

      {/* Legenda das Folgas */}
      <div className="flex items-center gap-6 mb-4 flex-shrink-0 bg-white p-3 border-2 border-black">
        <span className="text-sm font-bold uppercase tracking-widest text-black mr-2">Legenda de Cores:</span>
        {[1, 2, 3, 4].map(seq => (
          <div key={seq} className="flex items-center gap-2">
            <div className={`w-4 h-4 border ${getSequenceColor(seq)}`}></div>
            <span className="text-xs font-bold uppercase text-gray-700">Folga {seq}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-4 h-4 border bg-yellow-100 border-yellow-400"></div>
          <span className="text-xs font-bold uppercase text-gray-700">Ajuste Manual / Exceção</span>
        </div>
      </div>

      {/* Month selector tabs */}
      <div className="flex items-center gap-0 mb-4 border-b-2 border-black flex-shrink-0 overflow-x-auto">
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

      {/* Calendar Grid */}
      <div className="bg-white border-2 border-black flex-1 flex flex-col overflow-hidden">
        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b-2 border-black bg-gray-50 flex-shrink-0">
          {WEEK_DAYS.map((day) => (
            <div key={day} className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-widest border-r border-black last:border-0">
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 flex-1 overflow-y-auto bg-gray-100">
          {/* Empty cells for offset */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[120px] border-b border-r border-gray-300 bg-gray-200/50 opacity-50 pointer-events-none"></div>
          ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const folgas = getFolgasForDay(day);
            const isSunday = new Date(YEAR, selectedMonth, day).getDay() === 0;
            const isToday = new Date().getDate() === day && new Date().getMonth() === selectedMonth;

            return (
              <div 
                key={day} 
                onClick={() => handleDayClick(day)}
                className={`min-h-[120px] border-b border-r border-gray-300 bg-white p-2 hover:bg-gray-50 cursor-pointer transition-colors group relative flex flex-col ${isToday ? 'bg-purple/5' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-sm font-bold flex items-center justify-center w-6 h-6 rounded-full ${
                    isSunday ? 'text-red-600' : 'text-black'
                  } ${isToday ? 'bg-black text-white' : ''}`}>
                    {day}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 text-[10px] text-white bg-black px-1.5 py-0.5 font-bold uppercase transition-opacity">
                    + Adicionar
                  </span>
                </div>
                
                {/* Folgas Chips */}
                <div className="flex flex-col gap-1 overflow-y-auto max-h-[80px] pr-1 custom-scrollbar">
                  {folgas.map((folga, idx) => {
                    const colorClass = folga.isAuto 
                      ? getSequenceColor(folga.numeroFolga)
                      : 'bg-yellow-100 text-yellow-800 border-yellow-400';

                    return (
                      <div 
                        key={idx} 
                        title={`${folga.tipo} - ${folga.nome}`}
                        className={`text-[9px] px-1.5 py-1 font-bold truncate flex items-center justify-between border ${colorClass}`}
                      >
                        <span className="truncate uppercase">{folga.nome.split(' ')[0]} {folga.nome.split(' ')[1]}</span>
                        <span className="text-[8px] opacity-80 ml-1 bg-white/50 px-1 rounded-sm">{folga.equipamento}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Lançar Folga */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-black bg-white">
              <div>
                <h3 className="text-lg font-bold text-black uppercase tracking-wider">Adicionar Exceção</h3>
                <p className="text-xs text-gray-500 font-medium">Lançamento manual para {selectedDate.split('-').reverse().join('/')}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-black hover:bg-gray-100 p-1 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddFolga} className="p-6 space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black">Colaborador</label>
                <select 
                  value={formColaborador}
                  onChange={(e) => setFormColaborador(e.target.value)}
                  className="w-full text-sm border-2 border-black px-3 py-2 outline-none focus:bg-gray-50 font-bold bg-white"
                  required
                >
                  <option value="">Selecione um colaborador...</option>
                  {COLABORADORES.map(c => (
                    <option key={c.id} value={c.id}>{c.nome} ({c.equipamento})</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black">Tipo de Lançamento</label>
                <select 
                  value={formTipo}
                  onChange={(e) => setFormTipo(e.target.value)}
                  className="w-full text-sm border-2 border-black px-3 py-2 outline-none focus:bg-gray-50 font-bold bg-white"
                >
                  <option value="Ajuste de Folga">Ajuste de Folga</option>
                  <option value="Banco de Horas">Banco de Horas</option>
                  <option value="Atestado">Atestado Médico</option>
                  <option value="Falta Justificada">Falta Justificada</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black">Motivo / Observação (Opcional)</label>
                <textarea 
                  value={formMotivo}
                  onChange={(e) => setFormMotivo(e.target.value)}
                  rows={3}
                  className="w-full text-sm border-2 border-black px-3 py-2 outline-none focus:bg-gray-50 font-medium bg-white resize-none"
                  placeholder="Ex: Troca de turno, compensação..."
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t-2 border-black mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-black border-2 border-black hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-black border-2 border-black bg-[#00FF00] hover:bg-[#00cc00] transition-colors"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Folgas;
