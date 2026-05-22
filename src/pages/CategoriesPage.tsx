import React, { useState, useEffect } from 'react';
import { Layers, School, Briefcase, Store, Lightbulb, Trash2, Edit3,     X as CloseIcon, Cpu, Globe, Search, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryService } from '../services/categoryService';
import { toolsService } from '../services/toolsService';
import type { CategoryGroup } from '../services/categoryService';
import type { Pillar, Tool } from '../types/tool';
import SugerirToolModal from '../components/Sugerirtoolmodal';

const CategoriesPage = () => {
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [activeTab, setActiveTab] = useState<'categories' | 'tools'>('categories');
  const [activeView, setActiveView] = useState<'all' | Pillar>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Tool Editing State
  const [isToolModalOpen, setIsToolModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [toolSearchQuery, setToolSearchQuery] = useState('');
  const [categorySearchQuery, setCategorySearchQuery] = useState('');

  const [form, setForm] = useState({
    name: '',
    icon: 'Layers',
    pillar: 'Work' as Pillar,
    description: ''
  });

  useEffect(() => {
    setGroups(categoryService.getAll());
    setTools(toolsService.getAll());
  }, []);

  const refreshData = () => {
    setGroups(categoryService.getAll());
    setTools(toolsService.getAll());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;
    
    if (editingId) {
      const updatedGroups = groups.map(g => g.id === editingId ? { ...g, ...form } : g);
      setGroups(updatedGroups);
      localStorage.setItem('categories_groups', JSON.stringify(updatedGroups.map(({toolCount, ...rest}) => rest)));
      setEditingId(null);
    } else {
      categoryService.add(form);
      setGroups(categoryService.getAll());
    }
    
    setForm({ name: '', icon: 'Layers', pillar: 'Work', description: '' });
    setShowForm(false);
  };

  const handleEdit = (group: CategoryGroup) => {
    setEditingId(group.id);
    setForm({
      name: group.name,
      icon: group.icon,
      pillar: group.pillar,
      description: group.description
    });
    setShowForm(true);
    setActiveTab('categories');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Eliminar esta categoría?')) {
      categoryService.delete(id);
      setGroups(categoryService.getAll());
      if (editingId === id) setEditingId(null);
    }
  };

  // Tool Handlers
  const handleEditTool = (tool: Tool) => {
    setEditingTool(tool);
    setIsToolModalOpen(true);
  };

  const handleDeleteTool = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta herramienta?')) {
      toolsService.delete(id);
      refreshData();
    }
  };

  const handleToolUpdate = (toolData: Omit<Tool, "id">) => {
    if (editingTool) {
      toolsService.update(editingTool.id, toolData);
      setIsToolModalOpen(false);
      setEditingTool(null);
      refreshData();
    }
  };

  const getPillarIcon = (pillar: Pillar, size = "w-4 h-4") => {
    switch (pillar) {
      case 'Study': return <School className={size} />;
      case 'Work': return <Briefcase className={size} />;
      case 'Business': return <Store className={size} />;
    }
  };

  const getCategoryIcon = (iconName: string) => {
    // Basic mapping or default to Layers
    const iconProps = { className: "w-5 h-5" };
    switch (iconName.toLowerCase()) {
      case 'psychology': return <Lightbulb {...iconProps} />;
      case 'settings':
      case 'settings_suggest': return <Cpu {...iconProps} />;
      case 'school': return <School {...iconProps} />;
      default: return <Layers {...iconProps} />;
    }
  };

  const filteredPillars = activeView === 'all' 
    ? (['Study', 'Work', 'Business'] as Pillar[])
    : [activeView];

  const filteredTools = tools.filter(t => 
    (activeView === 'all' || t.pillar === activeView) &&
    (t.name.toLowerCase().includes(toolSearchQuery.toLowerCase()) ||
     t.description.toLowerCase().includes(toolSearchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-1 max-w-container-max mx-auto w-full bg-background min-h-[calc(100vh-64px)]">
      {/* SideNavBar - Minimalist */}
      <aside className="hidden md:flex flex-col gap-6 p-8 w-64 bg-surface-container-low border-r border-outline-variant/30 shrink-0">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-geist">RepositorIA</p>
          <p className="text-xs font-bold text-on-surface uppercase tracking-tight font-geist">Engine</p>
        </div>
        
        <nav className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="px-2 text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 opacity-50">Management</p>
            <button 
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${
                activeTab === 'categories' 
                  ? 'bg-primary/5 text-primary' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest font-geist">Hierarchy</span>
            </button>
            <button 
              onClick={() => setActiveTab('tools')}
              className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${
                activeTab === 'tools' 
                  ? 'bg-primary/5 text-primary' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest font-geist">Assets</span>
            </button>
          </div>
          
          <div className="flex flex-col gap-1">
            <p className="px-2 text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 opacity-50">Domains</p>
            <button 
              onClick={() => setActiveView('all')}
              className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${
                activeView === 'all' 
                  ? 'text-on-surface bg-surface-container-high' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest font-geist">Global</span>
            </button>

            {(['Study', 'Work', 'Business'] as Pillar[]).map(pillar => {
              const isActive = activeView === pillar;
              const colorClass = pillar === 'Study' ? 'text-tertiary' : pillar === 'Work' ? 'text-primary' : 'text-secondary';
              const bgClass = pillar === 'Study' ? 'bg-tertiary/5' : pillar === 'Work' ? 'bg-primary/5' : 'bg-secondary/5';

              return (
                <button 
                  key={pillar}
                  onClick={() => setActiveView(pillar)}
                  className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${
                    isActive 
                      ? `${bgClass} ${colorClass}` 
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {getPillarIcon(pillar)}
                  <span className="text-[10px] font-bold uppercase tracking-widest font-geist">{pillar}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold text-on-surface mb-1 font-geist uppercase tracking-tight">
                {activeTab === 'categories' ? 'Technical Hierarchy' : 'Asset Inventory'}
              </h1>
              <p className="text-xs text-on-surface-variant font-medium opacity-60">
                {activeTab === 'categories' 
                  ? 'Define the structural pillars of the repository.' 
                  : 'Manage and optimize individual technical assets.'}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {activeTab === 'categories' && (
                <button 
                  onClick={() => {
                    setShowForm(!showForm);
                    setEditingId(null);
                    setForm({ name: '', icon: 'Layers', pillar: 'Work', description: '' });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
                >
                  <Plus className="w-4 h-4" />
                  New Category
                </button>
              )}
            </div>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === 'categories' ? (
              <motion.div 
                key="categories"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Form - Overlay style when active */}
                <AnimatePresence>
                  {showForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mb-12"
                    >
                      <div className="bg-surface-container-low border border-outline-variant/50 rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                          <h2 className="text-xs font-bold font-geist text-on-surface uppercase tracking-[0.2em] flex items-center gap-2">
                            {editingId ? <Edit3 className="w-4 h-4 text-secondary" /> : <Plus className="w-4 h-4 text-primary" />}
                            {editingId ? 'Edit Structural Unit' : 'Initialize New Unit'}
                          </h2>
                          <button onClick={() => setShowForm(false)} className="text-on-surface-variant hover:text-on-surface">
                            <CloseIcon className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                          <div className="space-y-6">
                            <div>
                              <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Unit Name</label>
                              <input 
                                value={form.name}
                                onChange={e => setForm({...form, name: e.target.value})}
                                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface font-geist" 
                                placeholder="e.g. Generative AI" 
                                type="text" 
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Icon Reference</label>
                                <select 
                                  value={form.icon}
                                  onChange={e => setForm({...form, icon: e.target.value})}
                                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary outline-none transition-all appearance-none text-on-surface font-geist cursor-pointer"
                                >
                                  <option value="Layers">Default</option>
                                  <option value="psychology">Brain/AI</option>
                                  <option value="settings">System/Settings</option>
                                  <option value="school">Academic</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Domain</label>
                                <select 
                                  value={form.pillar}
                                  onChange={e => setForm({...form, pillar: e.target.value as Pillar})}
                                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary outline-none transition-all appearance-none text-on-surface font-geist cursor-pointer"
                                >
                                  <option value="Study">Study</option>
                                  <option value="Work">Work</option>
                                  <option value="Business">Business</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-6">
                            <div>
                              <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Technical Purpose</label>
                              <textarea 
                                value={form.description}
                                onChange={e => setForm({...form, description: e.target.value})}
                                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface font-geist resize-none h-[124px]" 
                                placeholder="Brief technical scope..." 
                              />
                            </div>
                            <button className={`w-full py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98] ${
                              editingId ? 'bg-secondary text-on-secondary shadow-lg shadow-secondary/20' : 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                            }`} type="submit">
                              {editingId ? 'Commit Changes' : 'Initialize Unit'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* List Section - Ultra Clean */}
                <div className="space-y-12">
                  <div className="relative">
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant/30 w-4 h-4" />
                    <input 
                      type="text"
                      placeholder="Filter technical units..."
                      value={categorySearchQuery}
                      onChange={(e) => setCategorySearchQuery(e.target.value)}
                      className="w-full pl-8 py-4 bg-transparent border-b border-outline-variant/30 text-xs font-bold uppercase tracking-widest font-geist text-on-surface focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-10">
                    <AnimatePresence mode="popLayout">
                      {filteredPillars.map((pillarName) => {
                        const pillarGroups = groups.filter(g => 
                          g.pillar === pillarName && 
                          (g.name.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
                           g.description.toLowerCase().includes(categorySearchQuery.toLowerCase()))
                        );
                        if (pillarGroups.length === 0) return null;

                        const colorClass = pillarName === 'Study' ? 'text-tertiary' : pillarName === 'Work' ? 'text-primary' : 'text-secondary';

                        return (
                          <motion.div key={pillarName} layout className="space-y-4">
                            <div className="flex items-center gap-3 px-2">
                              <span className={`${colorClass} opacity-80`}>{getPillarIcon(pillarName, "w-3 h-3")}</span>
                              <h3 className={`text-[10px] font-bold font-geist uppercase tracking-[0.3em] ${colorClass}`}>{pillarName}</h3>
                              <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-1">
                              {pillarGroups.map((group) => (
                                <div key={group.id} className="group flex items-center justify-between p-4 rounded-xl hover:bg-surface-container-low transition-all">
                                  <div className="flex items-center gap-6">
                                    <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                                      {getCategoryIcon(group.icon)}
                                    </div>
                                    <div>
                                      <p className="text-xs font-bold text-on-surface font-geist uppercase tracking-tight group-hover:text-primary transition-all">{group.name}</p>
                                      <p className="text-[10px] text-on-surface-variant font-medium opacity-60 max-w-[400px] line-clamp-1">{group.description}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-6">
                                    <div className="text-right">
                                      <p className="text-[10px] font-bold text-on-surface font-geist">{group.toolCount}</p>
                                      <p className="text-[8px] font-bold text-on-surface-variant uppercase tracking-widest opacity-40">Assets</p>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                      <button onClick={() => handleEdit(group)} className="p-2 text-on-surface-variant hover:text-secondary transition-colors"><Edit3 className="w-4 h-4" /></button>
                                      <button onClick={() => handleDelete(group.id)} className="p-2 text-on-surface-variant hover:text-error transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="tools"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-12"
              >
                {/* Clean Tools Header */}
                <div className="relative">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant/30 w-4 h-4" />
                  <input 
                    type="text"
                    placeholder="Search asset inventory..."
                    value={toolSearchQuery}
                    onChange={(e) => setToolSearchQuery(e.target.value)}
                    className="w-full pl-8 py-4 bg-transparent border-b border-outline-variant/30 text-xs font-bold uppercase tracking-widest font-geist text-on-surface focus:border-primary outline-none transition-all"
                  />
                </div>

                {/* Ultra Clean Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {filteredTools.map((tool) => (
                      <motion.div 
                        key={tool.id}
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group bg-surface-container-low/50 hover:bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 transition-all"
                      >
                        <div className="flex gap-6 mb-6">
                          <div className="w-16 h-16 rounded-xl bg-surface-container-high border border-outline-variant/30 overflow-hidden flex-shrink-0 group-hover:border-primary/30 transition-all">
                            {tool.gifUrl ? (
                              <img src={tool.gifUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-primary/40 font-bold text-lg">
                                {tool.name.substring(0, 1).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h3 className="text-sm font-bold text-on-surface truncate font-geist uppercase tracking-tight group-hover:text-primary transition-all">
                                {tool.name}
                              </h3>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                <button onClick={() => handleEditTool(tool)} className="p-1.5 text-on-surface-variant hover:text-secondary"><Edit3 className="w-3.5 h-3.5" /></button>
                                <button onClick={() => handleDeleteTool(tool.id)} className="p-1.5 text-on-surface-variant hover:text-error"><Trash2 className="w-3.5 h-3.5" /></button>
                              </div>
                            </div>
                            <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-[0.15em] opacity-60 mb-3">
                              {tool.pillar} • {tool.category}
                            </p>
                            <p className="text-[11px] text-on-surface-variant font-medium line-clamp-2 leading-relaxed opacity-80">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Edit Tool Modal */}
      {isToolModalOpen && (
        <SugerirToolModal 
          isOpen={isToolModalOpen}
          onClose={() => {
            setIsToolModalOpen(false);
            setEditingTool(null);
          }}
          onConfirm={handleToolUpdate}
          initialData={editingTool || undefined}
          isEditing={!!editingTool}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
