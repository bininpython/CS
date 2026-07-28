import React, { useMemo, useState } from 'react';
import { Download } from 'lucide-react';

interface HistoricoAno {
  mes: string;
  pontos: number;
}

interface OpcaoFerias {
  mes: string;
  color: 'orange' | 'blue' | 'yellow' | 'pink' | 'white';
}

interface Empregado {
  r3: string;
  nome: string;
  periodoAquisitivo: string;
  hist2023: HistoricoAno;
  hist2024: HistoricoAno;
  hist2025: HistoricoAno;
  opcoes: [OpcaoFerias, OpcaoFerias, OpcaoFerias];
  dataFerias: string;
  observacao: string;
  equipe: 'RB1' | 'LE1' | 'RB4';
}

const DADOS_MOCK: Empregado[] = [
  // RB1
  { r3: '1009599', nome: 'RODRIGO OLIVEIRA MOREIRA', periodoAquisitivo: '16/11/2025', hist2023: { mes: 'MARÇO', pontos: 3 }, hist2024: { mes: 'MARÇO', pontos: 3 }, hist2025: { mes: 'MARÇO', pontos: 3 }, opcoes: [{ mes: 'Março', color: 'orange' }, { mes: 'Abril', color: 'white' }, { mes: 'Maio', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { r3: '1008593', nome: 'TALES JACOB DE SOUZA', periodoAquisitivo: '07/04/2026', hist2023: { mes: 'OUT', pontos: 10 }, hist2024: { mes: 'OUT', pontos: 10 }, hist2025: { mes: 'OUT', pontos: 10 }, opcoes: [{ mes: 'outubro', color: 'blue' }, { mes: 'novembro', color: 'white' }, { mes: 'dezembro', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { r3: '1011006', nome: 'ABNER LUCAS ALMEIDA PASSOS', periodoAquisitivo: '21/09/2026', hist2023: { mes: '--', pontos: 0 }, hist2024: { mes: 'JAN', pontos: 1 }, hist2025: { mes: 'DEZ', pontos: 3 }, opcoes: [{ mes: 'out', color: 'white' }, { mes: 'nov', color: 'white' }, { mes: 'dez', color: 'orange' }], dataFerias: '', observacao: 'Falta marcar SAP', equipe: 'RB1' },
  { r3: '1008459', nome: 'MARCONE FERREIRA GONÇALVES', periodoAquisitivo: '06/03/2026', hist2023: { mes: 'MAIO', pontos: 8 }, hist2024: { mes: 'JUNHO', pontos: 8 }, hist2025: { mes: 'MAIO', pontos: 8 }, opcoes: [{ mes: 'Maio', color: 'blue' }, { mes: 'Abril', color: 'white' }, { mes: 'Junho', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { r3: '1006816', nome: 'RAFAEL HENRIQUE LINHARES', periodoAquisitivo: '25/03/2026', hist2023: { mes: 'OUT', pontos: 10 }, hist2024: { mes: 'ABRIL', pontos: 6 }, hist2025: { mes: 'JULHO', pontos: 1 }, opcoes: [{ mes: 'AGOSTO', color: 'white' }, { mes: 'SETEMBRO', color: 'orange' }, { mes: '', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { r3: '1004388', nome: 'WILLIAM JUNIO SIMÕES', periodoAquisitivo: '02/01/2026', hist2023: { mes: 'ABR', pontos: 6 }, hist2024: { mes: 'JULHO', pontos: 1 }, hist2025: { mes: 'SET', pontos: 10 }, opcoes: [{ mes: 'Abril', color: 'yellow' }, { mes: 'Out', color: 'white' }, { mes: 'Dez', color: 'white' }], dataFerias: '', observacao: 'Falta marcar SAP', equipe: 'RB1' },
  { r3: '1009594', nome: 'ISRAEL LUCAS FREITAS NUNES', periodoAquisitivo: '16/11/2025', hist2023: { mes: 'FEV', pontos: 2 }, hist2024: { mes: 'AGO', pontos: 10 }, hist2025: { mes: 'AGOSTO', pontos: 10 }, opcoes: [{ mes: 'Agosto', color: 'orange' }, { mes: 'setembro', color: 'white' }, { mes: 'outubro', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { r3: '1007478', nome: 'LUCAS SILVA DE ASSIS CARVALHO', periodoAquisitivo: '28/08/2025', hist2023: { mes: 'FEV', pontos: 2 }, hist2024: { mes: 'FEV', pontos: 2 }, hist2025: { mes: 'FEV', pontos: 2 }, opcoes: [{ mes: 'Jan', color: 'blue' }, { mes: 'Fev', color: 'white' }, { mes: 'Dez', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },
  { r3: '1010784', nome: 'DAVI FERREIRA LIMA', periodoAquisitivo: '08/05/2026', hist2023: { mes: '--', pontos: 0 }, hist2024: { mes: 'SET', pontos: 10 }, hist2025: { mes: 'NOV', pontos: 10 }, opcoes: [{ mes: 'Novembro', color: 'yellow' }, { mes: 'Dezembro', color: 'white' }, { mes: 'Janeiro', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB1' },

  // RB4 (Dados do print RB3 mas com a tabulacao RB4 que o usuario definiu anteriormente)
  { r3: '1009384', nome: 'LUCAS DOS SANTOS MORAIS', periodoAquisitivo: '18/11/2025', hist2023: { mes: 'JUNHO', pontos: 8 }, hist2024: { mes: 'JULHO', pontos: 1 }, hist2025: { mes: 'MAIO', pontos: 8 }, opcoes: [{ mes: 'NOVEMBRO', color: 'white' }, { mes: 'MAIO', color: 'yellow' }, { mes: 'JUNHO', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { r3: '1004162', nome: 'FLEWDSON CAMPOS DOS SANTOS', periodoAquisitivo: '15/03/2025', hist2023: { mes: 'FEV', pontos: 2 }, hist2024: { mes: 'FEV', pontos: 2 }, hist2025: { mes: 'FEV', pontos: 2 }, opcoes: [{ mes: 'FEV', color: 'orange' }, { mes: '', color: 'white' }, { mes: '', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { r3: '1007155', nome: 'WILDSON JUNIOR RODRIGUES DINIZ', periodoAquisitivo: '11/06/2026', hist2023: { mes: 'AGOSTO', pontos: 10 }, hist2024: { mes: 'AGOSTO', pontos: 10 }, hist2025: { mes: 'AGOSTO', pontos: 10 }, opcoes: [{ mes: 'OUTUBRO', color: 'blue' }, { mes: 'MARÇO', color: 'white' }, { mes: 'FEVEREIRO', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { r3: '1009716', nome: 'TULYO FERREIRA SILVA NESCAU', periodoAquisitivo: '10/02/2026', hist2023: { mes: 'ABR', pontos: 6 }, hist2024: { mes: 'ABR', pontos: 6 }, hist2025: { mes: 'MARÇO', pontos: 3 }, opcoes: [{ mes: 'MARÇO', color: 'yellow' }, { mes: 'FEVEREIRO', color: 'white' }, { mes: '', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { r3: '1003960', nome: 'ANDRE WILIAN DA SILVA', periodoAquisitivo: '03/08/2025', hist2023: { mes: 'JAN', pontos: 1 }, hist2024: { mes: 'JAN', pontos: 1 }, hist2025: { mes: 'JAN', pontos: 1 }, opcoes: [{ mes: 'JANEIRO', color: 'blue' }, { mes: 'FEVEREIRO', color: 'white' }, { mes: 'MARÇO', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { r3: '1010020', nome: 'MARCO TULIO RAMOS COSTA', periodoAquisitivo: '08/09/2026', hist2023: { mes: 'OUT', pontos: 10 }, hist2024: { mes: 'NOV', pontos: 10 }, hist2025: { mes: 'DEZ', pontos: 3 }, opcoes: [{ mes: 'JANEIRO', color: 'white' }, { mes: 'MARÇO', color: 'white' }, { mes: 'FEVEREIRO', color: 'white' }], dataFerias: '', observacao: 'PERIODO AQUISITIVO PARA 2027', equipe: 'RB4' },
  { r3: '1008511', nome: 'ÍTALO MIRANDA DE RAMOS', periodoAquisitivo: '08/05/2025', hist2023: { mes: 'MAIO', pontos: 8 }, hist2024: { mes: 'DEZ', pontos: 3 }, hist2025: { mes: 'JULHO', pontos: 1 }, opcoes: [{ mes: 'DEZEMBRO', color: 'orange' }, { mes: 'JULHO', color: 'white' }, { mes: 'SETEMBRO', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },
  { r3: '1011066', nome: 'JACQUELINE SILVA GARCIA', periodoAquisitivo: '20/11/2025', hist2023: { mes: '-', pontos: 0 }, hist2024: { mes: '-', pontos: 0 }, hist2025: { mes: 'FEV', pontos: 2 }, opcoes: [{ mes: 'JUNHO', color: 'pink' }, { mes: 'MAIO', color: 'white' }, { mes: 'ABRIL', color: 'white' }], dataFerias: '', observacao: '', equipe: 'RB4' },

  // LE1
  { r3: '1011284', nome: 'VITTORIO ANGELO SERGIO', periodoAquisitivo: '19/04/2026', hist2023: { mes: '---', pontos: 0 }, hist2024: { mes: '---', pontos: 0 }, hist2025: { mes: 'OUT', pontos: 10 }, opcoes: [{ mes: 'ABRIL', color: 'white' }, { mes: 'SETEMBRO', color: 'orange' }, { mes: 'OUTUBRO', color: 'white' }], dataFerias: '', observacao: '', equipe: 'LE1' },
  { r3: '1003864', nome: 'RODRIGO CUNHA SOUZA', periodoAquisitivo: '17/02/2025', hist2023: { mes: 'MARÇO', pontos: 3 }, hist2024: { mes: 'MARÇO', pontos: 3 }, hist2025: { mes: '---', pontos: 0 }, opcoes: [{ mes: '', color: 'white' }, { mes: '', color: 'white' }, { mes: '', color: 'white' }], dataFerias: '', observacao: '', equipe: 'LE1' },
  { r3: '1011468', nome: 'FERNANDA MORAIS VIRTUOSO', periodoAquisitivo: '02/09/2025', hist2023: { mes: '---', pontos: 0 }, hist2024: { mes: '---', pontos: 0 }, hist2025: { mes: '---', pontos: 0 }, opcoes: [{ mes: 'JANEIRO', color: 'pink' }, { mes: 'FEVEREIRO', color: 'white' }, { mes: 'MARÇO', color: 'white' }], dataFerias: '', observacao: '', equipe: 'LE1' },
  { r3: '1010125', nome: 'ALEXANDRE SILVA RODRIGUES', periodoAquisitivo: '02/01/2026', hist2023: { mes: 'FEV', pontos: 2 }, hist2024: { mes: 'FEV', pontos: 2 }, hist2025: { mes: 'FEV', pontos: 2 }, opcoes: [{ mes: 'FEV', color: 'yellow' }, { mes: 'ABRIL', color: 'white' }, { mes: 'MAIO', color: 'white' }], dataFerias: '', observacao: '', equipe: 'LE1' },
];

const Ferias: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'RB1' | 'LE1' | 'RB4'>('RB1');

  // Cálculo de totais e prioridade por equipe
  const colaboradoresCalculados = useMemo(() => {
    // Passo 1: Filtrar por equipe e calcular totais
    let dados = DADOS_MOCK.filter(emp => emp.equipe === activeTab).map(emp => {
      const total = emp.hist2023.pontos + emp.hist2024.pontos + emp.hist2025.pontos;
      return { ...emp, total };
    });

    // Passo 2: Ordernar temporariamente por total (descendente) para determinar prioridades
    const sortedByTotal = [...dados].sort((a, b) => b.total - a.total);
    
    return dados.map(emp => {
      // Prioridade = posição no ranking ordenado + 1
      const prioridade = sortedByTotal.findIndex(s => s.total === emp.total && s.r3 === emp.r3) + 1;
      return { ...emp, prioridade };
    });
  }, [activeTab]);

  const getColorClass = (color: string) => {
    switch (color) {
      case 'orange': return 'bg-[#FF9900] text-white';
      case 'blue': return 'bg-[#3b82f6] text-white';
      case 'yellow': return 'bg-[#ffea00] text-black font-bold';
      case 'pink': return 'bg-[#ffcdd2] text-black'; // Representando a cor rosa/vermelho claro
      default: return 'bg-white text-foreground';
    }
  };

  return (
    <div className="flex flex-col h-full max-w-[100vw] overflow-x-hidden">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Banco de Dados - Histórico de Férias</h1>
          <p className="text-sm text-muted mt-0.5">Acompanhamento e priorização baseada em peso de histórico</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm text-foreground border border-border px-4 py-2 hover:bg-white transition-colors font-medium">
            <Download size={16} /> Exportar Excel
          </button>
        </div>
      </div>

      {/* Abas de Equipamentos */}
      <div className="bg-white border border-border mb-4 flex items-center overflow-x-auto flex-shrink-0">
        {['RB1', 'LE1', 'RB4'].map((equip) => (
          <button
            key={equip}
            onClick={() => setActiveTab(equip as any)}
            className={`px-8 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeTab === equip
                ? 'border-b-purple text-purple bg-purpleLight/30'
                : 'border-b-transparent text-muted hover:text-foreground hover:bg-background'
            }`}
          >
            EQUIPE {equip}
          </button>
        ))}
      </div>

      <div className="bg-white border border-border w-full flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full max-w-full">
          <table className="text-[10px] sm:text-xs border-collapse min-w-[1200px] w-full bg-white">
            <thead className="bg-gray-200">
              {/* ROW 1 */}
              <tr className="border-b border-gray-400">
                <th colSpan={2} className="border-r border-gray-400 font-semibold px-2 py-1 text-center bg-gray-300">Equipe {activeTab}</th>
                <th rowSpan={3} className="border-r border-gray-400 font-semibold px-4 py-1 text-center bg-gray-200 align-middle">Período<br/>Aquisitivo</th>
                <th colSpan={6} className="border-r border-gray-400 font-bold px-2 py-1 text-center bg-gray-300 text-sm">Banco de dados - Histórico</th>
                <th rowSpan={3} className="border-r border-gray-400 font-semibold px-2 py-1 text-center bg-gray-200 align-middle">Total de<br/>pontos</th>
                <th rowSpan={3} className="border-r border-gray-400 font-semibold px-2 py-1 text-center bg-gray-200 align-middle">Prioridade</th>
                <th colSpan={3} className="border-r border-gray-400 font-semibold px-2 py-1 text-center bg-gray-300">Opções para próxima férias</th>
                <th rowSpan={3} className="border-r border-gray-400 font-semibold px-4 py-1 text-center bg-gray-200 align-middle">Data das férias</th>
                <th rowSpan={3} className="border-r border-gray-400 font-semibold px-4 py-1 text-center bg-gray-200 align-middle">Observação</th>
              </tr>

              {/* ROW 2 */}
              <tr className="border-b border-gray-400">
                <th rowSpan={2} className="border-r border-gray-400 font-semibold px-2 py-1 text-center">R3</th>
                <th rowSpan={2} className="border-r border-gray-400 font-semibold px-2 py-1 text-center min-w-[200px]">Empregado</th>
                <th colSpan={2} className="border-r border-gray-400 font-semibold px-2 py-1 text-center">2023</th>
                <th colSpan={2} className="border-r border-gray-400 font-semibold px-2 py-1 text-center">2024</th>
                <th colSpan={2} className="border-r border-gray-400 font-semibold px-2 py-1 text-center">2025</th>
                <th className="border-r border-gray-400 font-semibold px-2 py-1 text-center">1ª opção</th>
                <th className="border-r border-gray-400 font-semibold px-2 py-1 text-center">2ª opção</th>
                <th className="border-r border-gray-400 font-semibold px-2 py-1 text-center">3ª opção</th>
              </tr>

              {/* ROW 3 */}
              <tr className="border-b border-gray-400">
                <th className="border-r border-gray-400 font-semibold px-2 py-1 text-center">Mês</th>
                <th className="border-r border-gray-400 font-semibold px-2 py-1 text-center">Pontos</th>
                <th className="border-r border-gray-400 font-semibold px-2 py-1 text-center">Mês</th>
                <th className="border-r border-gray-400 font-semibold px-2 py-1 text-center">Pontos</th>
                <th className="border-r border-gray-400 font-semibold px-2 py-1 text-center">Mês</th>
                <th className="border-r border-gray-400 font-semibold px-2 py-1 text-center">Pontos</th>
                <th className="border-r border-gray-400 font-semibold px-2 py-1 text-center bg-[#FF9900]/20">Mês</th>
                <th className="border-r border-gray-400 font-semibold px-2 py-1 text-center bg-gray-300">Mês</th>
                <th className="border-r border-gray-400 font-semibold px-2 py-1 text-center bg-[#FF9900]/20">Mês</th>
              </tr>
            </thead>
            
            <tbody>
              {colaboradoresCalculados.length === 0 ? (
                <tr>
                  <td colSpan={15} className="text-center py-10 text-muted font-medium bg-white">
                    Nenhum colaborador registrado na Equipe {activeTab} ainda.
                  </td>
                </tr>
              ) : (
                colaboradoresCalculados.map((emp, i) => (
                  <tr key={i} className="border-b border-gray-300 hover:bg-gray-50 transition-colors">
                    <td className="border-r border-gray-300 px-2 py-1.5 text-center text-foreground font-medium">{emp.r3}</td>
                    <td className="border-r border-gray-300 px-2 py-1.5 text-left text-foreground font-medium">{emp.nome}</td>
                    <td className="border-r border-gray-300 px-2 py-1.5 text-center font-bold bg-[#00FF00] text-black">
                      {emp.periodoAquisitivo}
                    </td>
                    
                    {/* 2023 */}
                    <td className="border-r border-gray-300 px-2 py-1.5 text-center uppercase">{emp.hist2023.mes}</td>
                    <td className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">{emp.hist2023.pontos}</td>
                    
                    {/* 2024 */}
                    <td className="border-r border-gray-300 px-2 py-1.5 text-center uppercase">{emp.hist2024.mes}</td>
                    <td className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">{emp.hist2024.pontos}</td>

                    {/* 2025 */}
                    <td className="border-r border-gray-300 px-2 py-1.5 text-center uppercase">{emp.hist2025.mes}</td>
                    <td className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">{emp.hist2025.pontos}</td>

                    {/* Totais */}
                    <td className="border-r border-gray-300 px-2 py-1.5 text-center font-bold text-foreground">
                      {emp.total}
                    </td>
                    <td className="border-r border-gray-300 px-2 py-1.5 text-center font-bold text-lg">
                      {emp.prioridade}º
                    </td>

                    {/* Opcoes */}
                    {emp.opcoes.map((opt, idx) => (
                      <td key={idx} className={`border-r border-gray-300 px-2 py-1.5 text-center font-medium ${getColorClass(opt.color)}`}>
                        {opt.mes}
                      </td>
                    ))}

                    <td className="border-r border-gray-300 px-2 py-1.5 text-center">{emp.dataFerias}</td>
                    <td className="border-r border-gray-300 px-2 py-1.5 text-left text-xs">{emp.observacao}</td>
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
