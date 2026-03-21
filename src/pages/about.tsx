import { useState } from 'react';
import { ExternalLink, Search, Sparkles } from 'lucide-react';
import type { Tool } from '../types/tool';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  tools: Tool[];
}

const CATEGORY_COLORS: Record<string, string> = {
  'LLM': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  'Coding': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'DevOps': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Cloud/Deploy': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Automation': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Testing/APIs': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  'Design': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'Diagrams': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Productivity': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  'Research': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Image Generation': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Audio/Video': 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
  'Other': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

export default function SobreMiPage({ tools }: Props) {
  const [search, setSearch] = useState('');

  const filtered = tools.filter(tool =>
    tool.name.toLowerCase().includes(search.toLowerCase()) ||
    tool.description.toLowerCase().includes(search.toLowerCase()) ||
    tool.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section para la página About */}
      <div className="mb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold leading-6 text-primary-400 ring-1 ring-inset ring-primary-400/20 mb-4"
        >
          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
          <span>Repositorio de Herramientas</span>
        </motion.div>
        <h1 className="text-4xl font-bold text-slate-100 mb-4">Directorio Completo</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Gestiona y consulta todas tus plataformas favoritas desde una vista de lista rápida y optimizada.
        </p>
      </div>

      {/* Buscador */}
      <div className="relative mb-8 max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          type="text"
          placeholder="Filtrar por nombre, descripción o categoría..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-surface-800 border border-slate-700 rounded-2xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-xl"
        />
      </div>

      {/* Contenedor de la lista */}
      <div className="bg-surface-800 rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
        {/* Header de la tabla (solo Desktop) */}
        <div className="hidden md:grid grid-cols-12 px-6 py-4 bg-slate-900/50 border-b border-slate-700/50">
          <span className="col-span-1 text-xs font-bold text-slate-500 uppercase tracking-widest">#</span>
          <span className="col-span-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Herramienta</span>
          <span className="col-span-3 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Categoría</span>
          <span className="col-span-3 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Acción</span>
        </div>

        {/* Filas */}
        <div className="divide-y divide-slate-700/30">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <p className="text-slate-500 text-sm">No se encontraron herramientas que coincidan con tu búsqueda.</p>
              </motion.div>
            ) : (
              filtered.map((tool, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={tool.id}
                  className="grid grid-cols-1 md:grid-cols-12 px-6 py-4 items-center hover:bg-slate-700/20 transition-all group"
                >
                  {/* Número (Desktop) */}
                  <span className="hidden md:block col-span-1 text-xs text-slate-600 font-mono font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Info Principal */}
                  <div className="col-span-12 md:col-span-5 flex items-center gap-4 mb-4 md:mb-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600/20 to-primary-400/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-primary-400 text-sm font-black">
                        {tool.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-slate-100 text-base font-bold truncate group-hover:text-primary-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-slate-500 text-xs line-clamp-1">{tool.description}</p>
                    </div>
                  </div>

                  {/* Categoría */}
                  <div className="col-span-6 md:col-span-3 flex md:justify-center">
                    <span className={`text-[10px] px-3 py-1 rounded-lg border font-bold uppercase tracking-wider ${CATEGORY_COLORS[tool.category] ?? CATEGORY_COLORS['Other']}`}>
                      {tool.category}
                    </span>
                  </div>

                  {/* Acción */}
                  <div className="col-span-6 md:col-span-3 flex justify-end">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-bold text-primary-400 hover:text-white bg-primary-500/10 hover:bg-primary-600 px-4 py-2 rounded-lg transition-all active:scale-95"
                    >
                      <span>Abrir</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer contador */}
      <div className="mt-6 flex justify-between items-center px-2">
        <p className="text-xs text-slate-600">
          Mostrando <span className="text-slate-400 font-bold">{filtered.length}</span> de {tools.length} herramientas
        </p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs text-slate-500 hover:text-primary-400 font-bold transition-colors"
        >
          Volver arriba ↑
        </button>
      </div>
    </main>
  );
}
