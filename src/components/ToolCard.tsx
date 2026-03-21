import { ExternalLink, Star, Trash2 } from 'lucide-react';
import type { Tool } from '../types/tool';
import { motion } from 'framer-motion';

interface ToolCardProps {
  tool: Tool;
  onDelete?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

const ToolCard = ({ tool, onDelete, onToggleFavorite }: ToolCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="bg-surface-800 rounded-xl border border-slate-700/50 p-6 hover:shadow-2xl hover:shadow-primary-500/10 hover:border-primary-500/30 transition-all group flex flex-col justify-between h-full relative overflow-hidden"
    >
      {/* Background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="inline-flex items-center rounded-md bg-primary-500/10 px-2.5 py-1 text-xs font-semibold text-primary-400 ring-1 ring-inset ring-primary-400/20">
            {tool.category}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => onToggleFavorite?.(tool.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                tool.isFavorite 
                  ? 'text-yellow-500 bg-yellow-500/10' 
                  : 'text-slate-500 hover:text-yellow-500 hover:bg-yellow-500/10'
              }`}
            >
              <Star className={`w-4 h-4 ${tool.isFavorite ? 'fill-yellow-500' : ''}`} />
            </button>
            <button
              onClick={() => {
                if (window.confirm(`¿Estás seguro de eliminar ${tool.name}?`)) {
                  onDelete?.(tool.id);
                }
              }}
              className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-100 group-hover:text-primary-400 transition-colors mb-2">
          {tool.name}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
          {tool.description}
        </p>
      </div>
      
      <div className="relative z-10">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-surface-700 text-slate-200 font-bold rounded-lg hover:bg-primary-600 hover:text-white transition-all group/btn active:scale-[0.98] shadow-sm"
        >
          Visitar Sitio
          <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </motion.div>
  );
};

export default ToolCard;
