import {  Layout, Shield, Database } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';


interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar = ({ onOpenModal }: NavbarProps) => {
  const location = useLocation();

  return (
    <nav className="border-b border-slate-800 bg-surface-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/RepositorIA/logo.png" alt="Logo" className="h-13 w-auto" />
            <span className="text-xl font-bold text-slate-100 tracking-tight">RepositorIA</span>
          </Link>
          
          <div className="hidden sm:flex items-center gap-4">
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-bold uppercase tracking-wider ${
                location.pathname === '/' 
                  ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' 
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              Dashboard
            </Link>

            <Link 
              to="/categorias" 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-bold uppercase tracking-wider ${
                location.pathname === '/categorias' 
                  ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' 
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Categorias
            </Link>

            <Link 
              to="/directorio" 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-bold uppercase tracking-wider ${
                location.pathname === '/directorio' 
                  ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' 
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Directorio
            </Link>

            <div className="h-4 w-px bg-slate-800 mx-2" />

            <button 
              onClick={onOpenModal}
              className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Añadir IA
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
