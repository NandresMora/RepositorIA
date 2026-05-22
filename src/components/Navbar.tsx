import { useState } from 'react';
import { Plus } from 'lucide-react';
import SugerirToolModal from './Sugerirtoolmodal';
import type { Tool } from '../types/tool';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onAgregarTool: (tool: Omit<Tool, "id">) => void;
}

/**
 * Navbar Component
 * Provides global navigation and the primary entry point for adding new technical assets.
 * 
 * Links:
 * - Dashboard (Home)
 * - Category Engine (Structural Management)
 * - Technical Library (Documentation/About)
 */
const Navbar = ({ onAgregarTool }: NavbarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  return (
   <header className="w-full h-20 bg-surface border-b border-surface-variant flex items-center justify-between px-margin-desktop z-50 sticky top-0">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-bold text-primary font-geist ">
          RepositorIA <span className="text-secondary font-light"></span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`transition-colors text-sm font-medium font-geist ${
              location.pathname === '/' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-secondary hover:text-primary'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/categories" 
            className={`transition-colors text-sm font-medium font-geist ${
              location.pathname === '/categories' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-secondary hover:text-primary'
            }`}
          >
            Categorias
          </Link>
          <Link 
            to="/about" 
            className={`transition-colors text-sm font-medium font-geist ${
              location.pathname === '/about' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-secondary hover:text-primary'
            }`}
          >
            Library
          </Link>
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
       
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Tool
        </button>
      </div>

      <SugerirToolModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={onAgregarTool}
      />
    </header>
  );
};

export default Navbar;
