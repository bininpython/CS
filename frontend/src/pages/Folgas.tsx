import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Search, Filter, Download, Plus, X, Clock } from 'lucide-react';
import { useApp } from '../App';
import { supabase } from '../lib/supabase';
import { exportToPDF } from '../lib/pdfExport';

export const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
export const YEAR = 2026;

// Lista de Colaboradores será consumida do contexto (Supabase)

interface FolgaManual {
  id: string;
  colaboradorId: string;
  data: string; // YYYY-MM-DD
  tipo: string;
  motivo: string;
}

// Retorna o dia do ano (1 a 365/366)
export const getDayOfYear = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

// Lógica Inteligente de Escala 6x2 (Válida para todo 2026)
export const getSequenceForDay = (date: Date): number => {
  const dayOfYear = getDayOfYear(date);
  const mod = ((dayOfYear - 4) % 8 + 8) % 8;
  if (mod === 0 || mod === 1) return 3; // Seq 3
  if (mod === 2 || mod === 3) return 4; // Seq 4
  if (mod === 4 || mod === 5) return 1; // Seq 1
  if (mod === 6 || mod === 7) return 2; // Seq 2
  return 0;
};

export const getSequenceColor = (seq: number) => {
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

  const { solicitacoesFolga, setSolicitacoesFolga, colaboradores } = useApp();

  const handleAprovarFolga = async (idSolicitacao: string) => {
    const { error } = await supabase.from('solicitacoes_folga')
      .update({ status: 'Aprovado' })
      .eq('id', idSolicitacao);

    if (!error) {
      setSolicitacoesFolga(prev => prev.map(s => s.id === idSolicitacao ? { ...s, status: 'Aprovado' } : s));
      
      const sol = solicitacoesFolga.find(s => s.id === idSolicitacao);
      if (sol) {
        const colab = colaboradores.find(c => c.nome.toUpperCase() === sol.nome.toUpperCase());
        const cId = colab ? colab.id : ('mock-' + sol.id);
        const newFolga: FolgaManual = {
          id: sol.id,
          colaboradorId: cId,
          data: sol.data,
          tipo: 'Folga Solicitada (Aprovado)',
          motivo: sol.motivo
        };
        setFolgasManuais(prev => [...prev, newFolga]);
      }
    }
  };

  const handleRecusarFolga = async (idSolicitacao: string) => {
    const { error } = await supabase.from('solicitacoes_folga')
      .update({ status: 'Recusado' })
      .eq('id', idSolicitacao);

    if (!error) {
      setSolicitacoesFolga(prev => prev.map(s => s.id === idSolicitacao ? { ...s, status: 'Recusado' } : s));
    }
  };

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

  const handleAddFolga = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formColaborador) return;

    const colab = colaboradores.find(c => c.id === formColaborador);
    if (!colab) return;

    const { error, data } = await supabase.from('solicitacoes_folga').insert({
      colaborador_id: formColaborador,
      nome: colab.nome,
      turno: 'Manual',
      equipamento: colab.equipamento,
      data: selectedDate,
      status: 'Aprovado',
      motivo: formMotivo || formTipo
    }).select();

    if (!error && data) {
      const newFolga: FolgaManual = {
        id: data[0].id,
        colaboradorId: formColaborador,
        data: selectedDate,
        tipo: formTipo,
        motivo: formMotivo
      };
      setFolgasManuais([...folgasManuais, newFolga]);
      setSolicitacoesFolga([...solicitacoesFolga, data[0]]);
      setIsModalOpen(false);
      setFormColaborador('');
      setFormMotivo('');
    }
  };

  const getFolgasForDay = (day: number) => {
    const date = new Date(YEAR, selectedMonth, day);
    const formattedDate = `${YEAR}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    let autoFolgas: any[] = [];
    if (selectedMonth >= 7) {
      const folgaSequence = getSequenceForDay(date);
      autoFolgas = colaboradores.filter(c => Number(c.numeroFolga) === folgaSequence).map(c => ({
        ...c,
        isAuto: true,
        tipo: `Folga Sequência ${c.numeroFolga}`
      }));
    }

    const manuais = folgasManuais.filter(f => f.data === formattedDate).map(f => {
      const c = colaboradores.find(col => col.id === f.colaboradorId);
      return {
        ...c!,
        isAuto: false,
        tipo: f.tipo
      };
    });

    return [...autoFolgas, ...manuais];
  };

  const handleExportPDF = () => {
    const columns = ['Data', 'Colaborador', 'Equipamento', 'Turno', 'Status', 'Motivo'];
    const data = solicitacoesFolga.map(s => [
      s.data.split('-').reverse().join('/'), 
      s.nome, 
      s.equipamento, 
      s.turno, 
      s.status, 
      s.motivo || '-'
    ]);
    exportToPDF({
      title: 'Relatório de Solicitações de Folga',
      filename: 'relatorio_folgas',
      columns,
      data
    });
  };

  return (
    <div className="flex flex-col h-full w-full min-w-0">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-6 gap-4 flex-shrink-0">
        <div className="w-full xl:w-auto">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black uppercase tracking-wide leading-tight break-words">Programação de Folgas</h1>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-1 font-medium">Calendário dinâmico inteligente (Escala 6x2) - Ano {YEAR}</p>
        </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button 
              onClick={handleExportPDF}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold text-black bg-white border-2 border-black px-3 md:px-5 py-3 hover:bg-gray-100 transition-colors uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
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

      {solicitacoesFolga.filter(s => s.status === 'Pendente').length > 0 && (
        <div className="mb-6 bg-orange-50 border-2 border-orange-500 p-4 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] flex-shrink-0">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="text-orange-600" />
            <h2 className="text-sm font-bold text-orange-800 uppercase tracking-widest">Solicitações Pendentes ({solicitacoesFolga.filter(s => s.status === 'Pendente').length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {solicitacoesFolga.filter(s => s.status === 'Pendente').map(sol => (
              <div key={sol.id} className="bg-white border-2 border-orange-300 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-black uppercase">{sol.nome}</h3>
                  <p className="text-xs text-gray-600 font-bold uppercase mt-1">{sol.equipamento} | {sol.turno}</p>
                  <p className="text-sm text-black font-bold uppercase mt-3 bg-orange-100 p-2 inline-block">Data: {sol.data.split('-').reverse().join('/')}</p>
                  <p className="text-[10px] text-gray-500 mt-2 line-clamp-2 uppercase">Motivo: {sol.motivo}</p>
                </div>
                <div className="flex gap-2 mt-4 justify-end">
                  <button 
                    onClick={() => handleAprovarFolga(sol.id)}
                    className="p-1.5 text-black hover:bg-[#00FF00] hover:text-black transition-colors rounded-sm border-2 border-transparent hover:border-black"
                    title="Aprovar"
                  >
                    <CheckCircle2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleRecusarFolga(sol.id)}
                    className="p-1.5 text-black hover:bg-red-500 hover:text-white transition-colors rounded-sm border-2 border-transparent hover:border-black"
                    title="Recusar"
                  >
                    <XCircle size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legenda das Folgas */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 flex-shrink-0 bg-white p-3 border-2 border-black w-full text-xs">
        <span className="font-bold uppercase tracking-widest text-black w-full sm:w-auto mb-2 sm:mb-0 block">Legenda de Cores:</span>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {[1, 2, 3, 4].map(seq => (
            <div key={seq} className="flex items-center gap-1 sm:gap-2">
              <div className={`w-3 h-3 sm:w-4 sm:h-4 border ${getSequenceColor(seq)}`}></div>
              <span className="text-[10px] sm:text-xs font-bold uppercase text-gray-700 whitespace-nowrap">Folga {seq}</span>
            </div>
          ))}
          <div className="flex items-center gap-1 sm:gap-2 border-l-0 sm:border-l-2 border-gray-200 pl-0 sm:pl-4">
            <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 bg-yellow-400 border-yellow-600"></div>
            <span className="text-[10px] sm:text-xs font-bold uppercase text-gray-700 whitespace-nowrap">Ajuste Manual / Exceção</span>
          </div>
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
        <div className="overflow-x-auto overflow-y-auto flex-1 custom-scrollbar">
          <div className="min-w-[700px] h-full flex flex-col">
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
                      : 'bg-yellow-400 text-black border-yellow-600 border-2 font-extrabold';

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
        </div>
      </div>

      {/* Modal Lançar Folga */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-black bg-white shrink-0">
              <div>
                <h3 className="text-lg font-bold text-black uppercase tracking-wider">Folgas do Dia</h3>
                <p className="text-xs text-gray-500 font-medium">{selectedDate.split('-').reverse().join('/')}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-black hover:bg-gray-100 p-1 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6 space-y-6">
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold text-black uppercase tracking-wider">Equipe de Folga</h4>
                {selectedDate ? (() => {
                  const day = Number(selectedDate.split('-')[2]);
                  const folgasDoDia = getFolgasForDay(day);
                  if (folgasDoDia.length === 0) {
                    return <p className="text-sm text-gray-500 italic">Ninguém de folga neste dia.</p>;
                  }
                  return (
                    <div className="flex flex-col gap-2">
                      {folgasDoDia.map((folga, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 border border-gray-200 bg-gray-50">
                          <div>
                            <p className="text-xs font-bold text-black uppercase">{folga.nome}</p>
                            <p className="text-[10px] text-gray-500 uppercase font-bold">{folga.tipo}</p>
                          </div>
                          <span className="text-[10px] font-bold bg-white border border-gray-300 px-2 py-1">{folga.equipamento}</span>
                        </div>
                      ))}
                    </div>
                  );
                })() : null}
              </div>

              <div className="border-t-2 border-black pt-6">
                <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-4">Adicionar Exceção</h4>
                <form onSubmit={handleAddFolga} className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-black">Colaborador</label>
                    <select 
                      value={formColaborador}
                      onChange={(e) => setFormColaborador(e.target.value)}
                      className="w-full text-sm border-2 border-black px-3 py-2 outline-none focus:bg-gray-50 font-bold bg-white"
                      required
                    >
                      <option value="">Selecione um colaborador...</option>
                      {colaboradores.map(c => (
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Folgas;
