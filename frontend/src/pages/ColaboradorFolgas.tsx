import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../App';
import { MONTH_NAMES, WEEK_DAYS, YEAR, COLABORADORES, getSequenceForDay, getSequenceColor } from './Folgas';

const ColaboradorFolgas: React.FC = () => {
  const { solicitacoesFolga, setSolicitacoesFolga } = useApp();
  
  // Form state
  const [nome, setNome] = useState('');
  const [turno, setTurno] = useState('TN');
  const [equipamento, setEquipamento] = useState('RB1');
  const [dataDesejada, setDataDesejada] = useState('');
  const [motivo, setMotivo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Calendar State
  const [selectedMonth, setSelectedMonth] = useState(7); 
  const daysInMonth = new Date(YEAR, selectedMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(YEAR, selectedMonth, 1).getDay();

  const getFolgasForDay = (day: number) => {
    const date = new Date(YEAR, selectedMonth, day);
    let autoFolgas: any[] = [];
    if (selectedMonth >= 7) {
      const folgaSequence = getSequenceForDay(date);
      autoFolgas = COLABORADORES.filter(c => c.numeroFolga === folgaSequence).map(c => ({
        ...c,
        isAuto: true,
        tipo: `Folga Sequência ${c.numeroFolga}`
      }));
    }
    // We only show automatic 6x2 here since manual folgas are local to Supervisor
    return autoFolgas;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !dataDesejada) return;

    const novaSolicitacao = {
      id: Date.now().toString(),
      colaboradorId: 'colab-' + Date.now(), // mockup
      nome,
      turno,
      equipamento,
      data: dataDesejada,
      motivo,
      status: 'Pendente' as const
    };

    setSolicitacoesFolga([...solicitacoesFolga, novaSolicitacao]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setNome('');
    setMotivo('');
    setDataDesejada('');
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto space-y-8">
      
      {/* Formulário de Solicitação */}
      <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-xl font-bold text-black uppercase tracking-widest mb-2">Solicitar Folga Extra</h2>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Pedidos de troca ou atestados</p>
        
        {submitted ? (
          <div className="bg-green-100 border-2 border-green-500 p-6 flex flex-col items-center justify-center gap-3">
            <CheckCircle2 size={40} className="text-green-600" />
            <p className="text-lg font-bold text-green-800 uppercase tracking-widest text-center">Solicitação Enviada!</p>
            <p className="text-xs text-green-700 font-bold uppercase text-center">Aguarde a aprovação do supervisor.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black">Nome Completo</label>
                <input required type="text" value={nome} onChange={e => setNome(e.target.value)} className="border-2 border-black bg-white px-3 py-3 font-bold outline-none focus:bg-gray-50 uppercase" placeholder="Digite seu nome" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black">Data da Folga</label>
                <input required type="date" value={dataDesejada} onChange={e => setDataDesejada(e.target.value)} className="border-2 border-black bg-white px-3 py-3 font-bold outline-none focus:bg-gray-50 uppercase" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black">Equipamento</label>
                <select value={equipamento} onChange={e => setEquipamento(e.target.value)} className="border-2 border-black bg-white px-3 py-3 font-bold outline-none focus:bg-gray-50 uppercase">
                  <option value="RB1">RB1</option>
                  <option value="LE1">LE1</option>
                  <option value="RB4">RB4</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black">Turno</label>
                <select value={turno} onChange={e => setTurno(e.target.value)} className="border-2 border-black bg-white px-3 py-3 font-bold outline-none focus:bg-gray-50 uppercase">
                  <option value="TN">Turno Noite (TN)</option>
                  <option value="TM">Turno Manhã (TM)</option>
                  <option value="TT">Turno Tarde (TT)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-black">Motivo / Observação</label>
              <textarea required value={motivo} onChange={e => setMotivo(e.target.value)} rows={3} className="border-2 border-black bg-white px-3 py-3 font-bold outline-none focus:bg-gray-50 uppercase resize-none" placeholder="Ex: Banco de horas, consulta médica..." />
            </div>

            <button type="submit" className="w-full mt-2 bg-black text-white px-6 py-4 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors font-bold uppercase tracking-widest">
              <Send size={18} />
              Enviar Solicitação
            </button>
          </form>
        )}
      </div>

      {/* Calendário de Visualização */}
      <div className="bg-white border-2 border-black flex flex-col overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="px-6 py-4 border-b-2 border-black bg-black">
          <h2 className="text-xl font-bold text-white uppercase tracking-widest">Calendário de Escala 6x2</h2>
          <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mt-1">Ano de {YEAR}</p>
        </div>

        {/* Legenda das Folgas */}
        <div className="flex items-center flex-wrap gap-4 p-4 border-b-2 border-black bg-white">
          <span className="text-xs font-bold uppercase tracking-widest text-black mr-2">Legenda:</span>
          {[1, 2, 3, 4].map(seq => (
            <div key={seq} className="flex items-center gap-2">
              <div className={`w-4 h-4 border-2 ${getSequenceColor(seq)}`}></div>
              <span className="text-xs font-bold uppercase text-black">Folga {seq}</span>
            </div>
          ))}
        </div>

        {/* Month selector tabs */}
        <div className="flex items-center overflow-x-auto border-b-2 border-black bg-gray-50 hide-scrollbar">
          {MONTH_NAMES.map((name, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMonth(idx)}
              className={`px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors border-r-2 border-black flex-shrink-0 ${
                selectedMonth === idx
                  ? 'bg-black text-white'
                  : 'bg-transparent text-black hover:bg-gray-200'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b-2 border-black bg-gray-100 flex-shrink-0">
          {WEEK_DAYS.map((day) => (
            <div key={day} className="px-1 py-2 text-center text-[10px] sm:text-xs font-bold text-black uppercase tracking-widest border-r-2 border-black last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 overflow-y-auto bg-gray-50 max-h-[600px]">
          {/* Empty cells for offset */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[100px] border-b-2 border-r-2 border-black bg-gray-200 opacity-50 pointer-events-none"></div>
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
                className={`min-h-[100px] border-b-2 border-r-2 border-black p-1 sm:p-2 hover:bg-yellow-50 transition-colors flex flex-col ${isToday ? 'bg-purple/10' : 'bg-white'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold flex items-center justify-center w-5 h-5 rounded-none border-2 border-black ${
                    isSunday ? 'bg-red-100 text-red-600' : 'bg-white text-black'
                  } ${isToday ? '!bg-black !text-white' : ''}`}>
                    {day}
                  </span>
                </div>
                
                {/* Folgas Chips */}
                <div className="flex flex-col gap-1 overflow-y-auto max-h-[70px] hide-scrollbar">
                  {folgas.map((folga, idx) => {
                    const colorClass = getSequenceColor(folga.numeroFolga);
                    return (
                      <div 
                        key={idx} 
                        title={`${folga.tipo} - ${folga.nome}`}
                        className={`text-[8px] sm:text-[9px] px-1 py-0.5 font-bold truncate flex items-center justify-between border-2 ${colorClass}`}
                      >
                        <span className="truncate uppercase">{folga.nome.split(' ')[0]} {folga.nome.split(' ')[1]}</span>
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
  );
};

export default ColaboradorFolgas;
