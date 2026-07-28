import React, { useMemo, useState } from 'react';
import { Download, Edit2, Plus, X, Save } from 'lucide-react';

interface HistoricoAno {
  mes: string;
  pontos: number;
}

interface OpcaoFerias {
  mes: string;
  color: 'orange' | 'blue' | 'yellow' | 'pink' | 'white';
}

interface Empregado {
  id: string;
  r3: string;
  nome: string;
  periodoAquisitivo: string;
  hist2024: HistoricoAno;
  hist2025: HistoricoAno;
  hist2026: HistoricoAno;
  opcoes: [OpcaoFerias, OpcaoFerias, OpcaoFerias];
  dataFerias: string;
  observacao: string;
  equipe: 'RB1' | 'LE1' | 'RB4';
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const INITIAL_DATA: Empregado[] = [
  // RB4 (Dados RB3)
  { id: generateId(), r3: '1009384', nome: 'LUCAS DOS SANTOS MORAIS', periodoAquisitivo: '17/11/2026', hist2024: { mes: 'JUL', pontos: 1 }, hist2025: { mes: 'MAI', pontos: 8 }, hist2026: { mes: 'MAI', pontos: 8 }, opcoes: [{ mes: 'MAI', color: 'white' }, { mes: 'JUL', color: 'white' }, { mes: 'OUT', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { id: generateId(), r3: '1004162', nome: 'FLEWDSON CAMPOS DOS SANTOS', periodoAquisitivo: '14/03/2026', hist2024: { mes: 'FEV', pontos: 2 }, hist2025: { mes: 'FEV', pontos: 2 }, hist2026: { mes: 'FEV', pontos: 2 }, opcoes: [{ mes: 'FEV', color: 'white' }, { mes: '', color: 'white' }, { mes: '', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { id: generateId(), r3: '1007155', nome: 'WILDSON JUNIOR RODRIGUES DINIZ', periodoAquisitivo: '10/06/2026', hist2024: { mes: 'AGO', pontos: 10 }, hist2025: { mes: 'AGO', pontos: 10 }, hist2026: { mes: 'OUT', pontos: 10 }, opcoes: [{ mes: 'AGO', color: 'white' }, { mes: 'OUT', color: 'white' }, { mes: 'SET', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { id: generateId(), r3: '1009716', nome: 'TULYO FERREIRA SILVA NESCAU', periodoAquisitivo: '09/02/2027', hist2024: { mes: 'ABR', pontos: 6 }, hist2025: { mes: 'MAR', pontos: 3 }, hist2026: { mes: 'MAR', pontos: 3 }, opcoes: [{ mes: 'JUL', color: 'white' }, { mes: 'MAR', color: 'white' }, { mes: 'ABR', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { id: generateId(), r3: '1011174', nome: 'JOÃO PAULO ALVES', periodoAquisitivo: '04/02/2027', hist2024: { mes: 'DEZ', pontos: 3 }, hist2025: { mes: 'AGO', pontos: 10 }, hist2026: { mes: '', pontos: 0 }, opcoes: [{ mes: 'OUT', color: 'white' }, { mes: 'NOV', color: 'white' }, { mes: 'SET', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { id: generateId(), r3: '1012203', nome: 'KELLEN YARA VIEIRA', periodoAquisitivo: '04/11/2026', hist2024: { mes: '-', pontos: 0 }, hist2025: { mes: '-', pontos: 0 }, hist2026: { mes: '-', pontos: 0 }, opcoes: [{ mes: 'ABR', color: 'white' }, { mes: 'MAR', color: 'white' }, { mes: 'MAI', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { id: generateId(), r3: '1008511', nome: 'ÍTALO MIRANDA DE RAMOS', periodoAquisitivo: '07/05/2026', hist2024: { mes: 'DEZ', pontos: 3 }, hist2025: { mes: 'JUL', pontos: 1 }, hist2026: { mes: 'DEZ', pontos: 3 }, opcoes: [{ mes: 'MAR', color: 'white' }, { mes: 'MAI', color: 'white' }, { mes: 'SET', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { id: generateId(), r3: '1011066', nome: 'JACQUELINE SILVA GARCIA', periodoAquisitivo: '20/11/2026', hist2024: { mes: '-', pontos: 0 }, hist2025: { mes: 'FEV', pontos: 2 }, hist2026: { mes: 'JUN', pontos: 8 }, opcoes: [{ mes: 'JUN', color: 'white' }, { mes: 'AGO', color: 'white' }, { mes: 'SET', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },

  // RB1
  { id: generateId(), r3: '1009599', nome: 'RODRIGO OLIVEIRA MOREIRA', periodoAquisitivo: '15/11/2026', hist2024: { mes: 'MAR', pontos: 3 }, hist2025: { mes: 'MAR', pontos: 3 }, hist2026: { mes: 'MAR', pontos: 3 }, opcoes: [{ mes: 'ABR', color: 'white' }, { mes: 'MAI', color: 'white' }, { mes: 'JUN', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { id: generateId(), r3: '1009593', nome: 'TALES JACOB DE SOUZA', periodoAquisitivo: '06/04/2027', hist2024: { mes: 'OUT', pontos: 10 }, hist2025: { mes: 'OUT', pontos: 10 }, hist2026: { mes: 'OUT', pontos: 10 }, opcoes: [{ mes: 'OUT', color: 'white' }, { mes: 'NOV', color: 'white' }, { mes: 'DEZ', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { id: generateId(), r3: '1011006', nome: 'ABNER LUCAS ALMEIDA PASSOS', periodoAquisitivo: '20/09/2026', hist2024: { mes: 'JAN', pontos: 1 }, hist2025: { mes: 'DEZ', pontos: 3 }, hist2026: { mes: 'DEZ', pontos: 3 }, opcoes: [{ mes: 'DEZ', color: 'white' }, { mes: 'SET', color: 'white' }, { mes: 'NOV', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { id: generateId(), r3: '1010341', nome: 'AUGUSTO ROMONAO MARQUES', periodoAquisitivo: '19/05/2027', hist2024: { mes: 'JUN', pontos: 8 }, hist2025: { mes: 'DEZ', pontos: 3 }, hist2026: { mes: 'JUN', pontos: 8 }, opcoes: [{ mes: '', color: 'white' }, { mes: '', color: 'white' }, { mes: '', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { id: generateId(), r3: '1006816', nome: 'RAFAEL HENRIQUE LINHARES', periodoAquisitivo: '24/03/2027', hist2024: { mes: 'ABR', pontos: 6 }, hist2025: { mes: 'JUL', pontos: 1 }, hist2026: { mes: 'ABR', pontos: 6 }, opcoes: [{ mes: 'JUL', color: 'white' }, { mes: 'SET', color: 'white' }, { mes: 'AGO', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { id: generateId(), r3: '1010125', nome: 'ALEXANDRE SILVA RODRIGUES', periodoAquisitivo: '02/01/2027', hist2024: { mes: 'FEV', pontos: 2 }, hist2025: { mes: 'FEV', pontos: 2 }, hist2026: { mes: 'FEV', pontos: 2 }, opcoes: [{ mes: 'FEV', color: 'white' }, { mes: 'MAR', color: 'white' }, { mes: 'ABR', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { id: generateId(), r3: '1009594', nome: 'ISRAEL LUCAS FREITAS NUNES', periodoAquisitivo: '15/11/2026', hist2024: { mes: 'AGO', pontos: 10 }, hist2025: { mes: 'AGO', pontos: 10 }, hist2026: { mes: 'AGO', pontos: 10 }, opcoes: [{ mes: 'AGO', color: 'white' }, { mes: 'SET', color: 'white' }, { mes: 'OUT', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { id: generateId(), r3: '1008540', nome: 'AMOS RAFAEL MARTINS DE ALMEIDA', periodoAquisitivo: '20/06/2026', hist2024: { mes: 'DEZ', pontos: 3 }, hist2025: { mes: 'AGO', pontos: 10 }, hist2026: { mes: '-', pontos: 0 }, opcoes: [{ mes: 'JAN', color: 'white' }, { mes: 'FEV', color: 'white' }, { mes: 'MAR', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { id: generateId(), r3: '1010784', nome: 'DAVI FERREIRA LIMA', periodoAquisitivo: '07/05/2026', hist2024: { mes: 'SET', pontos: 10 }, hist2025: { mes: 'NOV', pontos: 10 }, hist2026: { mes: 'NOV', pontos: 10 }, opcoes: [{ mes: 'OUT', color: 'white' }, { mes: 'NOV', color: 'white' }, { mes: 'DEZ', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },

  // LE1
  { id: generateId(), r3: '1003864', nome: 'RODRIGO CUNHA SOUZA', periodoAquisitivo: '16/02/2025', hist2024: { mes: 'MAR', pontos: 3 }, hist2025: { mes: 'DEZ', pontos: 3 }, hist2026: { mes: 'MAR', pontos: 3 }, opcoes: [{ mes: 'MAR', color: 'white' }, { mes: 'ABR', color: 'white' }, { mes: 'MAI', color: 'white' }], dataFerias: '', observacao: '', equipe: 'LE1' },
  { id: generateId(), r3: '1011468', nome: 'FERNANDA MORAIS VIRTUOSO', periodoAquisitivo: '01/09/2026', hist2024: { mes: '-', pontos: 0 }, hist2025: { mes: 'DEZ', pontos: 3 }, hist2026: { mes: '-', pontos: 0 }, opcoes: [{ mes: 'DEZ', color: 'white' }, { mes: 'JAN', color: 'white' }, { mes: 'FEV', color: 'white' }], dataFerias: '', observacao: '', equipe: 'LE1' },
  { id: generateId(), r3: '1004368', nome: 'WILLIAM JUNIO SIMÕES', periodoAquisitivo: '01/01/2027', hist2024: { mes: 'JUL', pontos: 2 }, hist2025: { mes: 'SET', pontos: 10 }, hist2026: { mes: 'MAI', pontos: 8 }, opcoes: [{ mes: '', color: 'white' }, { mes: '', color: 'white' }, { mes: '', color: 'white' }], dataFerias: '', observacao: '', equipe: 'LE1' },
];

const EMPTY_EMPREGADO = (equipe: 'RB1'|'LE1'|'RB4'): Empregado => ({
  id: '',
  r3: '',
  nome: '',
  periodoAquisitivo: '',
  hist2024: { mes: '', pontos: 0 },
  hist2025: { mes: '', pontos: 0 },
  hist2026: { mes: '', pontos: 0 },
  opcoes: [{ mes: '', color: 'white' }, { mes: '', color: 'white' }, { mes: '', color: 'white' }],
  dataFerias: '',
  observacao: '',
  equipe,
});

const MESES = ['', 'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

const Ferias: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'RB1' | 'LE1' | 'RB4'>('RB1');
  const [dados, setDados] = useState<Empregado[]>(INITIAL_DATA);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Empregado | null>(null);

  const colaboradoresCalculados = useMemo(() => {
    let tabData = dados.filter(emp => emp.equipe === activeTab).map(emp => {
      const total = emp.hist2024.pontos + emp.hist2025.pontos + emp.hist2026.pontos;
      return { ...emp, total };
    });

    const sortedByTotal = [...tabData].sort((a, b) => b.total - a.total);
    
    return tabData.map(emp => {
      const prioridade = sortedByTotal.findIndex(s => s.total === emp.total && s.id === emp.id) + 1;
      return { ...emp, prioridade };
    });
  }, [activeTab, dados]);

  const getPointsBadge = (pontos: number) => {
    if (pontos === 0) return <span className="text-muted">-</span>;
    if (pontos >= 1 && pontos <= 2) return <span className="inline-block px-1.5 py-0.5 bg-green-100 text-green-700 font-bold rounded-sm text-[10px]">{pontos}</span>;
    if (pontos >= 3 && pontos <= 7) return <span className="inline-block px-1.5 py-0.5 bg-yellow-100 text-yellow-700 font-bold rounded-sm text-[10px]">{pontos}</span>;
    if (pontos >= 8 && pontos <= 10) return <span className="inline-block px-1.5 py-0.5 bg-red-100 text-red-700 font-bold rounded-sm text-[10px]">{pontos}</span>;
    return <span>{pontos}</span>;
  };

  const getOptionBadge = (mes: string, color: string) => {
    if (!mes) return <span className="text-muted">-</span>;
    
    let colorClasses = "bg-gray-100 text-muted"; // default/white
    switch (color) {
      case 'orange': colorClasses = 'bg-[#FF9900] text-white'; break;
      case 'blue': colorClasses = 'bg-[#3b82f6] text-white'; break;
      case 'yellow': colorClasses = 'bg-[#ffea00] text-black'; break;
      case 'pink': colorClasses = 'bg-[#ffcdd2] text-black'; break;
    }
    
    return (
      <span className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase rounded-sm tracking-wide ${colorClasses}`}>
        {mes}
      </span>
    );
  };

  const handleEdit = (emp: Empregado) => {
    setFormData({ ...emp });
    setModalOpen(true);
  };

  const handleNew = () => {
    setFormData(EMPTY_EMPREGADO(activeTab));
    setModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    if (formData.id) {
      setDados(prev => prev.map(emp => emp.id === formData.id ? formData : emp));
    } else {
      setDados(prev => [...prev, { ...formData, id: generateId() }]);
    }
    setModalOpen(false);
  };

  const handleFormChange = (path: string, value: any) => {
    if (!formData) return;
    setFormData(prev => {
      const copy = { ...prev! };
      const parts = path.split('.');
      if (parts.length === 1) {
        (copy as any)[path] = value;
      } else if (parts.length === 2) {
        (copy as any)[parts[0]][parts[1]] = value;
      } else if (parts[0] === 'opcoes') {
        const idx = parseInt(parts[1]);
        const prop = parts[2];
        copy.opcoes[idx] = { ...copy.opcoes[idx], [prop]: value };
      }
      return copy;
    });
  };

  return (
    <div className="flex flex-col h-full max-w-[100vw] overflow-x-hidden relative">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Histórico de Férias</h1>
          <p className="text-sm text-muted mt-0.5">Acompanhamento e priorização de solicitações</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleNew}
            className="flex items-center gap-2 text-sm text-white bg-purple px-4 py-2 hover:bg-purpleHover transition-colors font-medium rounded-sm"
          >
            <Plus size={16} /> Adicionar Colaborador
          </button>
          <button className="flex items-center gap-2 text-sm text-foreground border border-border px-4 py-2 hover:bg-gray-50 transition-colors font-medium rounded-sm bg-white">
            <Download size={16} /> Exportar
          </button>
        </div>
      </div>

      {/* Abas de Equipamentos */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto flex-shrink-0">
        {['RB1', 'LE1', 'RB4'].map((equip) => (
          <button
            key={equip}
            onClick={() => setActiveTab(equip as any)}
            className={`px-6 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border ${
              activeTab === equip
                ? 'bg-purple/10 border-purple text-purple'
                : 'bg-white border-border text-muted hover:text-foreground hover:bg-gray-50'
            }`}
          >
            EQUIPE {equip}
          </button>
        ))}
      </div>

      <div className="bg-white border border-border w-full flex-1 overflow-hidden flex flex-col shadow-sm">
        <div className="overflow-x-auto w-full max-w-full">
          <table className="text-[10px] sm:text-[11px] border-collapse min-w-[1250px] w-full text-left">
            <thead>
              {/* ROW 1: Group Headers */}
              <tr className="bg-gray-50 border-b border-border">
                <th colSpan={3} className="px-4 py-2.5 font-bold uppercase tracking-wider text-muted border-r border-border">Informações Básicas</th>
                <th colSpan={6} className="px-4 py-2.5 font-bold uppercase tracking-wider text-muted border-r border-border text-center">Banco de Dados - Histórico</th>
                <th colSpan={2} className="px-4 py-2.5 font-bold uppercase tracking-wider text-muted border-r border-border text-center">Ranqueamento</th>
                <th colSpan={3} className="px-4 py-2.5 font-bold uppercase tracking-wider text-muted border-r border-border text-center">Opções para Próximas Férias</th>
                <th colSpan={3} className="px-4 py-2.5 font-bold uppercase tracking-wider text-muted text-center">Complementar</th>
              </tr>

              {/* ROW 2: Column Headers */}
              <tr className="bg-white border-b border-border text-muted uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold text-center border-r border-gray-100">R3</th>
                <th className="px-4 py-3 font-semibold border-r border-gray-100">Empregado</th>
                <th className="px-4 py-3 font-semibold text-center border-r border-border">Aquisitivo</th>
                
                {/* 2024 */}
                <th className="px-3 py-3 font-semibold text-center bg-gray-50/50">Mês 24</th>
                <th className="px-3 py-3 font-semibold text-center bg-gray-50/50 border-r border-gray-100">Pts</th>
                
                {/* 2025 */}
                <th className="px-3 py-3 font-semibold text-center">Mês 25</th>
                <th className="px-3 py-3 font-semibold text-center border-r border-gray-100">Pts</th>

                {/* 2026 */}
                <th className="px-3 py-3 font-semibold text-center bg-gray-50/50">Mês 26</th>
                <th className="px-3 py-3 font-semibold text-center bg-gray-50/50 border-r border-border">Pts</th>

                {/* Totais */}
                <th className="px-3 py-3 font-semibold text-center border-r border-gray-100">Total</th>
                <th className="px-3 py-3 font-semibold text-center border-r border-border">Prio</th>

                {/* Opcoes */}
                <th className="px-3 py-3 font-semibold text-center">1ª Opção</th>
                <th className="px-3 py-3 font-semibold text-center border-x border-gray-100">2ª Opção</th>
                <th className="px-3 py-3 font-semibold text-center border-r border-border">3ª Opção</th>

                {/* Complementar */}
                <th className="px-4 py-3 font-semibold text-center border-r border-gray-100">Data Fechada</th>
                <th className="px-4 py-3 font-semibold border-r border-gray-100">Observação</th>
                <th className="px-3 py-3 font-semibold text-center w-12">Ações</th>
              </tr>
            </thead>
            
            <tbody>
              {colaboradoresCalculados.length === 0 ? (
                <tr>
                  <td colSpan={17} className="text-center py-10 text-muted font-medium bg-white">
                    Nenhum colaborador registrado na {activeTab}.
                  </td>
                </tr>
              ) : (
                colaboradoresCalculados.map((emp) => (
                  <tr key={emp.id} className="border-b border-border hover:bg-gray-50/80 transition-colors group">
                    <td className="px-4 py-3 text-center text-muted font-medium border-r border-gray-100">{emp.r3}</td>
                    <td className="px-4 py-3 text-foreground font-semibold whitespace-nowrap border-r border-gray-100">{emp.nome}</td>
                    <td className="px-4 py-3 text-center border-r border-border">
                      {emp.periodoAquisitivo ? (
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 font-bold text-[10px] rounded-sm">
                          {emp.periodoAquisitivo}
                        </span>
                      ) : '-'}
                    </td>
                    
                    {/* 2024 */}
                    <td className="px-3 py-3 text-center uppercase text-muted font-medium bg-gray-50/30">{emp.hist2024.mes || '-'}</td>
                    <td className="px-3 py-3 text-center border-r border-gray-100 bg-gray-50/30">{getPointsBadge(emp.hist2024.pontos)}</td>
                    
                    {/* 2025 */}
                    <td className="px-3 py-3 text-center uppercase text-muted font-medium">{emp.hist2025.mes || '-'}</td>
                    <td className="px-3 py-3 text-center border-r border-gray-100">{getPointsBadge(emp.hist2025.pontos)}</td>

                    {/* 2026 */}
                    <td className="px-3 py-3 text-center uppercase text-muted font-medium bg-gray-50/30">{emp.hist2026.mes || '-'}</td>
                    <td className="px-3 py-3 text-center border-r border-border bg-gray-50/30">{getPointsBadge(emp.hist2026.pontos)}</td>

                    {/* Totais */}
                    <td className="px-3 py-3 text-center font-bold text-foreground border-r border-gray-100">{emp.total}</td>
                    <td className="px-3 py-3 text-center border-r border-border">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-purple/10 text-purple font-bold rounded-sm text-xs">
                        {emp.prioridade}º
                      </span>
                    </td>

                    {/* Opcoes */}
                    {emp.opcoes.map((opt, idx) => (
                      <td key={idx} className={`px-3 py-3 text-center ${idx === 1 ? 'border-x border-gray-100' : ''} ${idx === 2 ? 'border-r border-border' : ''}`}>
                        {getOptionBadge(opt.mes, opt.color)}
                      </td>
                    ))}

                    {/* Finais */}
                    <td className="px-4 py-3 text-center text-muted font-medium border-r border-gray-100">{emp.dataFerias || '-'}</td>
                    <td className="px-4 py-3 text-xs text-muted max-w-[200px] truncate border-r border-gray-100" title={emp.observacao}>
                      {emp.observacao || '-'}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button 
                        onClick={() => handleEdit(emp)}
                        className="p-1.5 text-muted hover:text-purple hover:bg-purple/10 rounded transition-colors flex items-center justify-center mx-auto opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Editar"
                      >
                        <Edit2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE EDIÇÃO / CRIAÇÃO */}
      {modalOpen && formData && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl">
            {/* Header */}
            <div className="border-b border-border p-5 flex justify-between items-center sticky top-0 z-10 bg-white">
              <h2 className="text-lg font-semibold text-foreground">
                {formData.id ? 'Editar Colaborador' : 'Novo Colaborador'} <span className="text-muted text-sm font-normal ml-2">/ EQUIPE {activeTab}</span>
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-1 text-muted hover:text-foreground hover:bg-gray-100 rounded transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSaveModal} className="p-6 flex flex-col gap-8">
              {/* Seção: Identificação */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">R3 (Matrícula)</label>
                  <input required type="text" value={formData.r3} onChange={e => handleFormChange('r3', e.target.value)} className="border border-border bg-white px-3 py-2 text-sm outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-shadow" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">Nome Completo</label>
                  <input required type="text" value={formData.nome} onChange={e => handleFormChange('nome', e.target.value)} className="border border-border bg-white px-3 py-2 text-sm outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-shadow uppercase" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">Período Aquisitivo</label>
                  <input type="text" value={formData.periodoAquisitivo} onChange={e => handleFormChange('periodoAquisitivo', e.target.value)} className="border border-border bg-white px-3 py-2 text-sm outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-shadow" placeholder="Ex: 15/11/2026" />
                </div>
              </div>

              <div className="h-px bg-border w-full"></div>

              {/* Seção: Histórico */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Histórico de Férias</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 2024 */}
                  <div className="border border-border rounded-sm p-4 bg-gray-50/50">
                    <h4 className="font-semibold text-center mb-4 text-xs text-muted uppercase tracking-wider">Ano 2024</h4>
                    <div className="flex gap-4">
                      <div className="flex-1 flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase font-semibold text-muted">Mês</label>
                        <select value={formData.hist2024.mes} onChange={e => handleFormChange('hist2024.mes', e.target.value)} className="border border-border p-2 outline-none text-sm bg-white focus:border-purple">
                          {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                      <div className="w-20 flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase font-semibold text-muted">Pontos</label>
                        <input type="number" min="0" value={formData.hist2024.pontos} onChange={e => handleFormChange('hist2024.pontos', Number(e.target.value))} className="border border-border p-2 outline-none text-center text-sm bg-white focus:border-purple" />
                      </div>
                    </div>
                  </div>

                  {/* 2025 */}
                  <div className="border border-border rounded-sm p-4 bg-gray-50/50">
                    <h4 className="font-semibold text-center mb-4 text-xs text-muted uppercase tracking-wider">Ano 2025</h4>
                    <div className="flex gap-4">
                      <div className="flex-1 flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase font-semibold text-muted">Mês</label>
                        <select value={formData.hist2025.mes} onChange={e => handleFormChange('hist2025.mes', e.target.value)} className="border border-border p-2 outline-none text-sm bg-white focus:border-purple">
                          {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                      <div className="w-20 flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase font-semibold text-muted">Pontos</label>
                        <input type="number" min="0" value={formData.hist2025.pontos} onChange={e => handleFormChange('hist2025.pontos', Number(e.target.value))} className="border border-border p-2 outline-none text-center text-sm bg-white focus:border-purple" />
                      </div>
                    </div>
                  </div>

                  {/* 2026 */}
                  <div className="border border-border rounded-sm p-4 bg-gray-50/50">
                    <h4 className="font-semibold text-center mb-4 text-xs text-muted uppercase tracking-wider">Ano 2026</h4>
                    <div className="flex gap-4">
                      <div className="flex-1 flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase font-semibold text-muted">Mês</label>
                        <select value={formData.hist2026.mes} onChange={e => handleFormChange('hist2026.mes', e.target.value)} className="border border-border p-2 outline-none text-sm bg-white focus:border-purple">
                          {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                      <div className="w-20 flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase font-semibold text-muted">Pontos</label>
                        <input type="number" min="0" value={formData.hist2026.pontos} onChange={e => handleFormChange('hist2026.pontos', Number(e.target.value))} className="border border-border p-2 outline-none text-center text-sm bg-white focus:border-purple" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-border w-full"></div>

              {/* Seção: Opções e Observações */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Planejamento Próximas Férias</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {[0,1,2].map((idx) => (
                    <div key={idx} className="border border-border rounded-sm p-4 bg-gray-50/50">
                      <h4 className="font-semibold text-center mb-4 text-xs text-muted uppercase tracking-wider">{idx + 1}ª Opção</h4>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase font-semibold text-muted">Mês</label>
                          <select value={formData.opcoes[idx].mes} onChange={e => handleFormChange(`opcoes.${idx}.mes`, e.target.value)} className="border border-border p-2 outline-none text-sm bg-white focus:border-purple">
                            {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase font-semibold text-muted">Destaque de Cor</label>
                          <select value={formData.opcoes[idx].color} onChange={e => handleFormChange(`opcoes.${idx}.color`, e.target.value)} className="border border-border p-2 outline-none text-sm bg-white focus:border-purple">
                            <option value="white">Sem Destaque</option>
                            <option value="orange">Laranja</option>
                            <option value="blue">Azul</option>
                            <option value="yellow">Amarelo</option>
                            <option value="pink">Rosa</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">Data Programada (Opcional)</label>
                    <input type="text" value={formData.dataFerias} onChange={e => handleFormChange('dataFerias', e.target.value)} className="border border-border bg-white px-3 py-2 text-sm outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-shadow" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">Observação (Opcional)</label>
                    <input type="text" value={formData.observacao} onChange={e => handleFormChange('observacao', e.target.value)} className="border border-border bg-white px-3 py-2 text-sm outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-shadow uppercase" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-4 pt-6 border-t border-border">
                <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-2.5 text-sm font-semibold border border-border text-foreground hover:bg-gray-50 transition-colors rounded-sm">
                  Cancelar
                </button>
                <button type="submit" className="px-6 py-2.5 text-sm font-semibold border border-purple bg-purple hover:bg-purpleHover text-white transition-colors flex items-center gap-2 rounded-sm">
                  <Save size={16} /> Salvar Dados
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ferias;
