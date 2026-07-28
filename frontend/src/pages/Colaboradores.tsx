import React, { useState } from 'react';
import { Download, Search, UserPlus, FileEdit } from 'lucide-react';

interface Colaborador {
  id: string;
  status: 'Ativo' | 'Férias';
  registro: string;
  nome: string;
  equipamento: 'RB1' | 'LE1' | 'RB4' | 'OUTRO';
  numeroFolga: string;
  aniversario: string;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const INITIAL_DATA: Colaborador[] = [
  { id: generateId(), status: 'Ativo', registro: '48077-7', nome: 'LUCAS DOS SANTOS MORAIS', equipamento: 'RB4', numeroFolga: '2', aniversario: '12/11' },
  { id: generateId(), status: 'Ativo', registro: '44181-1', nome: 'FLEWDSON CAMPOS DOS SANTOS', equipamento: 'RB4', numeroFolga: '4', aniversario: '29/11' },
  { id: generateId(), status: 'Ativo', registro: '46554-7', nome: 'WILDSON JUNIO RODRIGUES DINIZ', equipamento: 'RB4', numeroFolga: '3', aniversario: '20/10' },
  { id: generateId(), status: 'Ativo', registro: '48290-6', nome: 'TULYO FERREIRA SILVA NESCAU', equipamento: 'RB4', numeroFolga: '1', aniversario: '06/04' },
  { id: generateId(), status: 'Ativo', registro: '49270-7', nome: 'JOÃO PAULO', equipamento: 'RB4', numeroFolga: '2', aniversario: '29/05' },
  { id: generateId(), status: 'Ativo', registro: '47508-2', nome: 'ÍTALO MIRANDA DE RAMOS', equipamento: 'RB4', numeroFolga: '1', aniversario: '15/10' },
  { id: generateId(), status: 'Ativo', registro: '49185-7', nome: 'ABNER LUCAS ALMEIDA PASSOS', equipamento: 'RB1', numeroFolga: '1', aniversario: '25/01' },
  { id: generateId(), status: 'Ativo', registro: '48342-5', nome: 'TALES JACOB DE SOUZA', equipamento: 'RB1', numeroFolga: '1', aniversario: '12/04' },
  { id: generateId(), status: 'Ativo', registro: '50153-1', nome: 'LETICIA DO CARMO FIALHO', equipamento: 'OUTRO', numeroFolga: '3', aniversario: '16/02' },
  { id: generateId(), status: 'Ativo', registro: '46292-4', nome: 'RAFAEL HENRIQUE OLIVEIRA LINHARES', equipamento: 'RB1', numeroFolga: '4', aniversario: '03/02' },
  { id: generateId(), status: 'Ativo', registro: '44663-8', nome: 'WILLIAM JUNIO SIMÕES', equipamento: 'LE1', numeroFolga: '2', aniversario: '28/08' },
  { id: generateId(), status: 'Ativo', registro: '48227-8', nome: 'ISRAEL LUCAS FREITAS NUNES', equipamento: 'RB1', numeroFolga: '4', aniversario: '28/06' },
  { id: generateId(), status: 'Ativo', registro: '49017-2', nome: 'DAVI FERREIRA LIMA', equipamento: 'RB1', numeroFolga: '4', aniversario: '17/10' },
  { id: generateId(), status: 'Ativo', registro: '50003-8', nome: 'KELLEN YARA VIEIRA', equipamento: 'RB4', numeroFolga: '3', aniversario: '05/12' },
  { id: generateId(), status: 'Ativo', registro: '43799-1', nome: 'RODRIGO CUNHA SOUZA', equipamento: 'LE1', numeroFolga: '1', aniversario: '13/06' },
  { id: generateId(), status: 'Ativo', registro: '49466-1', nome: 'FERNANDA MORAIS VIRTUOSO', equipamento: 'LE1', numeroFolga: '3', aniversario: '09/09' },
  { id: generateId(), status: 'Ativo', registro: '47531-4', nome: 'AMOS RAFAEL MARTINS DE ALMEIDA', equipamento: 'RB1', numeroFolga: '3', aniversario: '26/09' },
  { id: generateId(), status: 'Ativo', registro: '49229-3', nome: 'JACQUELINE SILVA GARCIA', equipamento: 'RB4', numeroFolga: '4', aniversario: '23/10' },
  { id: generateId(), status: 'Ativo', registro: '48621-2', nome: 'ALEXANDRE SILVA RODRIGUES', equipamento: 'RB1', numeroFolga: '2', aniversario: '14/06' },
  { id: generateId(), status: 'Ativo', registro: '48232-8', nome: 'RODRIGO OLIVEIRA MOREIRA', equipamento: 'RB1', numeroFolga: '2', aniversario: '22/10' },
];

const Colaboradores: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dados] = useState<Colaborador[]>(INITIAL_DATA);

  const filteredData = dados.filter(emp => 
    emp.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.registro.includes(searchTerm)
  );

  return (
    <div className="flex flex-col h-full w-full min-w-0 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 flex-shrink-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-black uppercase tracking-widest">Colaboradores</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1 font-bold uppercase tracking-widest">Gestão de equipe e status</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 w-full md:w-auto">
          <div className="relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
            <input 
              type="text" 
              placeholder="BUSCAR COLABORADOR..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2 border-black pl-10 pr-4 py-3 text-xs font-bold uppercase tracking-widest outline-none focus:bg-gray-50 w-full sm:w-64 md:w-72 text-black placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold text-black bg-white border-2 border-black px-3 md:px-5 py-3 hover:bg-gray-100 transition-colors uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Download size={16} /> Exportar
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold text-white bg-black border-2 border-black px-3 md:px-5 py-3 hover:bg-gray-800 transition-colors uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <UserPlus size={16} /> Novo
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex-1 overflow-hidden flex flex-col bg-white">
        <div className="overflow-x-auto overflow-y-auto w-full max-h-[calc(100vh-180px)] border-2 border-black">
          <table className="text-xs sm:text-sm border-collapse w-full text-center bg-white min-w-[800px]">
            <thead className="sticky top-0 z-10 bg-gray-50 border-b-2 border-black">
              <tr className="text-black font-bold uppercase tracking-widest text-xs">
                <th className="px-4 py-4 border-r border-black w-28">Status</th>
                <th className="px-4 py-4 border-r border-black w-32">Registro</th>
                <th className="px-4 py-4 border-r border-black text-left min-w-[250px]">Nome Completo</th>
                <th className="px-4 py-4 border-r border-black w-32">Equipamento</th>
                <th className="px-4 py-4 border-r border-black w-32">Nº de Folga</th>
                <th className="px-4 py-4 border-r border-black w-32">Aniversário</th>
                <th className="px-4 py-4 w-16">Ações</th>
              </tr>
            </thead>
            
            <tbody className="text-black font-medium text-xs sm:text-sm">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500 bg-white">
                    Nenhum colaborador encontrado com "{searchTerm}".
                  </td>
                </tr>
              ) : (
                filteredData.map((emp) => (
                  <tr key={emp.id} className="border-b border-black hover:bg-gray-50 transition-colors group">
                    {/* Status */}
                    <td className="px-4 py-3 border-r border-black">
                      <span className={`inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold uppercase rounded-sm ${
                        emp.status === 'Ativo' ? 'bg-[#00FF00] text-black' : 'bg-yellow-300 text-black'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    
                    {/* Registro */}
                    <td className="px-4 py-3 border-r border-black font-bold text-gray-700">
                      {emp.registro}
                    </td>
                    
                    {/* Nome */}
                    <td className="px-4 py-3 border-r border-black text-left font-bold">
                      {emp.nome}
                    </td>

                    {/* Equipamento */}
                    <td className="px-4 py-3 border-r border-black font-bold">
                      {emp.equipamento}
                    </td>

                    {/* Nº Folga */}
                    <td className="px-4 py-3 border-r border-black font-bold text-base">
                      {emp.numeroFolga}
                    </td>

                    {/* Aniversário */}
                    <td className="px-4 py-3 border-r border-black font-bold">
                      {emp.aniversario}
                    </td>

                    {/* Ações */}
                    <td className="px-4 py-3 text-center bg-gray-50">
                      <button 
                        className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 transition-colors flex items-center justify-center mx-auto rounded-sm"
                        title="Editar Linha"
                      >
                        <FileEdit size={16} />
                      </button>
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

export default Colaboradores;
