import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Link as LinkIcon, FileText, Tag } from 'lucide-react';
import type { Category, Tool } from '../types/tool';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface SugerirToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (tool: Omit<Tool, "id">) => void;
}

const CATEGORIAS: Category[] = [
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
  'Audio/Video',
  'Other'
];

const SugerirToolModal = ({ isOpen, onClose, onConfirm }: SugerirToolModalProps) => {
  const [form, setForm] = useState({
    name: '',
    url: '',
    category: 'Other' as Category,
    description: ''
  });

  const [enviado, setEnviado] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!form.url.trim()) {
      newErrors.url = 'La URL es obligatoria';
    } else if (!/^https?:\/\/.*/.test(form.url)) {
      newErrors.url = 'La URL debe comenzar con http:// o https://';
    }
    if (!form.description.trim()) newErrors.description = 'La descripción es obligatoria';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onConfirm(form);
      setEnviado(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setEnviado(false);
      setForm({
        name: '',
        url: '',
        category: 'Other',
        description: ''
      });
      setErrors({});
    }, 300);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-surface-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden my-auto border border-slate-700/50 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-primary-600 px-6 py-6 text-white relative flex-shrink-0">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold">Sugerir Herramienta</h2>
              </div>
              <p className="text-primary-100 text-sm">Ayúdanos a expandir el repositorio de IAs para devs.</p>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-grow bg-surface-800">
              {enviado ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">¡Sugerencia enviada!</h3>
                  <p className="text-slate-400">Gracias por tu contribución. Revisaremos la herramienta pronto.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Nombre */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-1.5">
                      <Sparkles className="w-4 h-4 text-primary-400" />
                      Nombre de la herramienta
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ej: v0.dev"
                      className={`w-full px-4 py-2.5 bg-surface-900/50 border rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all text-slate-100 placeholder-slate-600 ${
                        errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.name}</p>}
                  </div>

                  {/* URL + Categoría */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-1.5">
                        <LinkIcon className="w-4 h-4 text-primary-400" />
                        URL del sitio
                      </label>
                      <input
                        type="text"
                        name="url"
                        value={form.url}
                        onChange={handleChange}
                        placeholder="https://..."
                        className={`w-full px-4 py-2.5 bg-surface-900/50 border rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all text-slate-100 placeholder-slate-600 ${
                          errors.url ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'
                        }`}
                      />
                      {errors.url && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.url}</p>}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-1.5">
                        <Tag className="w-4 h-4 text-primary-400" />
                        Categoría
                      </label>
                      <div className="relative">
                        <select
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-surface-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all appearance-none cursor-pointer text-slate-100"
                        >
                          {CATEGORIAS.map(cat => (
                            <option key={cat} value={cat} className="bg-surface-800">{cat}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                          <Tag className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-1.5">
                      <FileText className="w-4 h-4 text-primary-400" />
                      Descripción corta
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="¿Para qué sirve esta herramienta?"
                      rows={3}
                      className={`w-full px-4 py-2.5 bg-surface-900/50 border rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none text-slate-100 placeholder-slate-600 ${
                        errors.description ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'
                      }`}
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.description}</p>}
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-500 transition-all shadow-lg shadow-primary-600/20 active:scale-[0.98]"
                    >
                      Enviar Sugerencia
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
