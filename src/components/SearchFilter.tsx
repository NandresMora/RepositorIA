import { Search, Filter } from 'lucide-react';
import type { Category } from '../types/tool';

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category | 'All';
  setSelectedCategory: (category: Category | 'All') => void;
}

const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: SearchFilterProps) => {
  const categories: (Category | 'All')[] = [
    'All',
    'LLM',
    'Coding',
    'DevOps',
    'Cloud/Deploy',
    'Automation',
    'Testing/APIs',
    'Design',
    'Diagrams',
    'Productivity',
    'Research',
    'Image Generation',
  ];

  return (
    <div className="bg-surface-800 p-6 rounded-2xl shadow-xl border border-slate-700/50 mb-12 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all text-slate-100 placeholder-slate-500 font-medium"
          />
        </div>
        
        <div className="flex items-start gap-3">
          <Filter className="text-slate-500 w-5 h-5 mt-2 flex-shrink-0" />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                    : 'bg-surface-700 text-slate-300 hover:bg-surface-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
