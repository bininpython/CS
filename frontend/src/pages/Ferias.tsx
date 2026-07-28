import React, { useMemo, useState } from 'react';
import { Download, Edit2, Plus, X, Save, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { useApp } from '../App';

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

export const INITIAL_DATA: Empregado[] = [
  // RB4
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

export const MESES = ['', 'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

const Ferias: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'RB1' | 'LE1' | 'RB4'>('RB1');
  const [dados, setDados] = useState<Empregado[]>(INITIAL_DATA);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Empregado | null>(null);
  
  const { solicitacoesFerias, setSolicitacoesFerias } = useApp();

  const handleAprovarFerias = (idSolicitacao: string) => {
    // 1. Atualizar status na solicitacao
    setSolicitacoesFerias(prev => prev.map(s => s.id === idSolicitacao ? { ...s, status: 'Aprovado' } : s));
    
    // 2. Procurar na tabela se esse colaborador existe, e pintar o mes de laranja
    const sol = solicitacoesFerias.find(s => s.id === idSolicitacao);
    if (sol) {
      const mesName = MESES[sol.mes];
      setDados(prev => prev.map(emp => {
        // Simple match by name (as this is a mock)
        if (emp.nome.toUpperCase() === sol.nome.toUpperCase()) {
          // Add as option 1 and color orange
          const newOpcoes = [...emp.opcoes] as [OpcaoFerias, OpcaoFerias, OpcaoFerias];
          newOpcoes[0] = { mes: mesName, color: 'orange' };
          return { ...emp, opcoes: newOpcoes, dataFerias: `Aprovado para ${mesName}` };
        }
        return emp;
      }));
    }
  };

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

  const getPointsClass = (pontos: number) => {
    if (pontos === 0) return 'text-black';
    if (pontos >= 1 && pontos <= 2) return 'text-green-600 font-bold';
    if (pontos >= 3 && pontos <= 7) return 'text-yellow-500 font-bold';
    if (pontos >= 8 && pontos <= 10) return 'text-red-600 font-bold';
    return 'text-black';
  };

  const getOptionBadge = (mes: string, color: string) => {
    if (!mes) return <span className="text-gray-400">-</span>;
    
    let colorClasses = "bg-white text-black border border-gray-300"; // default/white
    switch (color) {
      case 'orange': colorClasses = 'bg-[#FF9900] text-white border-[#FF9900]'; break;
      case 'blue': colorClasses = 'bg-[#3b82f6] text-white border-[#3b82f6]'; break;
      case 'yellow': colorClasses = 'bg-[#ffea00] text-black border-[#ffea00] font-bold'; break;
      case 'pink': colorClasses = 'bg-[#ffcdd2] text-black border-[#ffcdd2]'; break;
    }
    
    return (
      <span className={`inline-block w-full py-1 text-[10px] font-bold uppercase rounded-sm ${colorClasses}`}>
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
    <div className="flex flex-col h-full max-w-[100vw] overflow-x-hidden relative p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 flex-shrink-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-black uppercase tracking-wide">Controle de Férias</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">Histórico, pontuações e programação - Visão Consolidada</p>
        </div>
        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
          <button onClick={handleNew} className="flex-1 md:flex-none flex items-center justify-center gap-2 text-[10px] md:text-sm text-white bg-black px-3 md:px-5 py-2.5 hover:bg-gray-800 transition-colors font-bold uppercase tracking-wider">
            <Plus size={16} /> Novo Colaborador
          </button>
        </div>
      </div>

      {solicitacoesFerias.filter(s => s.status === 'Pendente').length > 0 && (
        <div className="mb-8 bg-orange-50 border-2 border-orange-500 p-4 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="text-orange-600" />
            <h2 className="text-sm font-bold text-orange-800 uppercase tracking-widest">Solicitações Pendentes ({solicitacoesFerias.filter(s => s.status === 'Pendente').length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {solicitacoesFerias.filter(s => s.status === 'Pendente').map(sol => (
              <div key={sol.id} className="bg-white border-2 border-orange-300 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-black uppercase">{sol.nome}</h3>
                  <p className="text-xs text-gray-600 font-bold uppercase mt-1">{sol.equipamento} | {sol.turno}</p>
                  <p className="text-sm text-black font-bold uppercase mt-3 bg-orange-100 p-2 inline-block">Mês Solicitado: {MESES[sol.mes]}</p>
                </div>
                <button 
                  onClick={() => handleAprovarFerias(sol.id)}
                  className="mt-4 w-full bg-[#FF9900] text-white font-bold uppercase tracking-widest py-2 flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
                >
                  <CheckCircle2 size={16} /> Aprovar Férias
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-0 mb-6 border-b-2 border-black flex-shrink-0">
        {['RB1', 'LE1', 'RB4'].map((equip) => (
          <button
            key={equip}
            onClick={() => setActiveTab(equip as any)}
            className={`px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === equip
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-100 border-x border-t border-transparent hover:border-gray-200'
            }`}
          >
            EQUIPE {equip}
          </button>
        ))}
      </div>

      <div className="bg-white border-2 border-black flex-1 flex flex-col min-h-0">
        <div className="px-6 py-4 border-b-2 border-black flex items-center gap-2 bg-gray-50">
          <Calendar className="text-black" size={20} />
          <h2 className="text-lg font-bold text-black uppercase tracking-widest">Tabela de Planejamento</h2>
        </div>
        <div className="flex-1 overflow-x-auto overflow-y-auto">
          <table className="text-xs border-collapse min-w-[1300px] w-full text-center bg-white">
            <thead>
              <tr className="border-b-2 border-black bg-gray-50">
                <th colSpan={3} className="px-2 py-3 font-bold uppercase tracking-widest text-black border-r-2 border-black">Identificação</th>
                <th colSpan={6} className="px-2 py-3 font-bold uppercase tracking-widest text-black border-r-2 border-black">Histórico (Anos)</th>
                <th colSpan={2} className="px-2 py-3 font-bold uppercase tracking-widest text-black border-r-2 border-black">Classificação</th>
                <th colSpan={3} className="px-2 py-3 font-bold uppercase tracking-widest text-black border-r-2 border-black">Programação</th>
                <th colSpan={3} className="px-2 py-3 font-bold uppercase tracking-widest text-black">Status</th>
              </tr>
              <tr className="border-b-2 border-black bg-white text-black font-bold uppercase">
                <th className="px-3 py-3 border-r border-black w-24">R3</th>
                <th className="px-3 py-3 border-r border-black text-left">Empregado</th>
                <th className="px-3 py-3 border-r-2 border-black w-28">Período Aquis.</th>
                <th className="px-2 py-3 border-r border-gray-300 w-16">2024</th>
                <th className="px-2 py-3 border-r border-black w-14">Pts</th>
                <th className="px-2 py-3 border-r border-gray-300 w-16">2025</th>
                <th className="px-2 py-3 border-r border-black w-14">Pts</th>
                <th className="px-2 py-3 border-r border-gray-300 w-16">2026</th>
                <th className="px-2 py-3 border-r-2 border-black w-14">Pts</th>
                <th className="px-3 py-3 border-r border-black w-16">Total</th>
                <th className="px-3 py-3 border-r-2 border-black w-16 bg-gray-100">Prior.</th>
                <th className="px-2 py-3 border-r border-black w-20">1ª Opção</th>
                <th className="px-2 py-3 border-r border-black w-20">2ª Opção</th>
                <th className="px-2 py-3 border-r-2 border-black w-20">3ª Opção</th>
                <th className="px-3 py-3 border-r border-black w-28">Data Prevista</th>
                <th className="px-3 py-3 border-r border-black text-left">Observações</th>
                <th className="px-3 py-3 w-12">Editar</th>
              </tr>
            </thead>
            
            <tbody className="text-black font-medium">
              {colaboradoresCalculados.length === 0 ? (
                <tr>
                  <td colSpan={17} className="text-center py-10 text-gray-500 bg-white">
                    Nenhum colaborador registrado.
                  </td>
                </tr>
              ) : (
                colaboradoresCalculados.map((emp) => (
                  <tr key={emp.id} className="border-b border-black hover:bg-gray-50 transition-colors group">
                    <td className="px-3 py-2.5 border-r border-black">{emp.r3}</td>
                    <td className="px-3 py-2.5 border-r border-black text-left font-bold">{emp.nome}</td>
                    <td className="px-3 py-2.5 border-r-2 border-black bg-green-200 font-bold">{emp.periodoAquisitivo || '-'}</td>
                    
                    {/* 2024 */}
                    <td className="px-2 py-2.5 border-r border-gray-300 uppercase">{emp.hist2024.mes || '-'}</td>
                    <td className={`px-2 py-2.5 border-r border-black text-base ${getPointsClass(emp.hist2024.pontos)}`}>{emp.hist2024.pontos}</td>
                    
                    {/* 2025 */}
                    <td className="px-2 py-2.5 border-r border-gray-300 uppercase">{emp.hist2025.mes || '-'}</td>
                    <td className={`px-2 py-2.5 border-r border-black text-base ${getPointsClass(emp.hist2025.pontos)}`}>{emp.hist2025.pontos}</td>

                    {/* 2026 */}
                    <td className="px-2 py-2.5 border-r border-gray-300 uppercase">{emp.hist2026.mes || '-'}</td>
                    <td className={`px-2 py-2.5 border-r-2 border-black text-base ${getPointsClass(emp.hist2026.pontos)}`}>{emp.hist2026.pontos}</td>

                    {/* Totais */}
                    <td className="px-3 py-2.5 border-r border-black text-base font-bold bg-gray-50">{emp.total}</td>
                    <td className="px-3 py-2.5 border-r-2 border-black font-bold text-base bg-black text-white">
                      {emp.prioridade}º
                    </td>

                    {/* Opcoes */}
                    {emp.opcoes.map((opt, idx) => (
                      <td key={idx} className={`px-2 py-2.5 ${idx === 2 ? 'border-r-2 border-black' : 'border-r border-black'}`}>
                        {getOptionBadge(opt.mes, opt.color)}
                      </td>
                    ))}

                    {/* Finais */}
                    <td className="px-3 py-2.5 border-r border-black">{emp.dataFerias || '-'}</td>
                    <td className="px-3 py-2.5 border-r border-black text-left text-[11px] max-w-[200px] truncate" title={emp.observacao}>
                      {emp.observacao || '-'}
                    </td>
                    <td className="px-3 py-2.5 text-center bg-gray-50">
                      <button 
                        onClick={() => handleEdit(emp)}
                        className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 transition-colors flex items-center justify-center mx-auto rounded-sm"
                        title="Editar Linha"
                      >
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL MANTÉM DESIGN LIMPO */}
      {modalOpen && formData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="border-b-2 border-black p-5 flex justify-between items-center sticky top-0 z-10 bg-white">
              <h2 className="text-xl font-bold uppercase tracking-wider text-black">
                {formData.id ? 'Editar Colaborador' : 'Novo Colaborador'} - EQUIPE {activeTab}
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-1 text-black hover:bg-gray-200 transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 flex flex-col gap-8">
              {/* Identificação */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-black">R3 (Matrícula)</label>
                  <input required type="text" value={formData.r3} onChange={e => handleFormChange('r3', e.target.value)} className="border-2 border-black bg-white px-3 py-2 font-medium outline-none focus:bg-gray-50" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-black">Nome Completo</label>
                  <input required type="text" value={formData.nome} onChange={e => handleFormChange('nome', e.target.value)} className="border-2 border-black bg-white px-3 py-2 font-bold outline-none focus:bg-gray-50 uppercase" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-black">Período Aquisitivo</label>
                  <input type="text" value={formData.periodoAquisitivo} onChange={e => handleFormChange('periodoAquisitivo', e.target.value)} className="border-2 border-black bg-green-100 px-3 py-2 font-bold outline-none focus:bg-green-200" placeholder="Ex: 15/11/2026" />
                </div>
              </div>

              <div className="h-0.5 bg-black w-full"></div>

              {/* Histórico */}
              <div>
                <h3 className="text-lg font-bold uppercase text-black mb-4">Histórico de Férias</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['2024', '2025', '2026'].map((ano, i) => {
                    const histKey = `hist${ano}` as 'hist2024'|'hist2025'|'hist2026';
                    return (
                      <div key={ano} className="border-2 border-black p-4 bg-gray-50">
                        <h4 className="font-bold text-center mb-4 text-sm text-black uppercase tracking-widest">{ano}</h4>
                        <div className="flex gap-4">
                          <div className="flex-1 flex flex-col gap-2">
                            <label className="text-[10px] uppercase font-bold text-gray-600">Mês</label>
                            <select value={formData[histKey].mes} onChange={e => handleFormChange(`${histKey}.mes`, e.target.value)} className="border-2 border-black p-2 outline-none text-sm font-bold bg-white">
                              {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                          </div>
                          <div className="w-20 flex flex-col gap-2">
                            <label className="text-[10px] uppercase font-bold text-gray-600">Pontos</label>
                            <input type="number" min="0" value={formData[histKey].pontos} onChange={e => handleFormChange(`${histKey}.pontos`, Number(e.target.value))} className="border-2 border-black p-2 outline-none text-center font-bold text-sm bg-white" />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="h-0.5 bg-black w-full"></div>

              {/* Opções e Observações */}
              <div>
                <h3 className="text-lg font-bold uppercase text-black mb-4">Planejamento Próximas Férias</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {[0,1,2].map((idx) => (
                    <div key={idx} className="border-2 border-black p-4 bg-gray-50">
                      <h4 className="font-bold text-center mb-4 text-sm text-black uppercase tracking-widest">{idx + 1}ª Opção</h4>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase font-bold text-gray-600">Mês</label>
                          <select value={formData.opcoes[idx].mes} onChange={e => handleFormChange(`opcoes.${idx}.mes`, e.target.value)} className="border-2 border-black p-2 outline-none text-sm font-bold bg-white">
                            {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase font-bold text-gray-600">Destaque de Cor</label>
                          <select value={formData.opcoes[idx].color} onChange={e => handleFormChange(`opcoes.${idx}.color`, e.target.value)} className="border-2 border-black p-2 outline-none text-sm bg-white font-medium">
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
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-black">Data Prevista (Opcional)</label>
                    <input type="text" value={formData.dataFerias} onChange={e => handleFormChange('dataFerias', e.target.value)} className="border-2 border-black bg-white px-3 py-2 outline-none focus:bg-gray-50" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-black">Observação (Opcional)</label>
                    <input type="text" value={formData.observacao} onChange={e => handleFormChange('observacao', e.target.value)} className="border-2 border-black bg-white px-3 py-2 outline-none focus:bg-gray-50 uppercase" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 mt-2 pt-6 border-t-2 border-black">
                <button type="button" onClick={() => setModalOpen(false)} className="px-8 py-3 text-sm font-bold uppercase tracking-widest border-2 border-black text-black hover:bg-gray-100 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="px-8 py-3 text-sm font-bold uppercase tracking-widest border-2 border-black bg-[#00FF00] hover:bg-[#00cc00] text-black transition-colors flex items-center gap-2">
                  <Save size={18} /> Salvar Dados
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
