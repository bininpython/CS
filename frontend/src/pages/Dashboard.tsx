import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-4">Painel Principal</h1>
      <p className="text-textSecondary">Visão geral da disponibilidade, capacitação e distribuição operacional das equipes.</p>
    </div>
  );
};

export default Dashboard;
