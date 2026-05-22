import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ToolCard from './components/ToolCard';
import SearchFilter from './components/SearchFilter';
import { toolsService } from './services/toolsService';
import { tools as initialTools } from './data/tools';
import type { Category, Tool, Pillar } from './types/tool';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SobreMiPage from './pages/about';
import CategoriesPage from './pages/CategoriesPage';
import { normalizeString } from './utils/stringUtils';
import { useEffect } from 'react';

function App() {
  // Cargar directamente desde el servicio para evitar el frame vacío
  const [tools, setTools] = useState<Tool[]>(() => {
    const saved = toolsService.getAll();
    return saved.length > 0 ? saved : initialTools;
  });

  const location = useLocation();

  // Refrescar herramientas cuando cambia la ubicación (por si se editaron en CategoriesPage)
  useEffect(() => {
    setTools([...toolsService.getAll()]);
  }, [location.pathname]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedPillar, setSelectedPillar] = useState<Pillar | 'All'>('All');

  const handleAgregarTool = (nuevaTool: Omit<Tool, "id">) => {
    toolsService.add(nuevaTool);
    setTools([...toolsService.getAll()]);
  };

  const handleEliminarTool = (id: string) => {
    toolsService.delete(id);
    setTools([...toolsService.getAll()]);
  };

  const handleToggleFavorite = (id: string) => {
    toolsService.toggleFavorite(id);
    setTools([...toolsService.getAll()]);
  };

  const filteredTools = useMemo(() => {
    const normalizedQuery = normalizeString(searchQuery);

    return tools.filter((tool) => {
      const matchesSearch = 
        normalizeString(tool.name).includes(normalizedQuery) ||
        normalizeString(tool.description).includes(normalizedQuery) ||
        (tool.useCase && normalizeString(tool.useCase).includes(normalizedQuery));
      
      const matchesCategory = 
        selectedCategory === 'All' || tool.category === selectedCategory;

      const matchesPillar = 
        selectedPillar === 'All' || tool.pillar === selectedPillar;

      return matchesSearch && matchesCategory && matchesPillar;
    });
  }, [tools, searchQuery, selectedCategory, selectedPillar]);

  const sortedTools = useMemo(() => {
    return [...filteredTools].sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return 0;
    });
  }, [filteredTools]);

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      <Navbar 
        onAgregarTool={handleAgregarTool} 
      />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
               

                {/* Contenedor del Filtro (Sin sticky) */}
                <div className="py-4 bg-background -mx-4 px-4 sm:mx-0 sm:px-0">
                  <SearchFilter 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedPillar={selectedPillar}
                    setSelectedPillar={setSelectedPillar}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                  <AnimatePresence mode="popLayout">
                    {sortedTools.map((tool) => (
                      <ToolCard 
                        key={tool.id} 
                        tool={tool} 
                        onDelete={handleEliminarTool}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {sortedTools.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <div className="text-slate-500 mb-4 flex justify-center">
                      <Search className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-200 mb-2">No se encontraron herramientas</h3>
                    <p className="text-slate-400">Intenta buscar con otros términos o cambia la categoría.</p>
                  </motion.div>
                )}
              </div>
            </>
          } />
          <Route path="/about" element={<SobreMiPage tools={tools} />} />
          <Route path="/categories" element={<CategoriesPage />} />
          {/* Ruta de respaldo para cualquier otra URL */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="border-t border-surface-variant bg-surface-container-low py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-secondary text-sm">
            <p>&copy; {new Date().getFullYear()} RepositorIA v1.0. Engineering Resource Management.</p>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-primary italic">Precision Engineered by Sinnexys.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
