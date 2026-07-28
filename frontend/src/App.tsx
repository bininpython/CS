import React, { createContext, useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SupervisorSelector from './pages/SupervisorSelector';
import Dashboard from './pages/Dashboard';
import ColaboradoresTab from './pages/Colaboradores';
import PostosDeTrabalho from './pages/PostosDeTrabalho';
import Ferias from './pages/Ferias';
import Folgas from './pages/Folgas';
import Layout from './components/Layout';

// Colaborador Layout & Pages
import ColaboradorLayout from './components/ColaboradorLayout';
import ColaboradorPostos from './pages/ColaboradorPostos';
import ColaboradorFerias from './pages/ColaboradorFerias';
import ColaboradorFolgas from './pages/ColaboradorFolgas';

export interface Supervisor {
  id: number;
  name: string;
  turn: string;
  code: string;
}

export const SUPERVISORS: Supervisor[] = [
  { id: 1, name: 'Petrus', turn: 'Turno Noite', code: 'TN' },
  { id: 2, name: 'Axel', turn: 'Turno Manhã', code: 'TM' },
  { id: 3, name: 'Sávio', turn: 'Turno Tarde', code: 'TT' },
];

export const COLABORADORES_DB = [
  { id: '1', nome: 'LUCAS DOS SANTOS MORAIS', equipamento: 'RB4', numeroFolga: 2 },
  { id: '2', nome: 'FLEWDSON CAMPOS DOS SANTOS', equipamento: 'RB4', numeroFolga: 4 },
  { id: '3', nome: 'WILDSON JUNIO RODRIGUES DINIZ', equipamento: 'RB4', numeroFolga: 3 },
  { id: '4', nome: 'TULYO FERREIRA SILVA NESCAU', equipamento: 'RB4', numeroFolga: 1 },
  { id: '5', nome: 'JOÃO PAULO', equipamento: 'RB4', numeroFolga: 2 },
  { id: '6', nome: 'ÍTALO MIRANDA DE RAMOS', equipamento: 'RB4', numeroFolga: 1 },
  { id: '7', nome: 'ABNER LUCAS ALMEIDA PASSOS', equipamento: 'RB1', numeroFolga: 1 },
  { id: '8', nome: 'TALES JACOB DE SOUZA', equipamento: 'RB1', numeroFolga: 1 },
  { id: '9', nome: 'LETICIA DO CARMO FIALHO', equipamento: 'OUTRO', numeroFolga: 3 },
  { id: '10', nome: 'RAFAEL HENRIQUE OLIVEIRA LINHARES', equipamento: 'RB1', numeroFolga: 4 },
  { id: '11', nome: 'WILLIAM JUNIO SIMÕES', equipamento: 'LE1', numeroFolga: 2 },
  { id: '12', nome: 'ISRAEL LUCAS FREITAS NUNES', equipamento: 'RB1', numeroFolga: 4 },
  { id: '13', nome: 'DAVI FERREIRA LIMA', equipamento: 'RB1', numeroFolga: 4 },
  { id: '14', nome: 'KELLEN YARA VIEIRA', equipamento: 'RB4', numeroFolga: 3 },
  { id: '15', nome: 'RODRIGO CUNHA SOUZA', equipamento: 'LE1', numeroFolga: 1 },
  { id: '16', nome: 'FERNANDA MORAIS VIRTUOSO', equipamento: 'LE1', numeroFolga: 3 },
  { id: '17', nome: 'AMOS RAFAEL MARTINS DE ALMEIDA', equipamento: 'RB1', numeroFolga: 3 },
  { id: '18', nome: 'JACQUELINE SILVA GARCIA', equipamento: 'RB4', numeroFolga: 4 },
  { id: '19', nome: 'ALEXANDRE SILVA RODRIGUES', equipamento: 'RB1', numeroFolga: 2 },
  { id: '20', nome: 'RODRIGO OLIVEIRA MOREIRA', equipamento: 'RB1', numeroFolga: 2 },
];

export interface SolicitacaoFerias {
  id: string;
  colaboradorId: string;
  nome: string;
  turno: string;
  equipamento: string;
  mes: number; 
  status: 'Pendente' | 'Aprovado' | 'Recusado';
}

export interface SolicitacaoFolga {
  id: string;
  colaboradorId: string;
  nome: string;
  turno: string;
  equipamento: string;
  data: string;
  status: 'Pendente' | 'Aprovado' | 'Recusado';
}

interface AppContextType {
  role: 'SUPERVISOR' | 'COLABORADOR' | null;
  setRole: (r: 'SUPERVISOR' | 'COLABORADOR' | null) => void;
  supervisor: Supervisor | null;
  setSupervisor: (s: Supervisor | null) => void;
  
  alocacoesPostos: any;
  setAlocacoesPostos: React.Dispatch<React.SetStateAction<any>>;
  
  solicitacoesFerias: SolicitacaoFerias[];
  setSolicitacoesFerias: React.Dispatch<React.SetStateAction<SolicitacaoFerias[]>>;
  
  solicitacoesFolga: SolicitacaoFolga[];
  setSolicitacoesFolga: React.Dispatch<React.SetStateAction<SolicitacaoFolga[]>>;
}

export const AppContext = createContext<AppContextType>({
  role: null,
  setRole: () => {},
  supervisor: null,
  setSupervisor: () => {},
  alocacoesPostos: {},
  setAlocacoesPostos: () => {},
  solicitacoesFerias: [],
  setSolicitacoesFerias: () => {},
  solicitacoesFolga: [],
  setSolicitacoesFolga: () => {},
});

export const useApp = () => useContext(AppContext);

const App: React.FC = () => {
  const [role, setRole] = useState<'SUPERVISOR' | 'COLABORADOR' | null>(null);
  const [supervisor, setSupervisor] = useState<Supervisor | null>(null);
  const [alocacoesPostos, setAlocacoesPostos] = useState<any>({});
  const [solicitacoesFerias, setSolicitacoesFerias] = useState<SolicitacaoFerias[]>([]);
  const [solicitacoesFolga, setSolicitacoesFolga] = useState<SolicitacaoFolga[]>([]);

  return (
    <AppContext.Provider value={{ 
      role, setRole,
      supervisor, setSupervisor,
      alocacoesPostos, setAlocacoesPostos,
      solicitacoesFerias, setSolicitacoesFerias,
      solicitacoesFolga, setSolicitacoesFolga
    }}>
      <Routes>
        <Route path="/" element={<SupervisorSelector />} />
        
        {/* Rotas de Supervisor */}
        {role === 'SUPERVISOR' && supervisor ? (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/colaboradores" element={<ColaboradoresTab />} />
            <Route path="/postos-de-trabalho" element={<PostosDeTrabalho />} />
            <Route path="/ferias" element={<Ferias />} />
            <Route path="/folgas" element={<Folgas />} />
          </Route>
        ) : null}

        {/* Rotas de Colaborador */}
        {role === 'COLABORADOR' ? (
          <Route element={<ColaboradorLayout />}>
            <Route path="/colaborador/postos" element={<ColaboradorPostos />} />
            <Route path="/colaborador/ferias" element={<ColaboradorFerias />} />
            <Route path="/colaborador/folgas" element={<ColaboradorFolgas />} />
          </Route>
        ) : null}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
