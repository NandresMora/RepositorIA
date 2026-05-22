import React, { useState, useEffect } from 'react';
import { X, CheckCircle2,  Link as  Upload, Trash2 } from 'lucide-react';   
import type { Category, Tool, Pillar } from '../types/tool';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { categoryService } from '../services/categoryService';

interface SugerirToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (tool: Omit<Tool, "id">) => void;
  initialData?: Omit<Tool, "id">;
  isEditing?: boolean;
}

const PILLARS: Pillar[] = ['Study', 'Work', 'Business'];

const SugerirToolModal = ({ isOpen, onClose, onConfirm, initialData, isEditing }: SugerirToolModalProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [form, setForm] = useState(initialData || {
    name: '',
    url: '',
    pillar: 'Work' as Pillar,
    category: 'Other' as Category,
    description: '',
    useCase: '',
    gifUrl: ''
  });

  useEffect(() => {
    const allGroups = categoryService.getAll();
    const pillarCategories = allGroups
      .filter(g => g.pillar === form.pillar)
      .map(g => g.name);
    
    setCategories(pillarCategories.length > 0 ? pillarCategories : ['Other']);
  }, [form.pillar]);

  const [enviado, setEnviado] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form if initialData changes (e.g. when opening modal to edit a different tool)
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

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
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!/^https?:\/\/.*/.test(form.url)) {
      newErrors.url = 'URL must start with http:// or https://';
    }
    if (!form.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setErrors(prev => ({ ...prev, gifUrl: 'Image must be smaller than 2MB' }));
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
        pillar: 'Work',
        category: 'Other',
        description: '',
        useCase: '',
        gifUrl: ''
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
            className="fixed inset-0 bg-surface-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="relative bg-surface border border-outline-variant/30 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
          >
            {/* Header - Minimalist */}
            <div className="px-8 py-8 text-on-surface relative flex-shrink-0">
              <button
                onClick={handleClose}
                className="absolute top-8 right-8 p-1 text-on-surface-variant hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-geist">Asset Management</p>
                <h2 className="text-xl font-bold font-geist tracking-tight uppercase">
                  {isEditing ? 'Modify Technical Asset' : 'Unified Registry'}
                </h2>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 pb-10 overflow-y-auto flex-grow">
              {enviado ? (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-16 h-16 bg-tertiary/5 text-tertiary rounded-full flex items-center justify-center mb-6 border border-tertiary/10">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2 font-geist uppercase tracking-tight">
                    {isEditing ? 'Update Successful' : 'Registration Successful'}
                  </h3>
                  <p className="text-on-surface-variant text-xs font-medium opacity-60">
                    {isEditing ? 'The technical parameters have been updated.' : 'The asset has been integrated into the repository.'}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Info Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Asset Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Docker"
                        className={`w-full px-4 py-3 bg-surface-container-low border rounded-xl focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface placeholder-on-surface-variant/20 font-geist text-sm ${
                          errors.name ? 'border-error' : 'border-outline-variant/30'
                        }`}
                      />
                      {errors.name && <p className="text-error text-[9px] mt-2 font-bold uppercase tracking-wider">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Reference URL</label>
                      <input
                        type="text"
                        name="url"
                        value={form.url}
                        onChange={handleChange}
                        placeholder="https://..."
                        className={`w-full px-4 py-3 bg-surface-container-low border rounded-xl focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface placeholder-on-surface-variant/20 font-geist text-sm ${
                          errors.url ? 'border-error' : 'border-outline-variant/30'
                        }`}
                      />
                      {errors.url && <p className="text-error text-[9px] mt-2 font-bold uppercase tracking-wider">{errors.url}</p>}
                    </div>
                  </div>

                  {/* Hierarchy Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Pillar Domain</label>
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
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Structural Unit</label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer text-on-surface font-geist text-sm"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat} className="bg-surface">{cat}</option>
                        ))}
                        {!categories.includes('Other') && <option value="Other" className="bg-surface">Other</option>}
                      </select>
                    </div>
                  </div>

                  {/* Content Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Technical Description</label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Core utility..."
                        rows={3}
                        className={`w-full px-4 py-3 bg-surface-container-low border rounded-xl focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface placeholder-on-surface-variant/20 font-geist text-sm resize-none ${
                          errors.description ? 'border-error' : 'border-outline-variant/30'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Specific Use Case</label>
                      <textarea
                        name="useCase"
                        value={form.useCase}
                        onChange={handleChange}
                        placeholder="Integration scenario..."
                        rows={3}
                        className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface placeholder-on-surface-variant/20 font-geist text-sm resize-none"
                      />
                    </div>
                  </div>

                  {/* Visual Reference */}
                  <div className="space-y-4">
                    <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest block">Visual Identity</label>
                    
                    <div className="flex gap-6 items-center">
                      {form.gifUrl ? (
                        <div className="relative group w-24 h-24 rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container-low">
                          <img 
                            src={form.gifUrl} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-surface-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={removeImage}
                              className="p-2 bg-error text-on-error rounded-full transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label className={`flex-1 flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                          errors.gifUrl ? 'border-error bg-error/5' : 'border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5'
                        }`}>
                          <Upload className="w-5 h-5 text-on-surface-variant mb-2" />
                          <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">Upload Asset Image</p>
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
                          PNG, JPG or GIF. Max 2MB.
                        </p>
                        {errors.gifUrl && (
                          <p className="text-error text-[9px] font-bold uppercase tracking-wider mt-1">{errors.gifUrl}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 flex gap-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 px-6 py-4 border border-outline-variant/30 rounded-xl text-on-surface-variant font-bold font-geist text-[10px] uppercase tracking-widest hover:bg-surface-container-high transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-[2] px-6 py-4 bg-primary text-on-primary rounded-xl font-bold font-geist text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 transition-all"
                    >
                      {isEditing ? 'Commit Changes' : 'Initialize Asset'}
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
