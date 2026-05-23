import { useState, useMemo } from 'react';
import { Search, Cpu, AlertCircle, LayoutGrid, Tag, ExternalLink, Trash2 } from 'lucide-react';
import type { Tool } from '../types/tool';
import { motion, AnimatePresence } from 'framer-motion';
import { normalizeString } from '../utils/stringUtils';

interface Props {
  tools: Tool[];
  onEdit: (tool: Tool) => void;
  onDelete: (id: string) => void;
}

export default function DirectorioPage({ tools, onEdit, onDelete }: Props) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const query = normalizeString(search);
    return tools.filter(t => 
      normalizeString(t.name).includes(query) || 
      normalizeString(t.category).includes(query) ||
      (t.tags && t.tags.some(tag => normalizeString(tag).includes(query)))
    );
  }, [tools, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center rounded bg-primary-600/10 border border-primary-500/20 px-3 py-1 text-[10px] font-bold font-mono uppercase tracking-[0.2em] text-primary-500 mb-6"
        >
          <Cpu className="mr-2 h-3.5 w-3.5" />
          <span>Directorio Técnico v1.0</span>
        </motion.div>
        <h1 className="text-4xl font-extrabold text-slate-100 mb-4 font-mono uppercase tracking-tight">Inventario del <span className="text-primary-600">Sistema</span></h1>
        <p className="text-slate-500 max-w-2xl mx-auto font-mono text-xs uppercase tracking-widest leading-relaxed">
          Registro técnico completo de herramientas, frameworks y activos de infraestructura catalogados.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-surface-800/50 p-6 rounded-xl border border-slate-700/30">
        <div className="relative w-full md:max-w-xl">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${search ? 'text-primary-500' : 'text-slate-600'}`} />
          <input
            type="text"
            placeholder="FILTRAR POR COMPONENTE, DOMINIO O TECNOLOGÍA..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-900 border border-slate-700 rounded text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary-600 transition-all font-mono text-[11px] uppercase tracking-wider"
          />
        </div>
        
        <div className="flex gap-8">
          <div className="text-center">
            <div className="text-xl font-bold text-slate-100 font-mono">{tools.length}</div>
            <div className="text-[9px] font-bold text-slate-600 font-mono uppercase tracking-widest">Activos Totales</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary-500 font-mono">{new Set(tools.map(t => t.category)).size}</div>
            <div className="text-[9px] font-bold text-slate-600 font-mono uppercase tracking-widest">Módulos</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-slate-100 font-mono">3</div>
            <div className="text-[9px] font-bold text-slate-600 font-mono uppercase tracking-widest">Dominios</div>
          </div>
        </div>
      </div>

      {/* Registry Table */}
      <div className="bg-surface-800 rounded-xl border border-slate-700/50 overflow-hidden shadow-2xl min-h-[400px] flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-900 border-b border-slate-700/50">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">UID</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Componente</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Dominio</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono text-center">Categoría</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              <AnimatePresence mode="popLayout">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <AlertCircle className="w-10 h-10 text-slate-700" />
                        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em]">No se encontraron componentes en el registro</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((tool, index) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={tool.id} 
                      className="group hover:bg-primary-600/5 transition-all border-l-2 border-l-transparent hover:border-l-primary-600"
                    >
                      <td className="px-8 py-5">
                        <span className="text-[10px] text-slate-600 font-mono">#{String(index + 1).padStart(3, '0')}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="min-w-0">
                          <h3 className="text-slate-100 text-sm font-bold font-mono uppercase tracking-tight group-hover:text-primary-500 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-slate-500 text-[10px] line-clamp-1 mt-0.5">{tool.description}</p>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <LayoutGrid className="w-3 h-3 text-slate-700" />
                          <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">
                            {tool.pillar === 'Work' ? 'TRABAJO' : tool.pillar === 'Study' ? 'ESTUDIO' : 'NEGOCIOS'}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-900 border border-slate-700/50 group-hover:border-primary-600/30 transition-colors">
                          <Tag className="w-3 h-3 text-primary-600" />
                          <span className="text-[9px] font-bold text-slate-300 font-mono uppercase tracking-wider">
                            {tool.category}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded bg-surface-900 border border-slate-700 text-slate-400 hover:text-white hover:border-primary-600 transition-all active:scale-95"
                            title="Conectar"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => onEdit(tool)}
                            className="p-2 rounded bg-surface-900 border border-slate-700 text-slate-400 hover:text-primary-400 hover:border-primary-400 transition-all active:scale-95"
                            title="Editar Atributos"
                          >
                            <Cpu className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`¿Seguro que deseas eliminar ${tool.name}?`)) {
                                onDelete(tool.id);
                              }
                            }}
                            className="p-2 rounded bg-surface-900 border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-400 transition-all active:scale-95"
                            title="Eliminar Activo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
