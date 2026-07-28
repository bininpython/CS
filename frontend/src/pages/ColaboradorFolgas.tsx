import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../App';

const ColaboradorFolgas: React.FC = () => {
  const { solicitacoesFolga, setSolicitacoesFolga } = useApp();
  
  // Form state
  const [nome, setNome] = useState('');
  const [turno, setTurno] = useState('TN');
  const [equipamento, setEquipamento] = useState('RB1');
  const [dataDesejada, setDataDesejada] = useState('');
  const [motivo, setMotivo] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

    </div>
  );
};

export default ColaboradorFolgas;
