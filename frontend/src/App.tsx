import React, { createContext, useContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SupervisorSelector from './pages/SupervisorSelector';
import Dashboard from './pages/Dashboard';
import ColaboradoresTab from './pages/Colaboradores';
import PostosDeTrabalho from './pages/PostosDeTrabalho';
import Ferias from './pages/Ferias';
import Folgas from './pages/Folgas';
import Configuracoes from './pages/Configuracoes';
import Layout from './components/Layout';
import { supabase } from './lib/supabase';

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
  { id: '1', nome: 'LUCAS DOS SANTOS MORAIS', equipamento: 'RB4', numeroFolga: 2, registro: '48077-7', aniversario: '12/11' },
  { id: '2', nome: 'FLEWDSON CAMPOS DOS SANTOS', equipamento: 'RB4', numeroFolga: 4, registro: '44181-1', aniversario: '29/11' },
  { id: '3', nome: 'WILDSON JUNIO RODRIGUES DINIZ', equipamento: 'RB4', numeroFolga: 3, registro: '46554-7', aniversario: '20/10' },
  { id: '4', nome: 'TULYO FERREIRA SILVA NESCAU', equipamento: 'RB4', numeroFolga: 1, registro: '48290-6', aniversario: '06/04' },
  { id: '5', nome: 'JOÃO PAULO', equipamento: 'RB4', numeroFolga: 2, registro: '49270-7', aniversario: '29/05' },
  { id: '6', nome: 'ÍTALO MIRANDA DE RAMOS', equipamento: 'RB4', numeroFolga: 1, registro: '47508-2', aniversario: '15/10' },
  { id: '7', nome: 'ABNER LUCAS ALMEIDA PASSOS', equipamento: 'RB1', numeroFolga: 1, registro: '49185-7', aniversario: '25/01' },
  { id: '8', nome: 'TALES JACOB DE SOUZA', equipamento: 'RB1', numeroFolga: 1, registro: '48342-5', aniversario: '12/04' },
  { id: '9', nome: 'LETICIA DO CARMO FIALHO', equipamento: 'OUTRO', numeroFolga: 3, registro: '50153-1', aniversario: '16/02' },
  { id: '10', nome: 'RAFAEL HENRIQUE OLIVEIRA LINHARES', equipamento: 'RB1', numeroFolga: 4, registro: '46292-4', aniversario: '03/02' },
  { id: '11', nome: 'WILLIAM JUNIO SIMÕES', equipamento: 'LE1', numeroFolga: 2, registro: '44663-8', aniversario: '28/08' },
  { id: '12', nome: 'ISRAEL LUCAS FREITAS NUNES', equipamento: 'RB1', numeroFolga: 4, registro: '48227-8', aniversario: '28/06' },
  { id: '13', nome: 'DAVI FERREIRA LIMA', equipamento: 'RB1', numeroFolga: 4, registro: '49017-2', aniversario: '17/10' },
  { id: '14', nome: 'KELLEN YARA VIEIRA', equipamento: 'RB4', numeroFolga: 3, registro: '50003-8', aniversario: '05/12' },
  { id: '15', nome: 'RODRIGO CUNHA SOUZA', equipamento: 'LE1', numeroFolga: 1, registro: '43799-1', aniversario: '13/06' },
  { id: '16', nome: 'FERNANDA MORAIS VIRTUOSO', equipamento: 'LE1', numeroFolga: 3, registro: '49466-1', aniversario: '09/09' },
  { id: '17', nome: 'AMOS RAFAEL MARTINS DE ALMEIDA', equipamento: 'RB1', numeroFolga: 3, registro: '47531-4', aniversario: '26/09' },
  { id: '18', nome: 'JACQUELINE SILVA GARCIA', equipamento: 'RB4', numeroFolga: 4, registro: '49229-3', aniversario: '23/10' },
  { id: '19', nome: 'ALEXANDRE SILVA RODRIGUES', equipamento: 'RB1', numeroFolga: 2, registro: '48621-2', aniversario: '14/06' },
  { id: '20', nome: 'RODRIGO OLIVEIRA MOREIRA', equipamento: 'RB1', numeroFolga: 2, registro: '48232-8', aniversario: '22/10' },
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

export interface Colaborador {
  id: string;
  status: 'Ativo' | 'Férias';
  registro: string;
  nome: string;
  equipamento: 'RB1' | 'LE1' | 'RB4' | 'OUTRO';
  numeroFolga: string | number;
  aniversario: string;
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
  
  colaboradores: Colaborador[];
  setColaboradores: React.Dispatch<React.SetStateAction<Colaborador[]>>;
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
  colaboradores: [],
  setColaboradores: () => {},
});

export const useApp = () => useContext(AppContext);

const App: React.FC = () => {
  const [role, setRole] = useState<'SUPERVISOR' | 'COLABORADOR' | null>(null);
  const [supervisor, setSupervisor] = useState<Supervisor | null>(null);
  const [alocacoesPostos, setAlocacoesPostos] = useState<any>({});
  const [solicitacoesFerias, setSolicitacoesFerias] = useState<SolicitacaoFerias[]>([]);
  const [solicitacoesFolga, setSolicitacoesFolga] = useState<SolicitacaoFolga[]>([]);
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      // 1. Fetch Colaboradores
      let { data: colabs, error } = await supabase.from('colaboradores').select('*');
      
      // Auto-seed if database is empty to prevent breaking the UI
      if (colabs && colabs.length === 0) {
        const seedData = COLABORADORES_DB.map(c => ({
          nome: c.nome,
          registro: c.registro || '00000-0',
          equipamento: c.equipamento,
          status: 'Ativo',
          numero_folga: Number(c.numeroFolga),
          aniversario: c.aniversario || ''
        }));
        await supabase.from('colaboradores').insert(seedData);
        const res = await supabase.from('colaboradores').select('*');
        colabs = res.data;
      }
      
      if (colabs) {
        setColaboradores(colabs.map((c: any) => ({
          id: c.id,
          nome: c.nome,
          registro: c.registro,
          equipamento: c.equipamento,
          status: c.status,
          numeroFolga: c.numero_folga.toString(),
          aniversario: c.aniversario
        })));
      }
      
      // 2. Fetch Folgas
      const { data: folgas } = await supabase.from('solicitacoes_folga').select('*');
      if (folgas) {
        setSolicitacoesFolga(folgas.map((f: any) => ({
           id: f.id,
           colaboradorId: f.colaborador_id,
           nome: f.nome,
           turno: f.turno,
           equipamento: f.equipamento,
           data: f.data,
           status: f.status,
           motivo: f.motivo || ''
        })));
      }
      
      // 3. Fetch Ferias
      const { data: ferias } = await supabase.from('solicitacoes_ferias').select('*');
      if (ferias) {
        setSolicitacoesFerias(ferias.map((f: any) => ({
           id: f.id,
           colaboradorId: f.colaborador_id,
           nome: f.nome,
           turno: f.turno,
           equipamento: f.equipamento,
           mes: f.mes,
           status: f.status
        })));
      }
    };
    loadData();
  }, []);

  return (
    <AppContext.Provider value={{ 
      role, setRole,
      supervisor, setSupervisor,
      alocacoesPostos, setAlocacoesPostos,
      solicitacoesFerias, setSolicitacoesFerias,
      solicitacoesFolga, setSolicitacoesFolga,
      colaboradores, setColaboradores
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
            <Route path="/configuracoes" element={<Configuracoes />} />
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
