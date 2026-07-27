import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/select-supervisor');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-dark/40 blur-[150px] rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="w-full max-w-md p-8 bg-card/60 backdrop-blur-xl border border-border rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-lg mb-4">
            <span className="text-2xl font-bold text-white tracking-tighter">CS</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Controle Supervisão</h1>
          <p className="text-sm text-textSecondary mt-2">
            Gestão inteligente de equipes industriais
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">E-mail ou Matrícula</label>
            <input 
              type="text" 
              placeholder="ex: petrus@industria.com"
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-textSecondary">Senha</label>
              <a href="#" className="text-xs text-primary hover:text-primary-light transition-colors">Esqueceu?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="remember" className="rounded border-border bg-muted text-primary focus:ring-primary focus:ring-offset-background" />
            <label htmlFor="remember" className="ml-2 text-sm text-textSecondary">Manter conectado</label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
          >
            Acessar Plataforma
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
