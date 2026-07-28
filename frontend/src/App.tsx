import React, { createContext, useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SupervisorSelector from './pages/SupervisorSelector';
import Dashboard from './pages/Dashboard';
import Colaboradores from './pages/Colaboradores';
import PostosDeTrabalho from './pages/PostosDeTrabalho';
import Ferias from './pages/Ferias';
import Folgas from './pages/Folgas';
import Escalas from './pages/Escalas';
import Layout from './components/Layout';

export interface Supervisor {
  id: number;
  name: string;
  turn: string;
  code: string;
  timeStart: string;
  timeEnd: string;
  emoji: string;
}

export const SUPERVISORS: Supervisor[] = [
  { id: 1, name: 'Petrus', turn: 'Turno Noite', code: 'TN', timeStart: '22:00', timeEnd: '06:00', emoji: '🌙' },
  { id: 2, name: 'Axel', turn: 'Turno Manhã', code: 'TM', timeStart: '06:00', timeEnd: '14:00', emoji: '☀️' },
  { id: 3, name: 'Sávio', turn: 'Turno Tarde', code: 'TT', timeStart: '14:00', timeEnd: '22:00', emoji: '🌅' },
];

interface AppContextType {
  supervisor: Supervisor | null;
  setSupervisor: (s: Supervisor | null) => void;
}

export const AppContext = createContext<AppContextType>({
  supervisor: null,
  setSupervisor: () => {},
});

export const useApp = () => useContext(AppContext);

const App: React.FC = () => {
  const [supervisor, setSupervisor] = useState<Supervisor | null>(null);

  return (
    <AppContext.Provider value={{ supervisor, setSupervisor }}>
      <Routes>
        <Route path="/" element={<SupervisorSelector />} />
        {supervisor ? (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/colaboradores" element={<Colaboradores />} />
            <Route path="/postos-de-trabalho" element={<PostosDeTrabalho />} />
            <Route path="/escalas" element={<Escalas />} />
            <Route path="/ferias" element={<Ferias />} />
            <Route path="/folgas" element={<Folgas />} />
          </Route>
        ) : null}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
