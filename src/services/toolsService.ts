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
  getAll: (): Tool[] => {
    return currentTools;
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

  toggleFavorite: (id: string): void => {
    currentTools = currentTools.map(tool => 
      tool.id === id ? { ...tool, isFavorite: !tool.isFavorite } : tool
    );
    saveTools(currentTools);
  }
};
