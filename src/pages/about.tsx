import { useState } from 'react';
import { ExternalLink, Search, Cpu, LayoutGrid, Tag } from 'lucide-react';
import type { Tool } from '../types/tool';
import { motion, AnimatePresence } from 'framer-motion';
import { normalizeString } from '../utils/stringUtils';

interface Props {
  tools: Tool[];
}

export default function MetricsPage({ tools }: Props) {
  const [search, setSearch] = useState('');

  const filtered = tools.filter(tool => {
    const normalizedQuery = normalizeString(search);
    return (
      normalizeString(tool.name).includes(normalizedQuery) ||
      normalizeString(tool.description).includes(normalizedQuery) ||
      normalizeString(tool.category).includes(normalizedQuery) ||
      normalizeString(tool.pillar).includes(normalizedQuery)
    );
  });

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center rounded bg-primary-600/10 border border-primary-500/20 px-3 py-1 text-[10px] font-bold font-mono uppercase tracking-[0.2em] text-primary-500 mb-6"
        >
          <Cpu className="mr-2 h-3.5 w-3.5" />
          <span>Technical Directory v1.0</span>
        </motion.div>
        <h1 className="text-4xl font-extrabold text-slate-100 mb-4 font-mono uppercase tracking-tight">System <span className="text-primary-600">Inventory</span></h1>
        <p className="text-slate-500 max-w-2xl mx-auto font-mono text-xs uppercase tracking-widest leading-relaxed">
          Full technical registry of cataloged tools, frameworks, and infrastructure assets.
        </p>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-surface-800/50 p-6 rounded-xl border border-slate-700/30">
        <div className="relative w-full md:max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500" />
          <input
            type="text"
            placeholder="FILTER BY COMPONENT, PILLAR OR TECH STACK..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-900 border border-slate-700 rounded text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary-600 transition-all font-mono text-[11px] uppercase tracking-wider"
          />
        </div>
        
        <div className="flex gap-8">
          <div className="text-center">
            <div className="text-xl font-bold text-slate-100 font-mono">{tools.length}</div>
            <div className="text-[9px] font-bold text-slate-600 font-mono uppercase tracking-widest">Total Assets</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary-500 font-mono">{new Set(tools.map(t => t.category)).size}</div>
            <div className="text-[9px] font-bold text-slate-600 font-mono uppercase tracking-widest">Modules</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-slate-100 font-mono">3</div>
            <div className="text-[9px] font-bold text-slate-600 font-mono uppercase tracking-widest">Pillars</div>
          </div>
        </div>
      </div>

      {/* Registry Table */}
      <div className="bg-surface-800 rounded-xl border border-slate-700/50 overflow-hidden shadow-2xl">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 px-8 py-4 bg-surface-900 border-b border-slate-700/50">
          <span className="col-span-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">UID</span>
          <span className="col-span-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Component Name</span>
          <span className="col-span-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Pillar Domain</span>
          <span className="col-span-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono text-center">Technical Category</span>
          <span className="col-span-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono text-right">Access</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-700/30">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center bg-surface-900/20"
              >
                <p className="text-slate-600 font-mono text-[10px] uppercase tracking-[0.3em]">No components found in current registry</p>
              </motion.div>
            ) : (
              filtered.map((tool, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={tool.id}
                  className="grid grid-cols-1 md:grid-cols-12 px-8 py-5 items-center hover:bg-primary-600/5 transition-all group border-l-2 border-l-transparent hover:border-l-primary-600"
                >
                  {/* UID */}
                  <span className="hidden md:block col-span-1 text-[10px] text-slate-600 font-mono">
                    #{String(index + 1).padStart(3, '0')}
                  </span>

                  {/* Name & Desc */}
                  <div className="col-span-12 md:col-span-4 flex items-center gap-4 mb-4 md:mb-0">
                    <div className="min-w-0">
                      <h3 className="text-slate-100 text-sm font-bold font-mono uppercase tracking-tight group-hover:text-primary-500 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-slate-500 text-[10px] line-clamp-1 mt-0.5">{tool.description}</p>
                    </div>
                  </div>

                  {/* Pillar */}
                  <div className="col-span-6 md:col-span-2">
                    <div className="flex items-center gap-2">
                      <LayoutGrid className="w-3 h-3 text-slate-700" />
                      <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">
                        {tool.pillar}
                      </span>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-span-6 md:col-span-3 flex md:justify-center">
                    <div className="flex items-center gap-2 px-3 py-1 rounded bg-surface-900 border border-slate-700/50">
                      <Tag className="w-3 h-3 text-primary-600" />
                      <span className="text-[9px] font-bold text-slate-300 font-mono uppercase tracking-wider">
                        {tool.category}
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="col-span-12 md:col-span-2 flex justify-end mt-4 md:mt-0">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] font-bold font-mono uppercase tracking-widest text-slate-400 hover:text-white bg-surface-900 border border-slate-700 hover:border-primary-600 px-4 py-2 rounded transition-all active:scale-95"
                    >
                      <span>Connect</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 flex justify-between items-center px-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600">
        <p>
          Showing <span className="text-primary-500 font-bold">{filtered.length}</span> of {tools.length} cataloged assets
        </p>
        <div className="flex gap-4">
          <span>System Status: Optimal</span>
          <span className="w-1 h-1 rounded-full bg-green-500 mt-1" />
        </div>
      </div>
    </main>
  );
}
