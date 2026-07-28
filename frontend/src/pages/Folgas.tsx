import React, { useState } from 'react';
import { Download, Plus, X } from 'lucide-react';

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const YEAR = 2026;

// Mock list of employees
const COLABORADORES = [
  { id: 1, nome: 'João Silva', equipamento: 'RB1' },
  { id: 2, nome: 'Maria Santos', equipamento: 'LE1' },
  { id: 3, nome: 'Pedro Costa', equipamento: 'RB4' },
  { id: 4, nome: 'Ana Souza', equipamento: 'RB1' },
];

interface Folga {
  id: string;
  colaboradorId: number;
  data: string; // YYYY-MM-DD
  tipo: string;
  motivo: string;
}

const Folgas: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [folgas, setFolgas] = useState<Folga[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(''); // YYYY-MM-DD

  // Form State
  const [formColaborador, setFormColaborador] = useState('');
  const [formTipo, setFormTipo] = useState('Folga Programada');
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

    const newFolga: Folga = {
      id: Date.now().toString(),
      colaboradorId: Number(formColaborador),
      data: selectedDate,
      tipo: formTipo,
      motivo: formMotivo
    };

    setFolgas([...folgas, newFolga]);
    
    // Reset form
    setFormColaborador('');
    setFormMotivo('');
    setFormTipo('Folga Programada');
    setIsModalOpen(false);
  };

  const getFolgasForDay = (day: number) => {
    const formattedDate = `${YEAR}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return folgas.filter(f => f.data === formattedDate);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Programação de Folgas</h1>
          <p className="text-sm text-muted mt-0.5">Calendário dinâmico e agendamento de folgas - {YEAR}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm text-foreground border border-border px-4 py-2 hover:bg-white transition-colors font-medium">
            <Download size={16} /> Baixar Relatório (PDF)
          </button>
          <button 
            onClick={() => {
              const today = `${YEAR}-${String(selectedMonth + 1).padStart(2, '0')}-01`;
              setSelectedDate(today);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 text-sm text-white bg-purple px-4 py-2 hover:bg-purple/90 transition-colors font-medium"
          >
            <Plus size={16} /> Nova Folga
          </button>
        </div>
      </div>

      {/* Month selector tabs */}
      <div className="bg-white border border-border mb-4 flex items-center overflow-x-auto">
        {MONTH_NAMES.map((name, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedMonth(idx)}
            className={`px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
              selectedMonth === idx
                ? 'border-b-purple text-purple bg-purpleLight/30'
                : 'border-b-transparent text-muted hover:text-foreground hover:bg-background'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="bg-white border border-border">
        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b border-border bg-gray-50">
          {WEEK_DAYS.map((day) => (
            <div key={day} className="px-2 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider border-r border-border last:border-0">
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 bg-gray-50/50">
          {/* Empty cells for offset */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[120px] border-b border-r border-border bg-gray-100/50"></div>
          ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayFolgas = getFolgasForDay(day);
            const isSunday = new Date(YEAR, selectedMonth, day).getDay() === 0;

            return (
              <div 
                key={day} 
                onClick={() => handleDayClick(day)}
                className="min-h-[120px] border-b border-r border-border bg-white p-2 hover:bg-gray-50 cursor-pointer transition-colors group relative"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-sm font-semibold ${isSunday ? 'text-red-500' : 'text-foreground'}`}>
                    {day}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 text-[10px] text-purple bg-purpleLight px-1.5 py-0.5 font-medium transition-opacity">
                    + Adicionar
                  </span>
                </div>
                
                {/* Folgas Chips */}
                <div className="flex flex-col gap-1 mt-1">
                  {dayFolgas.map(folga => {
                    const colab = COLABORADORES.find(c => c.id === folga.colaboradorId);
                    return (
                      <div key={folga.id} className="text-[10px] bg-success/15 text-success-800 border border-success/20 px-1.5 py-1 font-medium truncate flex items-center justify-between">
                        <span className="truncate">{colab?.nome.split(' ')[0]}</span>
                        <span className="text-[8px] opacity-70 ml-1">{colab?.equipamento}</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-gray-50">
              <div>
                <h3 className="text-base font-semibold text-foreground">Lançar Folga</h3>
                <p className="text-xs text-muted">Para o dia {selectedDate.split('-').reverse().join('/')}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddFolga} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Colaborador</label>
                <select 
                  value={formColaborador}
                  onChange={(e) => setFormColaborador(e.target.value)}
                  className="w-full text-sm border border-border px-3 py-2 outline-none focus:border-purple bg-white"
                  required
                >
                  <option value="">Selecione um colaborador...</option>
                  {COLABORADORES.map(c => (
                    <option key={c.id} value={c.id}>{c.nome} - {c.equipamento}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Tipo de Folga</label>
                <select 
                  value={formTipo}
                  onChange={(e) => setFormTipo(e.target.value)}
                  className="w-full text-sm border border-border px-3 py-2 outline-none focus:border-purple bg-white"
                >
                  <option value="Folga Programada">Folga Programada</option>
                  <option value="Banco de Horas">Banco de Horas</option>
                  <option value="Atestado">Atestado Médico</option>
                  <option value="Falta Justificada">Falta Justificada</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Motivo / Observação (Opcional)</label>
                <textarea 
                  value={formMotivo}
                  onChange={(e) => setFormMotivo(e.target.value)}
                  rows={2}
                  className="w-full text-sm border border-border px-3 py-2 outline-none focus:border-purple bg-white resize-none"
                  placeholder="Ex: Compensação de hora extra..."
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple hover:bg-purple/90 transition-colors"
                >
                  Salvar Folga
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
