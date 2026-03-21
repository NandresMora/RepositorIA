import { useState } from 'react';
import { Box } from 'lucide-react';
import SugerirToolModal from './Sugerirtoolmodal';
import type { Tool } from '../types/tool';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onAgregarTool: (tool: Omit<Tool, "id">) => void;
}

const Navbar = ({ onAgregarTool }: NavbarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="border-b border-slate-800 bg-surface-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Box className="w-8 h-8 text-primary-400 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-slate-100 tracking-tight">RepositorIA</span>
          </Link>
          <div className="hidden sm:flex items-center gap-6">
            <Link 
              to="/" 
              className={`transition-colors font-medium ${
                location.pathname === '/' ? 'text-primary-400' : 'text-slate-400 hover:text-primary-400'
              }`}
            >
              Mi Repo
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors font-medium ${
                location.pathname === '/about' ? 'text-primary-400' : 'text-slate-400 hover:text-primary-400'
              }`}
            >
              Directorio
            </Link>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-500 transition-all shadow-lg shadow-primary-600/20 active:scale-95 text-sm"
            >
              Sugerir IA
            </button>
          </div>
        </div>
      </div>
      <SugerirToolModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={onAgregarTool}
      />
    </nav>
  );
};

export default Navbar;
