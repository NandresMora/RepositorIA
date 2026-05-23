import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Upload, Trash2 } from 'lucide-react';   
import type { Category, Tool, Pillar } from '../types/tool';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { categoryService } from '../services/categoryService';

interface SugerirToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (tool: Omit<Tool, "id">) => void;
  editingTool?: Tool | null;
}

const PILLARS: Pillar[] = ['Work', 'Study', 'Business'];

const SugerirToolModal = ({ isOpen, onClose, onConfirm, editingTool }: SugerirToolModalProps) => {
  const isEditing = !!editingTool;
  const [categories, setCategories] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: '',
    url: '',
    pillar: 'Work' as Pillar,
    category: 'Other' as Category,
    description: '',
    useCase: '',
    gifUrl: '',
    tags: ''
  });

  const [enviado, setEnviado] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Cargar categorías basadas en el pilar seleccionado
  useEffect(() => {
    const fetchCategories = async () => {
      const allGroups = await categoryService.getAll();
      const pillarCategories = allGroups
        .filter(g => g.pillar === form.pillar)
        .map(g => g.name);
      
      setCategories(pillarCategories.length > 0 ? pillarCategories : ['Other']);
      
      // Si la categoría actual no pertenece al nuevo pilar, resetear a 'Other' o la primera disponible
      if (!pillarCategories.includes(form.category) && form.category !== 'Other') {
        setForm(prev => ({ ...prev, category: pillarCategories[0] || 'Other' }));
      }
    };
    fetchCategories();
  }, [form.pillar]);

  // Efecto para cargar datos al editar
  useEffect(() => {
    if (editingTool && isOpen) {
      setForm({
        name: editingTool.name,
        url: editingTool.url,
        pillar: editingTool.pillar,
        category: editingTool.category,
        description: editingTool.description,
        useCase: editingTool.useCase || '',
        gifUrl: editingTool.gifUrl || '',
        tags: editingTool.tags?.join(', ') || ''
      });
    } else if (!isOpen) {
      // Reset form when closing
      setForm({
        name: '',
        url: '',
        pillar: 'Work',
        category: 'Other',
        description: '',
        useCase: '',
        gifUrl: '',
        tags: ''
      });
      setErrors({});
      setEnviado(false);
    }
  }, [editingTool, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (form.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!form.url.trim()) {
      newErrors.url = 'La URL es obligatoria';
    } else {
      try {
        new URL(form.url);
      } catch (e) {
        newErrors.url = 'Debe ser una URL válida (ej: https://google.com)';
      }
    }

    if (!form.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (form.description.length < 10) {
      newErrors.description = 'La descripción debe ser más detallada (mín. 10 caracteres)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, gifUrl: 'La imagen debe ser menor a 2MB' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, gifUrl: reader.result as string }));
        if (errors.gifUrl) {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.gifUrl;
            return newErrors;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setForm(prev => ({ ...prev, gifUrl: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const toolData = {
        ...form,
        tags: form.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      };
      onConfirm(toolData);
      setEnviado(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-surface-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="relative bg-surface border border-outline-variant/30 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
          >
            <div className="px-8 py-8 text-on-surface relative flex-shrink-0">
              <button
                onClick={onClose}
                className="absolute top-8 right-8 p-1 text-on-surface-variant hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-geist">Gestión de Activos</p>
                <h2 className="text-xl font-bold font-geist tracking-tight uppercase">
                  {isEditing ? 'Modificar Activo Técnico' : 'Registro Unificado'}
                </h2>
                <p className="text-on-surface-variant text-[11px] font-medium opacity-60">
                  {isEditing 
                    ? 'Modifica los parámetros técnicos del activo seleccionado.' 
                    : 'Ayúdanos a expandir el repositorio de activos técnicos.'}
                </p>
              </div>
            </div>

            <div className="px-8 pb-10 overflow-y-auto flex-grow">
              {enviado ? (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2 font-geist uppercase tracking-tight">
                    {isEditing ? 'Actualización Exitosa' : 'Registro Exitoso'}
                  </h3>
                  <p className="text-on-surface-variant text-xs font-medium opacity-60">
                    {isEditing ? 'Los parámetros técnicos han sido actualizados.' : 'El activo ha sido integrado al repositorio.'}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Nombre del Activo</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="ej: Docker"
                        className={`w-full px-4 py-3 bg-surface-container-low border rounded-xl focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface placeholder-on-surface-variant/20 font-geist text-sm ${
                          errors.name ? 'border-red-500' : 'border-outline-variant/30'
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-[9px] mt-2 font-bold uppercase tracking-wider">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">URL de Referencia</label>
                      <input
                        type="text"
                        name="url"
                        value={form.url}
                        onChange={handleChange}
                        placeholder="https://..."
                        className={`w-full px-4 py-3 bg-surface-container-low border rounded-xl focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface placeholder-on-surface-variant/20 font-geist text-sm ${
                          errors.url ? 'border-red-500' : 'border-outline-variant/30'
                        }`}
                      />
                      {errors.url && <p className="text-red-500 text-[9px] mt-2 font-bold uppercase tracking-wider">{errors.url}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Dominio (Pillar)</label>
                      <div className="grid grid-cols-3 gap-2">
                        {PILLARS.map(p => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setForm(prev => ({ ...prev, pillar: p }))}
                            className={`py-2.5 rounded-lg border text-[9px] font-bold font-geist transition-all uppercase tracking-widest ${
                              form.pillar === p 
                                ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/20' 
                                : 'bg-surface-container-low border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
                            }`}
                          >
                            {p === 'Work' ? 'Trabajo' : p === 'Study' ? 'Estudio' : 'Negocios'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Unidad Estructural</label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer text-on-surface font-geist text-sm"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat} className="bg-surface">{cat}</option>
                        ))}
                        {!categories.includes('Other') && <option value="Other" className="bg-surface">Otro</option>}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Etiquetas Técnicas (Separadas por coma)</label>
                    <input
                      type="text"
                      name="tags"
                      value={form.tags}
                      onChange={handleChange}
                      placeholder="ej: React, TypeScript, Vite"
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface placeholder-on-surface-variant/20 font-geist text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Descripción Técnica</label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Utilidad principal..."
                        rows={3}
                        className={`w-full px-4 py-3 bg-surface-container-low border rounded-xl focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface placeholder-on-surface-variant/20 font-geist text-sm resize-none ${
                          errors.description ? 'border-red-500' : 'border-outline-variant/30'
                        }`}
                      />
                      {errors.description && <p className="text-red-500 text-[9px] mt-2 font-bold uppercase tracking-wider">{errors.description}</p>}
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Caso de Uso Específico</label>
                      <textarea
                        name="useCase"
                        value={form.useCase}
                        onChange={handleChange}
                        placeholder="Escenario de integración..."
                        rows={3}
                        className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface placeholder-on-surface-variant/20 font-geist text-sm resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest block">Identidad Visual</label>
                    
                    <div className="flex gap-6 items-center">
                      {form.gifUrl ? (
                        <div className="relative group w-24 h-24 rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container-low">
                          <img 
                            src={form.gifUrl} 
                            alt="Vista previa" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-surface-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={removeImage}
                              className="p-2 bg-red-500 text-white rounded-full transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label className={`flex-1 flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                          errors.gifUrl ? 'border-red-500 bg-red-500/5' : 'border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5'
                        }`}>
                          <Upload className="w-5 h-5 text-on-surface-variant mb-2" />
                          <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">Subir Imagen del Activo</p>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </label>
                      )}
                      
                      <div className="flex-1">
                        <p className="text-[10px] text-on-surface-variant font-medium opacity-50 leading-relaxed">
                          PNG, JPG o GIF. Máx 2MB.
                        </p>
                        {errors.gifUrl && (
                          <p className="text-red-500 text-[9px] font-bold uppercase tracking-wider mt-1">{errors.gifUrl}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex gap-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-6 py-4 border border-outline-variant/30 rounded-xl text-on-surface-variant font-bold font-geist text-[10px] uppercase tracking-widest hover:bg-surface-container-high transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-[2] px-6 py-4 bg-primary text-on-primary rounded-xl font-bold font-geist text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 transition-all"
                    >
                      {isEditing ? 'Confirmar Cambios' : 'Inicializar Activo'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SugerirToolModal;
