import React, { useMemo, useState } from 'react';
import { Download, Edit2, Save, X } from 'lucide-react';

interface HistoricoAno {
  mes: string;
  pontos: number;
}

interface OpcaoFerias {
  mes: string;
  color: 'orange' | 'blue' | 'yellow' | 'pink' | 'white';
}

interface Empregado {
  id: string; // Internal id for tracking
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
  // RB3 (Mapeado como RB4 no sistema)
  { id: generateId(), r3: '1009384', nome: 'LUCAS DOS SANTOS MORAIS', periodoAquisitivo: '17/11/2026', hist2024: { mes: 'JULHO', pontos: 1 }, hist2025: { mes: 'MAIO', pontos: 8 }, hist2026: { mes: 'MAIO', pontos: 8 }, opcoes: [{ mes: 'MAIO', color: 'white' }, { mes: 'JULHO', color: 'white' }, { mes: 'OUTUBRO', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { id: generateId(), r3: '1004162', nome: 'FLEWDSON CAMPOS DOS SANTOS', periodoAquisitivo: '14/03/2026', hist2024: { mes: 'FEV', pontos: 2 }, hist2025: { mes: 'FEV', pontos: 2 }, hist2026: { mes: 'FEV', pontos: 2 }, opcoes: [{ mes: 'FEVEREIRO', color: 'white' }, { mes: '', color: 'white' }, { mes: '', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { id: generateId(), r3: '1007155', nome: 'WILDSON JUNIOR RODRIGUES DINIZ', periodoAquisitivo: '10/06/2026', hist2024: { mes: 'AGOSTO', pontos: 10 }, hist2025: { mes: 'AGOSTO', pontos: 10 }, hist2026: { mes: 'OUT', pontos: 10 }, opcoes: [{ mes: 'AGOSTO', color: 'white' }, { mes: 'OUTUBRO', color: 'white' }, { mes: 'SETEMBRO', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { id: generateId(), r3: '1009716', nome: 'TULYO FERREIRA SILVA NESCAU', periodoAquisitivo: '09/02/2027', hist2024: { mes: 'ABR', pontos: 6 }, hist2025: { mes: 'MARÇO', pontos: 3 }, hist2026: { mes: 'MARÇO', pontos: 3 }, opcoes: [{ mes: 'JULHO', color: 'white' }, { mes: 'MARÇO', color: 'white' }, { mes: 'ABRIL', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { id: generateId(), r3: '1011174', nome: 'JOÃO PAULO ALVES', periodoAquisitivo: '04/02/2027', hist2024: { mes: 'DEZ', pontos: 3 }, hist2025: { mes: 'AGOSTO', pontos: 10 }, hist2026: { mes: '', pontos: 0 }, opcoes: [{ mes: 'OUTUBRO', color: 'white' }, { mes: 'NOVEMBRO', color: 'white' }, { mes: 'SETEMBRO', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { id: generateId(), r3: '1012203', nome: 'KELLEN YARA VIEIRA', periodoAquisitivo: '04/11/2026', hist2024: { mes: '-', pontos: 0 }, hist2025: { mes: '-', pontos: 0 }, hist2026: { mes: '-', pontos: 0 }, opcoes: [{ mes: 'ABRIL', color: 'white' }, { mes: 'MARÇO', color: 'white' }, { mes: 'MAIO', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { id: generateId(), r3: '1008511', nome: 'ÍTALO MIRANDA DE RAMOS', periodoAquisitivo: '07/05/2026', hist2024: { mes: 'DEZ', pontos: 3 }, hist2025: { mes: 'JULHO', pontos: 1 }, hist2026: { mes: 'DEZ', pontos: 3 }, opcoes: [{ mes: 'Março', color: 'white' }, { mes: 'Maio', color: 'white' }, { mes: 'Setembro', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { id: generateId(), r3: '1011066', nome: 'JACQUELINE SILVA GARCIA', periodoAquisitivo: '20/11/2026', hist2024: { mes: '-', pontos: 0 }, hist2025: { mes: 'FEV', pontos: 2 }, hist2026: { mes: 'JUNHO', pontos: 8 }, opcoes: [{ mes: 'JUNHO', color: 'white' }, { mes: 'AGOSTO', color: 'white' }, { mes: 'SETEMBRO', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },

  // RB1
  { id: generateId(), r3: '1009599', nome: 'RODRIGO OLIVEIRA MOREIRA', periodoAquisitivo: '15/11/2026', hist2024: { mes: 'MARÇO', pontos: 3 }, hist2025: { mes: 'MARÇO', pontos: 3 }, hist2026: { mes: 'MARÇO', pontos: 3 }, opcoes: [{ mes: 'Abril', color: 'white' }, { mes: 'Maio', color: 'white' }, { mes: 'Junho', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { id: generateId(), r3: '1009593', nome: 'TALES JACOB DE SOUZA', periodoAquisitivo: '06/04/2027', hist2024: { mes: 'OUT', pontos: 10 }, hist2025: { mes: 'OUT', pontos: 10 }, hist2026: { mes: 'OUT', pontos: 10 }, opcoes: [{ mes: 'Outubro', color: 'white' }, { mes: 'November', color: 'white' }, { mes: 'December', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { id: generateId(), r3: '1011006', nome: 'ABNER LUCAS ALMEIDA PASSOS', periodoAquisitivo: '20/09/2026', hist2024: { mes: 'JAN', pontos: 1 }, hist2025: { mes: 'DEZ', pontos: 3 }, hist2026: { mes: 'DEZ', pontos: 3 }, opcoes: [{ mes: 'DEZ', color: 'white' }, { mes: 'SET', color: 'white' }, { mes: 'NOV', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { id: generateId(), r3: '1010341', nome: 'AUGUSTO ROMONAO MARQUES', periodoAquisitivo: '19/05/2027', hist2024: { mes: 'JUNHO', pontos: 8 }, hist2025: { mes: 'DEZ', pontos: 3 }, hist2026: { mes: 'JUNHO', pontos: 8 }, opcoes: [{ mes: '', color: 'white' }, { mes: '', color: 'white' }, { mes: '', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { id: generateId(), r3: '1006816', nome: 'RAFAEL HENRIQUE LINHARES', periodoAquisitivo: '24/03/2027', hist2024: { mes: 'ABRIL', pontos: 6 }, hist2025: { mes: 'JULHO', pontos: 1 }, hist2026: { mes: 'ABRIL', pontos: 6 }, opcoes: [{ mes: 'JUL', color: 'white' }, { mes: 'SET', color: 'white' }, { mes: 'AGO', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { id: generateId(), r3: '1010125', nome: 'ALEXANDRE SILVA RODRIGUES', periodoAquisitivo: '02/01/2027', hist2024: { mes: 'FEV', pontos: 2 }, hist2025: { mes: 'FEV', pontos: 2 }, hist2026: { mes: 'FEV', pontos: 2 }, opcoes: [{ mes: 'Fevereiro', color: 'white' }, { mes: 'Março', color: 'white' }, { mes: 'Abril', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { id: generateId(), r3: '1009594', nome: 'ISRAEL LUCAS FREITAS NUNES', periodoAquisitivo: '15/11/2026', hist2024: { mes: 'AGO', pontos: 10 }, hist2025: { mes: 'AGOSTO', pontos: 10 }, hist2026: { mes: 'AGOSTO', pontos: 10 }, opcoes: [{ mes: 'AGOSTO', color: 'white' }, { mes: 'SETEMBRO', color: 'white' }, { mes: 'OUTUBRO', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { id: generateId(), r3: '1008540', nome: 'AMOS RAFAEL MARTINS DE ALMEIDA', periodoAquisitivo: '20/06/2026', hist2024: { mes: 'DEZ', pontos: 3 }, hist2025: { mes: 'AGOSTO', pontos: 10 }, hist2026: { mes: '-', pontos: 0 }, opcoes: [{ mes: 'JAN', color: 'white' }, { mes: 'FEV', color: 'white' }, { mes: 'MARÇO', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { id: generateId(), r3: '1010784', nome: 'DAVI FERREIRA LIMA', periodoAquisitivo: '07/05/2026', hist2024: { mes: 'SET', pontos: 10 }, hist2025: { mes: 'NOV', pontos: 10 }, hist2026: { mes: 'NOV', pontos: 10 }, opcoes: [{ mes: 'OUTUBRO', color: 'white' }, { mes: 'NOVEMBRO', color: 'white' }, { mes: 'Dezembro', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },

  // LE1
  { id: generateId(), r3: '1003864', nome: 'RODRIGO CUNHA SOUZA', periodoAquisitivo: '16/02/2025', hist2024: { mes: 'MARÇO', pontos: 3 }, hist2025: { mes: 'DEZ', pontos: 3 }, hist2026: { mes: 'MARÇO', pontos: 3 }, opcoes: [{ mes: 'Março', color: 'white' }, { mes: 'Abril', color: 'white' }, { mes: 'Maio', color: 'white' }], dataFerias: '', observacao: '', equipe: 'LE1' },
  { id: generateId(), r3: '1011468', nome: 'FERNANDA MORAIS VIRTUOSO', periodoAquisitivo: '01/09/2026', hist2024: { mes: '--------', pontos: 0 }, hist2025: { mes: 'DEZ', pontos: 3 }, hist2026: { mes: '--------', pontos: 0 }, opcoes: [{ mes: 'dezembro', color: 'white' }, { mes: 'janeiro', color: 'white' }, { mes: 'fevereiro', color: 'white' }], dataFerias: '', observacao: '', equipe: 'LE1' },
  { id: generateId(), r3: '1004368', nome: 'WILLIAM JUNIO SIMÕES', periodoAquisitivo: '01/01/2027', hist2024: { mes: 'JULHO', pontos: 2 }, hist2025: { mes: 'SET', pontos: 10 }, hist2026: { mes: 'MAIO', pontos: 8 }, opcoes: [{ mes: '', color: 'white' }, { mes: '', color: 'white' }, { mes: '', color: 'white' }], dataFerias: '', observacao: '', equipe: 'LE1' },
];

const Ferias: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'RB1' | 'LE1' | 'RB4'>('RB1');
  const [isEditing, setIsEditing] = useState(false);
  const [dados, setDados] = useState<Empregado[]>(INITIAL_DATA);

  // Calcula totais e prioridades automaticamente e re-ordena a tabela visualmente se necessário
  // Baseado nos dados locais, apenas da aba atual
  const colaboradoresCalculados = useMemo(() => {
    let tabData = dados.filter(emp => emp.equipe === activeTab).map(emp => {
      const total = emp.hist2024.pontos + emp.hist2025.pontos + emp.hist2026.pontos;
      return { ...emp, total };
    });

    const sortedByTotal = [...tabData].sort((a, b) => b.total - a.total);
    
    return tabData.map(emp => {
      // Prioridade = posição no ranking ordenado + 1
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

  const handleUpdate = (id: string, field: string, value: any) => {
    setDados(prev => prev.map(emp => {
      if (emp.id !== id) return emp;
      
      const newEmp = { ...emp };
      const fields = field.split('.');
      if (fields.length === 2) {
        // Nested updates like hist2024.pontos
        (newEmp as any)[fields[0]][fields[1]] = value;
      } else if (fields[0] === 'opcoes') {
        const idx = parseInt(fields[1]);
        const prop = fields[2];
        newEmp.opcoes[idx] = { ...newEmp.opcoes[idx], [prop]: value };
      } else {
        (newEmp as any)[field] = value;
      }
      return newEmp;
    }));
  };

  const renderEditableCell = (value: string | number, id: string, field: string, isNumber = false, classes = '') => {
    if (isEditing) {
      return (
        <input
          type={isNumber ? "number" : "text"}
          value={value}
          onChange={(e) => handleUpdate(id, field, isNumber ? (e.target.value === '' ? 0 : Number(e.target.value)) : e.target.value)}
          className={`w-full bg-blue-50/50 border border-blue-200 outline-none focus:ring-1 focus:ring-blue-500 px-1 py-0.5 text-center ${classes}`}
        />
      );
    }
    return <span className={classes}>{value}</span>;
  };

  return (
    <div className="flex flex-col h-full max-w-[100vw] overflow-x-hidden">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Banco de Dados - Histórico de Férias</h1>
          <p className="text-sm text-muted mt-0.5">Acompanhamento e priorização baseada em peso de histórico</p>
        </div>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <button 
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 text-sm text-white bg-green-600 px-4 py-2 hover:bg-green-700 transition-colors font-medium border border-green-700"
            >
              <Save size={16} /> Salvar Alterações
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-sm text-white bg-purple px-4 py-2 hover:bg-purpleHover transition-colors font-medium border border-purple"
            >
              <Edit2 size={16} /> Editar Tabela
            </button>
          )}
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
          <table className="text-[10px] sm:text-xs border-collapse min-w-[1200px] w-full bg-white">
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
                <th rowSpan={3} className="border-black font-bold px-4 py-1 text-center bg-gray-200 align-middle">Observação</th>
              </tr>

              {/* ROW 2 */}
              <tr className="border-b border-black">
                <th rowSpan={2} className="border-r border-black font-bold px-2 py-1 text-center">R3</th>
                <th rowSpan={2} className="border-r border-black font-bold px-2 py-1 text-center min-w-[200px]">Empregado</th>
                <th colSpan={2} className="border-r border-black font-bold px-2 py-1 text-center">2024</th>
                <th colSpan={2} className="border-r border-black font-bold px-2 py-1 text-center">2025</th>
                <th colSpan={2} className="border-r border-black font-bold px-2 py-1 text-center">2026</th>
                <th className="border-r border-black font-bold px-2 py-1 text-center min-w-[80px]">1ª opção</th>
                <th className="border-r border-black font-bold px-2 py-1 text-center min-w-[80px]">2ª opção</th>
                <th className="border-r border-black font-bold px-2 py-1 text-center min-w-[80px]">3ª opção</th>
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
                  <td colSpan={15} className="text-center py-10 text-muted font-medium bg-white">
                    Nenhum colaborador registrado na Equipe {activeTab}.
                  </td>
                </tr>
              ) : (
                colaboradoresCalculados.map((emp, i) => (
                  <tr key={emp.id} className="border-b border-black hover:bg-gray-50 transition-colors">
                    {/* Identificação */}
                    <td className="border-r border-black px-2 py-1.5 text-center text-foreground font-medium">
                      {renderEditableCell(emp.r3, emp.id, 'r3')}
                    </td>
                    <td className="border-r border-black px-2 py-1.5 text-left text-foreground font-medium whitespace-nowrap">
                      {renderEditableCell(emp.nome, emp.id, 'nome')}
                    </td>
                    
                    {/* Período */}
                    <td className={`border-r border-black px-2 py-1.5 text-center font-bold text-black ${!isEditing ? 'bg-[#00FF00]' : ''}`}>
                      {renderEditableCell(emp.periodoAquisitivo, emp.id, 'periodoAquisitivo')}
                    </td>
                    
                    {/* 2024 */}
                    <td className="border-r border-black px-2 py-1.5 text-center uppercase">
                      {renderEditableCell(emp.hist2024.mes, emp.id, 'hist2024.mes')}
                    </td>
                    <td className="border-r border-black px-2 py-1.5 text-center bg-gray-50">
                      {renderEditableCell(emp.hist2024.pontos, emp.id, 'hist2024.pontos', true, getPointsColor(emp.hist2024.pontos))}
                    </td>
                    
                    {/* 2025 */}
                    <td className="border-r border-black px-2 py-1.5 text-center uppercase">
                      {renderEditableCell(emp.hist2025.mes, emp.id, 'hist2025.mes')}
                    </td>
                    <td className="border-r border-black px-2 py-1.5 text-center bg-gray-50">
                      {renderEditableCell(emp.hist2025.pontos, emp.id, 'hist2025.pontos', true, getPointsColor(emp.hist2025.pontos))}
                    </td>

                    {/* 2026 */}
                    <td className="border-r border-black px-2 py-1.5 text-center uppercase">
                      {renderEditableCell(emp.hist2026.mes, emp.id, 'hist2026.mes')}
                    </td>
                    <td className="border-r border-black px-2 py-1.5 text-center bg-gray-50">
                      {renderEditableCell(emp.hist2026.pontos, emp.id, 'hist2026.pontos', true, getPointsColor(emp.hist2026.pontos))}
                    </td>

                    {/* Totais */}
                    <td className="border-r border-black px-2 py-1.5 text-center font-bold text-foreground bg-gray-100">
                      {emp.total}
                    </td>
                    <td className="border-r border-black px-2 py-1.5 text-center font-bold text-lg bg-gray-100">
                      {emp.prioridade}º
                    </td>

                    {/* Opcoes */}
                    {emp.opcoes.map((opt, idx) => (
                      <td key={idx} className={`border-r border-black px-2 py-1.5 text-center font-medium ${!isEditing ? getOptionColorClass(opt.color) : ''}`}>
                        {isEditing ? (
                          <div className="flex flex-col gap-1 w-full">
                            <input
                              type="text"
                              value={opt.mes}
                              onChange={(e) => handleUpdate(emp.id, `opcoes.${idx}.mes`, e.target.value)}
                              className="w-full bg-blue-50/50 border border-blue-200 outline-none px-1 py-0.5 text-center"
                              placeholder="Mês"
                            />
                            <select
                              value={opt.color}
                              onChange={(e) => handleUpdate(emp.id, `opcoes.${idx}.color`, e.target.value)}
                              className="w-full text-[9px] py-0.5 border outline-none"
                            >
                              <option value="white">Branco</option>
                              <option value="orange">Laranja</option>
                              <option value="blue">Azul</option>
                              <option value="yellow">Amarelo</option>
                              <option value="pink">Rosa</option>
                            </select>
                          </div>
                        ) : (
                          opt.mes
                        )}
                      </td>
                    ))}

                    <td className="border-r border-black px-2 py-1.5 text-center">
                      {renderEditableCell(emp.dataFerias, emp.id, 'dataFerias')}
                    </td>
                    <td className="px-2 py-1.5 text-left text-xs min-w-[150px]">
                      {renderEditableCell(emp.observacao, emp.id, 'observacao')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ferias;
