import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ToolCard from './components/ToolCard';
import SearchFilter from './components/SearchFilter';
import { toolsService } from './services/toolsService';
import type { Category, Tool } from './types/tool';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import SobreMiPage from './pages/about';

function App() {
  const [tools, setTools] = useState<Tool[]>(() => toolsService.getAll());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

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
    return tools.filter((tool) => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'All' || tool.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [tools, searchQuery, selectedCategory]);

  const sortedTools = useMemo(() => {
    return [...filteredTools].sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return 0;
    });
  }, [filteredTools]);

  return (
    <div className="min-h-screen bg-surface-900 text-slate-100 flex flex-col">
      <Navbar onAgregarTool={handleAgregarTool} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                {/* Contenedor Sticky para el Filtro */}
                <div className="sticky top-16 z-40 py-4 bg-surface-900/95 backdrop-blur-sm -mx-4 px-4 sm:mx-0 sm:px-0">
                  <SearchFilter 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
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
        </Routes>
      </main>

      <footer className="border-t border-slate-800 bg-surface-900 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} RepositorIA. Tu repositorio personal de herramientas de IA.</p>
            <p className="mt-2 text-xs font-medium text-primary-400/80 italic">Página creada por Sinnexys.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
