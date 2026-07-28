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

  // Calcula totais e prioridades automaticamente e re-ordena a tabela visualmente
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

  const getPointsColor = (pontos: number) => {
    if (pontos === 0) return 'text-foreground';
    if (pontos >= 1 && pontos <= 2) return 'text-[#00FF00] font-bold'; // Verde
    if (pontos >= 3 && pontos <= 7) return 'text-[#FF9900] font-bold'; // Amarelo
    if (pontos >= 8 && pontos <= 10) return 'text-red-600 font-bold'; // Vermelho
    return 'text-foreground';
  };

  const getOptionColorClass = (color: string) => {
    switch (color) {
      case 'orange': return 'bg-[#FF9900] text-white';
      case 'blue': return 'bg-[#3b82f6] text-white';
      case 'yellow': return 'bg-[#ffea00] text-black font-bold';
      case 'pink': return 'bg-[#ffcdd2] text-black';
      default: return 'bg-white text-foreground';
    }
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
      // Edit
      setDados(prev => prev.map(emp => emp.id === formData.id ? formData : emp));
    } else {
      // New
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
          <h1 className="text-xl font-semibold text-foreground">Banco de Dados - Histórico de Férias</h1>
          <p className="text-sm text-muted mt-0.5">Acompanhamento e priorização baseada em peso de histórico</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleNew}
            className="flex items-center gap-2 text-sm text-white bg-purple px-4 py-2 hover:bg-purpleHover transition-colors font-medium border border-purple"
          >
            <Plus size={16} /> Adicionar Colaborador
          </button>
          <button className="flex items-center gap-2 text-sm text-foreground border border-black px-4 py-2 hover:bg-gray-100 transition-colors font-medium bg-white">
            <Download size={16} /> Exportar Excel
          </button>
        </div>
      </div>

      {/* Abas de Equipamentos */}
      <div className="bg-white border-x border-t border-black flex items-center overflow-x-auto flex-shrink-0 font-bold">
        {['RB1', 'LE1', 'RB4'].map((equip) => (
          <button
            key={equip}
            onClick={() => setActiveTab(equip as any)}
            className={`px-8 py-3 text-sm font-bold whitespace-nowrap transition-colors border-b-2 border-black border-r ${
              activeTab === equip
                ? 'bg-gray-200 text-black'
                : 'bg-white text-gray-500 hover:text-black hover:bg-gray-50'
            }`}
          >
            EQUIPE {equip}
          </button>
        ))}
      </div>

      <div className="bg-white border-x border-b border-black w-full flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full max-w-full">
          <table className="text-[10px] sm:text-xs border-collapse min-w-[1250px] w-full bg-white">
            <thead className="bg-gray-200">
              {/* ROW 1 */}
              <tr className="border-b border-black">
                <th colSpan={2} className="border-r border-black font-bold px-2 py-1 text-center bg-gray-300">Equipe {activeTab}</th>
                <th rowSpan={3} className="border-r border-black font-bold px-4 py-1 text-center bg-gray-200 align-middle">Período<br/>Aquisitivo</th>
                <th colSpan={6} className="border-r border-black font-bold px-2 py-1 text-center bg-gray-300 text-sm">Banco de dados - Histórico</th>
                <th rowSpan={3} className="border-r border-black font-bold px-2 py-1 text-center bg-gray-200 align-middle">Total de<br/>pontos</th>
                <th rowSpan={3} className="border-r border-black font-bold px-2 py-1 text-center bg-gray-200 align-middle">Prioridade</th>
                <th colSpan={3} className="border-r border-black font-bold px-2 py-1 text-center bg-gray-300">Opções para próxima férias</th>
                <th rowSpan={3} className="border-r border-black font-bold px-4 py-1 text-center bg-gray-200 align-middle">Data das férias</th>
                <th rowSpan={3} className="border-r border-black font-bold px-4 py-1 text-center bg-gray-200 align-middle">Observação</th>
                <th rowSpan={3} className="border-black font-bold px-2 py-1 text-center bg-gray-300 align-middle">Ações</th>
              </tr>

              {/* ROW 2 */}
              <tr className="border-b border-black">
                <th rowSpan={2} className="border-r border-black font-bold px-2 py-1 text-center">R3</th>
                <th rowSpan={2} className="border-r border-black font-bold px-2 py-1 text-center min-w-[200px]">Empregado</th>
                <th colSpan={2} className="border-r border-black font-bold px-2 py-1 text-center">2024</th>
                <th colSpan={2} className="border-r border-black font-bold px-2 py-1 text-center">2025</th>
                <th colSpan={2} className="border-r border-black font-bold px-2 py-1 text-center">2026</th>
                <th className="border-r border-black font-bold px-2 py-1 text-center min-w-[60px]">1ª opção</th>
                <th className="border-r border-black font-bold px-2 py-1 text-center min-w-[60px]">2ª opção</th>
                <th className="border-r border-black font-bold px-2 py-1 text-center min-w-[60px]">3ª opção</th>
              </tr>

              {/* ROW 3 */}
              <tr className="border-b border-black">
                <th className="border-r border-black font-bold px-2 py-1 text-center">Mês</th>
                <th className="border-r border-black font-bold px-2 py-1 text-center">Pontos</th>
                <th className="border-r border-black font-bold px-2 py-1 text-center">Mês</th>
                <th className="border-r border-black font-bold px-2 py-1 text-center">Pontos</th>
                <th className="border-r border-black font-bold px-2 py-1 text-center">Mês</th>
                <th className="border-r border-black font-bold px-2 py-1 text-center">Pontos</th>
                <th className="border-r border-black font-bold px-2 py-1 text-center">Mês</th>
                <th className="border-r border-black font-bold px-2 py-1 text-center">Mês</th>
                <th className="border-r border-black font-bold px-2 py-1 text-center">Mês</th>
              </tr>
            </thead>
            
            <tbody>
              {colaboradoresCalculados.length === 0 ? (
                <tr>
                  <td colSpan={16} className="text-center py-10 text-muted font-medium bg-white">
                    Nenhum colaborador registrado na Equipe {activeTab}.
                  </td>
                </tr>
              ) : (
                colaboradoresCalculados.map((emp, i) => (
                  <tr key={emp.id} className="border-b border-black hover:bg-gray-50 transition-colors">
                    {/* Identificação */}
                    <td className="border-r border-black px-2 py-1.5 text-center text-foreground font-medium">{emp.r3}</td>
                    <td className="border-r border-black px-2 py-1.5 text-left text-foreground font-medium whitespace-nowrap">{emp.nome}</td>
                    
                    {/* Período */}
                    <td className="border-r border-black px-2 py-1.5 text-center font-bold text-black bg-[#00FF00]">
                      {emp.periodoAquisitivo}
                    </td>
                    
                    {/* 2024 */}
                    <td className="border-r border-black px-2 py-1.5 text-center uppercase">{emp.hist2024.mes}</td>
                    <td className={`border-r border-black px-2 py-1.5 text-center bg-gray-50 ${getPointsColor(emp.hist2024.pontos)}`}>{emp.hist2024.pontos}</td>
                    
                    {/* 2025 */}
                    <td className="border-r border-black px-2 py-1.5 text-center uppercase">{emp.hist2025.mes}</td>
                    <td className={`border-r border-black px-2 py-1.5 text-center bg-gray-50 ${getPointsColor(emp.hist2025.pontos)}`}>{emp.hist2025.pontos}</td>

                    {/* 2026 */}
                    <td className="border-r border-black px-2 py-1.5 text-center uppercase">{emp.hist2026.mes}</td>
                    <td className={`border-r border-black px-2 py-1.5 text-center bg-gray-50 ${getPointsColor(emp.hist2026.pontos)}`}>{emp.hist2026.pontos}</td>

                    {/* Totais */}
                    <td className="border-r border-black px-2 py-1.5 text-center font-bold text-foreground bg-gray-100">{emp.total}</td>
                    <td className="border-r border-black px-2 py-1.5 text-center font-bold text-lg bg-gray-100">{emp.prioridade}º</td>

                    {/* Opcoes */}
                    {emp.opcoes.map((opt, idx) => (
                      <td key={idx} className={`border-r border-black px-2 py-1.5 text-center font-bold ${getOptionColorClass(opt.color)}`}>
                        {opt.mes}
                      </td>
                    ))}

                    {/* Finais */}
                    <td className="border-r border-black px-2 py-1.5 text-center">{emp.dataFerias}</td>
                    <td className="border-r border-black px-2 py-1.5 text-left text-xs min-w-[150px]">{emp.observacao}</td>
                    <td className="px-2 py-1.5 text-center bg-gray-50">
                      <button 
                        onClick={() => handleEdit(emp)}
                        className="p-1.5 bg-purple text-white hover:bg-purpleHover transition-colors flex items-center justify-center mx-auto"
                        title="Editar Colaborador"
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
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border-2 border-black w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl">
            {/* Header */}
            <div className="bg-gray-100 border-b-2 border-black p-4 flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-xl font-bold uppercase tracking-wide">
                {formData.id ? 'Editar Colaborador' : 'Novo Colaborador'} - EQUIPE {activeTab}
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-1 hover:bg-gray-300 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSaveModal} className="p-6 flex flex-col gap-8">
              {/* Seção: Identificação */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted">R3 (Matrícula)</label>
                  <input required type="text" value={formData.r3} onChange={e => handleFormChange('r3', e.target.value)} className="border-b-2 border-black bg-gray-50 p-2 outline-none focus:border-purple font-medium" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted">Nome do Empregado</label>
                  <input required type="text" value={formData.nome} onChange={e => handleFormChange('nome', e.target.value)} className="border-b-2 border-black bg-gray-50 p-2 outline-none focus:border-purple font-medium uppercase" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted">Período Aquisitivo</label>
                  <input type="text" value={formData.periodoAquisitivo} onChange={e => handleFormChange('periodoAquisitivo', e.target.value)} className="border-b-2 border-black bg-gray-50 p-2 outline-none focus:border-purple font-medium bg-[#00FF00]/20" placeholder="Ex: 15/11/2026" />
                </div>
              </div>

              <hr className="border-black border-dashed" />

              {/* Seção: Histórico */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-l-4 border-purple pl-2">Banco de Dados - Histórico</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 2024 */}
                  <div className="border border-black p-4 bg-gray-50">
                    <h4 className="font-bold text-center mb-3 border-b border-black pb-1">2024</h4>
                    <div className="flex gap-4">
                      <div className="flex-1 flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-muted">Mês</label>
                        <select value={formData.hist2024.mes} onChange={e => handleFormChange('hist2024.mes', e.target.value)} className="border-b-2 border-black p-1 outline-none text-sm font-bold">
                          {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                      <div className="w-20 flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-muted">Pontos</label>
                        <input type="number" min="0" value={formData.hist2024.pontos} onChange={e => handleFormChange('hist2024.pontos', Number(e.target.value))} className="border-b-2 border-black p-1 outline-none text-center font-bold text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* 2025 */}
                  <div className="border border-black p-4 bg-gray-50">
                    <h4 className="font-bold text-center mb-3 border-b border-black pb-1">2025</h4>
                    <div className="flex gap-4">
                      <div className="flex-1 flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-muted">Mês</label>
                        <select value={formData.hist2025.mes} onChange={e => handleFormChange('hist2025.mes', e.target.value)} className="border-b-2 border-black p-1 outline-none text-sm font-bold">
                          {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                      <div className="w-20 flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-muted">Pontos</label>
                        <input type="number" min="0" value={formData.hist2025.pontos} onChange={e => handleFormChange('hist2025.pontos', Number(e.target.value))} className="border-b-2 border-black p-1 outline-none text-center font-bold text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* 2026 */}
                  <div className="border border-black p-4 bg-gray-50">
                    <h4 className="font-bold text-center mb-3 border-b border-black pb-1">2026</h4>
                    <div className="flex gap-4">
                      <div className="flex-1 flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-muted">Mês</label>
                        <select value={formData.hist2026.mes} onChange={e => handleFormChange('hist2026.mes', e.target.value)} className="border-b-2 border-black p-1 outline-none text-sm font-bold">
                          {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                      <div className="w-20 flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-muted">Pontos</label>
                        <input type="number" min="0" value={formData.hist2026.pontos} onChange={e => handleFormChange('hist2026.pontos', Number(e.target.value))} className="border-b-2 border-black p-1 outline-none text-center font-bold text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-black border-dashed" />

              {/* Seção: Opções e Observações */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-l-4 border-purple pl-2">Opções Próximas Férias</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {[0,1,2].map((idx) => (
                    <div key={idx} className="border border-black p-4">
                      <h4 className="font-bold text-center mb-3 border-b border-black pb-1 text-sm">{idx + 1}ª Opção</h4>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase font-bold text-muted">Mês</label>
                          <select value={formData.opcoes[idx].mes} onChange={e => handleFormChange(`opcoes.${idx}.mes`, e.target.value)} className="border-b-2 border-black p-2 outline-none text-sm font-bold">
                            {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase font-bold text-muted">Cor Destaque</label>
                          <select value={formData.opcoes[idx].color} onChange={e => handleFormChange(`opcoes.${idx}.color`, e.target.value)} className="border-b-2 border-black p-2 outline-none text-sm">
                            <option value="white">Branco (Sem Destaque)</option>
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
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted">Data das Férias (Opcional)</label>
                    <input type="text" value={formData.dataFerias} onChange={e => handleFormChange('dataFerias', e.target.value)} className="border-b-2 border-black bg-gray-50 p-2 outline-none focus:border-purple" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted">Observação (Opcional)</label>
                    <input type="text" value={formData.observacao} onChange={e => handleFormChange('observacao', e.target.value)} className="border-b-2 border-black bg-gray-50 p-2 outline-none focus:border-purple uppercase" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 mt-4 pt-4 border-t-2 border-black">
                <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3 font-bold border-2 border-black hover:bg-gray-100 transition-colors uppercase">
                  Cancelar
                </button>
                <button type="submit" className="px-8 py-3 font-bold border-2 border-black bg-[#00FF00] hover:bg-[#00cc00] text-black transition-colors uppercase flex items-center gap-2">
                  <Save size={18} /> Salvar Colaborador
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
