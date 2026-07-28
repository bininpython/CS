import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../App';
import { INITIAL_DATA, MESES } from './Ferias';

const ColaboradorFerias: React.FC = () => {
  const { solicitacoesFerias, setSolicitacoesFerias } = useApp();
  
  // Form state
  const [nome, setNome] = useState('');
  const [turno, setTurno] = useState('TN');
  const [equipamento, setEquipamento] = useState('RB1');
  const [mesDesejado, setMesDesejado] = useState('1'); // Jan
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome) return;

    const novaSolicitacao = {
      id: Date.now().toString(),
      colaboradorId: 'colab-' + Date.now(), // mockup
      nome,
      turno,
      equipamento,
      mes: parseInt(mesDesejado),
      status: 'Pendente' as const
    };

    setSolicitacoesFerias([...solicitacoesFerias, novaSolicitacao]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setNome('');
  };

  // Tabela read-only filter
  const [activeTab, setActiveTab] = useState<'RB1' | 'LE1' | 'RB4'>('RB1');

  // Simplificando o cálculo para a view de colaborador
  const colaboradores = INITIAL_DATA.filter(emp => emp.equipe === activeTab).sort((a, b) => {
    const totalA = a.hist2024.pontos + a.hist2025.pontos + a.hist2026.pontos;
    const totalB = b.hist2024.pontos + b.hist2025.pontos + b.hist2026.pontos;
    return totalB - totalA;
  });

  const getOptionBadge = (mes: string, color: string) => {
    if (!mes) return <span className="text-gray-400">-</span>;
    let colorClasses = "bg-white text-black border border-gray-300";
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

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto space-y-8">
      
      {/* Formulário de Solicitação */}
      <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-xl font-bold text-black uppercase tracking-widest mb-2">Solicitar Férias</h2>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Preencha os dados para enviar a solicitação ao seu supervisor</p>
        
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
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black">Mês Desejado</label>
                <select value={mesDesejado} onChange={e => setMesDesejado(e.target.value)} className="border-2 border-black bg-white px-3 py-3 font-bold outline-none focus:bg-gray-50 uppercase">
                  {MESES.map((m, idx) => idx > 0 && (
                    <option key={idx} value={idx}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="w-full mt-2 bg-black text-white px-6 py-4 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors font-bold uppercase tracking-widest">
              <Send size={18} />
              Enviar Solicitação
            </button>
          </form>
        )}
      </div>

      {/* Visualização de Classificação */}
      <div className="bg-white border-2 border-black flex-1 flex flex-col min-h-[400px]">
        <div className="px-6 py-5 border-b-2 border-black bg-gray-50 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-sm font-bold text-black uppercase tracking-widest">Consulta de Planejamento</h2>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Verifique se sua data já está concorrida</p>
          </div>
          <div className="flex items-center gap-0 border-2 border-black">
            {['RB1', 'LE1', 'RB4'].map((equip) => (
              <button
                key={equip}
                onClick={() => setActiveTab(equip as any)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeTab === equip
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-100 border-x border-transparent'
                }`}
              >
                {equip}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="text-xs border-collapse w-full text-center">
            <thead className="bg-gray-100 border-b-2 border-black">
              <tr className="text-black font-bold uppercase">
                <th className="px-3 py-3 border-r-2 border-black text-left">Colaborador</th>
                <th className="px-3 py-3 border-r-2 border-black">Prioridade</th>
                <th className="px-2 py-3 border-r border-black">Opção 1</th>
                <th className="px-2 py-3 border-r border-black">Opção 2</th>
                <th className="px-2 py-3 border-r-2 border-black">Opção 3</th>
                <th className="px-3 py-3">Status / Data</th>
              </tr>
            </thead>
            <tbody>
              {colaboradores.map((emp, i) => (
                <tr key={emp.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-3 py-3 border-r-2 border-black text-left font-bold">{emp.nome}</td>
                  <td className="px-3 py-3 border-r-2 border-black font-bold text-base bg-black text-white">{i + 1}º</td>
                  
                  {emp.opcoes.map((opt, idx) => (
                    <td key={idx} className={`px-2 py-3 ${idx === 2 ? 'border-r-2 border-black' : 'border-r border-black'}`}>
                      {getOptionBadge(opt.mes, opt.color)}
                    </td>
                  ))}
                  
                  <td className="px-3 py-3 font-bold text-black">{emp.dataFerias || 'Aguardando'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default ColaboradorFerias;
