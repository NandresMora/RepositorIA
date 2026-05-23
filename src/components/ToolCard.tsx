import { ExternalLink, Star, Trash2, Info, Edit3 } from 'lucide-react';
import type { Tool } from '../types/tool';
import { motion } from 'framer-motion';

interface ToolCardProps {
  tool: Tool;
  onDelete?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onEdit?: (tool: Tool) => void;
}

/**
 * ToolCard Component
 * Displays individual technical assets with visual reference, metadata, and actions.
 * 
 * Features:
 * - Visual demonstration support (GIF/Image) with hover zoom.
 * - Pillar & Category badging with neon highlights.
 * - Action overlay for favorites and deletion.
 * - Detailed technical scope and direct link to repository.
 */
const ToolCard = ({ tool, onDelete, onToggleFavorite, onEdit }: ToolCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden hover:shadow-[0_0_20px_rgba(0,242,255,0.15)] hover:border-primary transition-all group flex flex-col h-full relative"
    >
      {/* Visual Reference (GIF/Image) */}
      <div className="relative h-40 overflow-hidden bg-surface-container-low border-b border-outline-variant/30">
        {tool.gifUrl ? (
          <img 
            src={tool.gifUrl} 
            alt={`${tool.name} demonstration`} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-container-low">
            <span className="text-primary font-geist text-4xl font-bold opacity-10 select-none tracking-tighter group-hover:opacity-20 transition-opacity">
              {tool.name.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        
        {/* Pillar & Category Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="inline-flex items-center rounded bg-primary/20 backdrop-blur-md px-2 py-0.5 text-[9px] font-bold text-primary uppercase tracking-widest font-geist border border-primary/30 shadow-[0_0_10px_rgba(0,242,255,0.2)]">
            {tool.pillar}
          </span>
          <span className="inline-flex items-center rounded bg-secondary/20 backdrop-blur-md px-2 py-0.5 text-[9px] font-bold text-secondary uppercase tracking-widest font-geist border border-secondary/30 shadow-[0_0_10px_rgba(188,19,254,0.2)]">
            {tool.category}
          </span>
        </div>

        {/* Action Buttons (Overlay) */}
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit?.(tool)}
            className="p-1.5 rounded bg-surface-container-lowest/80 backdrop-blur-sm border border-outline-variant text-on-surface-variant hover:text-secondary hover:border-secondary transition-all hover:scale-110"
            title="Edit Tool"
            aria-label={`Editar ${tool.name}`}
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onToggleFavorite?.(tool.id)}
            className={`p-1.5 rounded bg-surface-container-lowest/80 backdrop-blur-sm border border-outline-variant transition-all hover:scale-110 ${
              tool.isFavorite 
                ? 'text-primary drop-shadow-[0_0_5px_rgba(0,242,255,0.5)]' 
                : 'text-on-surface-variant hover:text-primary'
            }`}
            aria-label={tool.isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <Star className={`w-3.5 h-3.5 ${tool.isFavorite ? 'fill-primary' : ''}`} />
          </button>
          <button
            onClick={() => {
              if (window.confirm(`¿Estás seguro de eliminar ${tool.name}?`))
                onDelete?.(tool.id);
            }}
            className="p-1.5 rounded bg-surface-container-lowest/80 backdrop-blur-sm border border-outline-variant text-on-surface-variant hover:text-error hover:border-error transition-all hover:scale-110"
            aria-label={`Eliminar ${tool.name}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow relative z-10 bg-surface-container-lowest">
        <h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors mb-2 font-geist tracking-tight uppercase group-hover:drop-shadow-[0_0_5px_rgba(0,242,255,0.3)]">
          {tool.name}
        </h3>
        
        <p className="text-on-surface-variant text-xs leading-relaxed mb-4 line-clamp-2 font-geist">
          {tool.description}
        </p>

        {tool.useCase && (
          <div className="mt-auto mb-4 p-2.5 rounded bg-surface-container-low border border-outline-variant/30 flex gap-2 items-start group-hover:border-primary/20 transition-colors">
            <Info className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0 drop-shadow-[0_0_3px_rgba(0,242,255,0.5)]" />
            <p className="text-[10px] text-on-surface-variant font-medium leading-snug font-geist italic">
              {tool.useCase}
            </p>
          </div>
        )}
        
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg border border-primary/30 hover:bg-primary hover:text-on-primary transition-all group/btn active:scale-[0.98] font-geist hover:shadow-[0_0_15px_rgba(0,242,255,0.4)]"
        >
          Access Repository
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>

      {/* Subtle indicator bottom */}
      <div className={`h-1 w-full bg-primary shadow-[0_0_10px_rgba(0,242,255,0.5)] opacity-0 group-hover:opacity-100 transition-opacity ${tool.isFavorite ? 'opacity-100' : ''}`} />
    </motion.div>
  );
};

export default ToolCard;
