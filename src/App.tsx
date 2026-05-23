import { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ToolCard from './components/ToolCard';
import SearchFilter from './components/SearchFilter';
import { toolsService } from './services/toolsService';
import type { Category, Tool, Pillar } from './types/tool';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importación coherente de páginas
import DirectorioPage from './pages/Directorio';
import CategoriasPage from './pages/Categorias';

import SugerirToolModal from './components/Sugerirtoolmodal';
import { normalizeString } from './utils/stringUtils';

function App() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedPillar, setSelectedPillar] = useState<Pillar | 'All'>('All');
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Carga asíncrona inicial
  useEffect(() => {
    const fetchTools = async () => {
      setIsLoading(true);
      try {
        const data = await toolsService.getAll();
        setTools(data);
      } catch (error) {
        console.error("Error loading tools:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTools();
  }, []);

  const handleAgregarTool = async (nuevaTool: Omit<Tool, "id">) => {
    try {
      await toolsService.add(nuevaTool);
      const updated = await toolsService.getAll();
      setTools(updated);
    } catch (error) {
      console.error("Error adding tool:", error);
    }
  };

  const handleEliminarTool = async (id: string) => {
    try {
      await toolsService.delete(id);
      const updated = await toolsService.getAll();
      setTools(updated);
    } catch (error) {
      console.error("Error deleting tool:", error);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      await toolsService.toggleFavorite(id);
      const updated = await toolsService.getAll();
      setTools(updated);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleUpdateTool = async (id: string, updatedTool: Partial<Tool>) => {
    try {
      await toolsService.update(id, updatedTool);
      const updated = await toolsService.getAll();
      setTools(updated);
    } catch (error) {
      console.error("Error updating tool:", error);
    }
  };

  const handleEditTool = (tool: Tool) => {
    setEditingTool(tool);
    setIsModalOpen(true);
  };

  const handleConfirmModal = async (toolData: Omit<Tool, "id">) => {
    if (editingTool) {
      await handleUpdateTool(editingTool.id, toolData);
    } else {
      await handleAgregarTool(toolData);
    }
    setEditingTool(null);
    setIsModalOpen(false);
  };

  const filteredTools = useMemo(() => {
    if (!searchQuery && selectedCategory === 'All' && selectedPillar === 'All') return tools;
    
    const query = normalizeString(searchQuery).trim();
    
    return tools.filter((tool) => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesPillar = selectedPillar === 'All' || tool.pillar === selectedPillar;
      
      if (!matchesCategory || !matchesPillar) return false;
      if (!query) return true;

      const nameMatch = normalizeString(tool.name).includes(query);
      const categoryMatch = normalizeString(tool.category).includes(query);
      const descMatch = normalizeString(tool.description).includes(query);
      const useCaseMatch = tool.useCase && normalizeString(tool.useCase).includes(query);
      const tagsMatch = tool.tags?.some(tag => normalizeString(tag).includes(query));

      return nameMatch || categoryMatch || descMatch || useCaseMatch || tagsMatch;
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
        onOpenModal={() => {
          setEditingTool(null);
          setIsModalOpen(true);
        }}
      />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
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
                  {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="bg-surface-800 rounded-xl border border-slate-700/50 p-6 h-64 animate-pulse">
                        <div className="flex justify-between mb-4">
                          <div className="w-20 h-4 bg-slate-700 rounded"></div>
                          <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                        </div>
                        <div className="w-3/4 h-6 bg-slate-700 rounded mb-4"></div>
                        <div className="w-full h-12 bg-slate-700 rounded"></div>
                      </div>
                    ))
                  ) : (
                    <AnimatePresence mode="popLayout">
                      {sortedTools.map((tool) => (
                        <ToolCard 
                          key={tool.id} 
                          tool={tool} 
                          onDelete={handleEliminarTool}
                          onToggleFavorite={handleToggleFavorite}
                          onEdit={() => handleEditTool(tool)}
                        />
                      ))}
                    </AnimatePresence>
                  )}
                </div>

                {!isLoading && sortedTools.length === 0 && (
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
         
          
          <Route path="/directorio" element={<DirectorioPage tools={tools} onEdit={handleEditTool} onDelete={handleEliminarTool} />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <SugerirToolModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmModal}
        editingTool={editingTool}
      />

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
