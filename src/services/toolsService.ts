import { tools as initialTools } from "../data/tools";
import type { Tool } from "../types/tool";

const STORAGE_KEY = 'tools';

export const loadTools = (): Tool[] => {
  if (typeof window === 'undefined') return initialTools;
  
  const toolsJSON = localStorage.getItem(STORAGE_KEY);
  // Si no hay herramientas en localStorage, guardar las herramientas predeterminadas
  if (!toolsJSON) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTools));
    return initialTools;
  }
  try {
    return JSON.parse(toolsJSON);
  } catch (e) {
    console.error("Error parsing tools from localStorage", e);
    return initialTools;
  }
};

export const saveTools = (toolsToSave: Tool[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toolsToSave));
};

let currentTools: Tool[] = loadTools();

export const toolsService = {
  getAll(): Tool[] {
  const saved = loadTools(); // lo que hay en localStorage
  
  // Merge: toma los guardados + agrega los de initialTools que no existan
  const savedIds = new Set(saved.map(t => t.id));
  const newFromSource = initialTools.filter(t => !savedIds.has(t.id));
  
    if (newFromSource.length > 0) {
      const merged = [...saved, ...newFromSource];
      saveTools(merged); // persiste el merge
      return merged;
    }
  
  return saved;
  },

  add: (nuevoTool: Omit<Tool, "id">): Tool => {
    const tool: Tool = {
      ...nuevoTool,
      id: `tool-${Date.now()}`,
    };
    currentTools.push(tool);
    saveTools(currentTools);
    return tool;
  },

  delete: (id: string): void => {
    currentTools = currentTools.filter(tool => tool.id !== id);
    saveTools(currentTools);
  },

  update: (id: string, updatedTool: Partial<Tool>): Tool | undefined => {
    let foundTool: Tool | undefined;
    currentTools = currentTools.map(tool => {
      if (tool.id === id) {
        foundTool = { ...tool, ...updatedTool };
        return foundTool;
      }
      return tool;
    });
    if (foundTool) {
      saveTools(currentTools);
    }
    return foundTool;
  },

  toggleFavorite: (id: string): void => {
    currentTools = currentTools.map(tool => 
      tool.id === id ? { ...tool, isFavorite: !tool.isFavorite } : tool
    );
    saveTools(currentTools);
  }
};
