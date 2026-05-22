import { useState } from 'react';
import { Filter, LayoutGrid, Search, ChevronDown } from 'lucide-react';
import type { Category, Pillar } from '../types/tool';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category | 'All';
  setSelectedCategory: (category: Category | 'All') => void;
  selectedPillar: Pillar | 'All';
  setSelectedPillar: (pillar: Pillar | 'All') => void;
}

/**
 * SearchFilter Component
 * Provides a unified interface for filtering technical assets by domain (pillar),
 * technical category, and keyword search.
 * 
 * Features:
 * - Domain selection with accent colors.
 * - Hover-based dropdown for technical categories to minimize visual clutter.
 * - Real-time global search.
 */
const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedPillar,
  setSelectedPillar,
}: SearchFilterProps) => {
  const [isHoveringCategories, setIsHoveringCategories] = useState(false);

  const pillars: (Pillar | 'All')[] = ['All', 'Study', 'Work', 'Business'];
  
  const categories: (Category | 'All')[] = [
    'All', 'LLM', 'Coding', 'DevOps', 'Cloud Infrastructure', 
    'Automation', 'Testing/APIs', 'Design', 'Asset Generation', 
    'Diagrams', 'Productivity', 'Research', 'Academic', 
    'Business Intelligence', 'Image Generation', 'Audio/Video', 
    'AI Agents', 'Other',
  ];

  return (
    <section className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 mb-8 max-w-7xl mx-auto shadow-sm" aria-label="Technical filters">
      <div className="flex flex-col gap-10">
        
        {/* Top Controls: Pillars & Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Domain (Pillars) Selection */}
          <div className="flex flex-col gap-4">
            <header className="flex items-center gap-2 text-on-surface-variant/70">
              <LayoutGrid className="w-3.5 h-3.5 text-primary" />
              <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] font-geist">Engineering Pillars</h3>
            </header>
            <div className="flex flex-wrap gap-2">
              {pillars.map((pillar) => (
                <button
                  key={pillar}
                  onClick={() => setSelectedPillar(pillar)}
                  className={`px-5 py-2.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap font-geist uppercase tracking-widest border active:scale-[0.98] ${
                    selectedPillar === pillar
                      ? 'bg-primary/10 text-primary border-primary/30 shadow-[0_0_15px_rgba(0,242,255,0.1)]'
                      : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/20 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {pillar}
                </button>
              ))}
            </div>
          </div>

          {/* Technical Categories Dropdown (Hover-based) */}
          <div 
            className="flex flex-col gap-4 relative group"
            onMouseEnter={() => setIsHoveringCategories(true)}
            onMouseLeave={() => setIsHoveringCategories(false)}
          >
            <header className="flex items-center gap-2 text-on-surface-variant/70">
              <Filter className="w-3.5 h-3.5 text-secondary" />
              <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] font-geist">Technical Categories</h3>
            </header>
            
            {/* Dropdown Trigger Card */}
            <div className={`flex items-center justify-between px-5 py-3.5 bg-surface-container-lowest border rounded-xl cursor-default transition-all ${
              isHoveringCategories ? 'border-secondary/50 ring-1 ring-secondary/20' : 'border-outline-variant/20'
            }`}>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest font-geist text-on-surface">
                  {selectedCategory === 'All' ? 'Select Technical Unit' : selectedCategory}
                </span>
                {selectedCategory !== 'All' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                )}
              </div>
              <ChevronDown className={`w-4 h-4 text-on-surface-variant/50 transition-transform duration-300 ${isHoveringCategories ? 'rotate-180 text-secondary' : ''}`} />
            </div>

            {/* Dropdown Content */}
            <AnimatePresence>
              {isHoveringCategories && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 w-full mt-2 p-3 bg-surface-container-low border border-outline-variant/50 rounded-2xl shadow-2xl z-[60] grid grid-cols-2 sm:grid-cols-3 gap-1.5"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsHoveringCategories(false);
                      }}
                      className={`px-3 py-2.5 rounded-lg text-[9px] font-bold transition-all whitespace-nowrap font-geist uppercase tracking-wider text-left ${
                        selectedCategory === category
                          ? 'bg-secondary text-on-secondary shadow-lg shadow-secondary/20'
                          : 'text-on-surface-variant hover:bg-surface-container-high hover:text-secondary'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative pt-8 border-t border-outline-variant/20">
          <header className="flex items-center gap-2 text-on-surface-variant/70 mb-4">
            <Search className="w-3.5 h-3.5 text-primary" />
            <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] font-geist">Global Discovery</h3>
          </header>
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/30 w-5 h-5 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search assets by name, purpose or implementation case..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-on-surface placeholder-on-surface-variant/20 font-geist text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;
