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
  async getAll(): Promise<Tool[]> {
    // Simulamos carga asíncrona de DB
    return new Promise((resolve) => {
      setTimeout(() => {
        const saved = loadTools();
        const savedIds = new Set(saved.map(t => t.id));
        const newFromSource = initialTools.filter(t => !savedIds.has(t.id));
        
        if (newFromSource.length > 0) {
          const merged = [...saved, ...newFromSource];
          saveTools(merged);
          currentTools = merged;
          resolve(merged);
        } else {
          currentTools = saved;
          resolve(saved);
        }
      }, 500); // Delay de red simulado
    });
  },

  async add(nuevoTool: Omit<Tool, "id">): Promise<Tool> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tool: Tool = {
          ...nuevoTool,
          id: `tool-${Date.now()}`,
        };
        currentTools = [...currentTools, tool];
        saveTools(currentTools);
        resolve(tool);
      }, 300);
    });
  },

  async delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        currentTools = currentTools.filter(tool => tool.id !== id);
        saveTools(currentTools);
        resolve();
      }, 300);
    });
  },

  async update(id: string, updatedTool: Partial<Tool>): Promise<Tool | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let found: Tool | undefined;
        currentTools = currentTools.map(tool => {
          if (tool.id === id) {
            found = { ...tool, ...updatedTool };
            return found;
          }
          return tool;
        });
        if (found) saveTools(currentTools);
        resolve(found);
      }, 300);
    });
  },

  async toggleFavorite(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        currentTools = currentTools.map(tool => 
          tool.id === id ? { ...tool, isFavorite: !tool.isFavorite } : tool
        );
        saveTools(currentTools);
        resolve();
      }, 200);
    });
  }
};
