import type { Pillar } from "../types/tool";
import { toolsService, loadTools } from "./toolsService";

export interface CategoryGroup {
  id: string;
  name: string;
  icon: string;
  pillar: Pillar;
  description: string;
  toolCount?: number; // Opcional ya que se calcula dinámicamente
}

const STORAGE_KEY = 'categories_groups';

const defaultGroups: CategoryGroup[] = [
  {
    id: 'cat-1',
    name: 'LLM & AI',
    icon: 'psychology',
    pillar: 'Work',
    description: 'Modelos de lenguaje y herramientas de integración de IA.',
  },
  {
    id: 'cat-2',
    name: 'DevOps & CI/CD',
    icon: 'settings_suggest',
    pillar: 'Work',
    description: 'Automatización de infraestructura y tuberías de despliegue.',
  },
  {
    id: 'cat-3',
    name: 'Investigación Académica',
    icon: 'school',
    pillar: 'Study',
    description: 'Herramientas para el estudio teórico y documentación académica.',
  }
];

export const categoryService = {
  // Versión síncrona para carga inicial rápida si es necesario
  getAllSync: (): CategoryGroup[] => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let groups: CategoryGroup[];
    
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultGroups));
      groups = defaultGroups;
    } else {
      try {
        groups = JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing categories from localStorage", e);
        groups = defaultGroups;
      }
    }

    const tools = loadTools(); // Usamos loadTools() que es síncrono
    return groups.map(group => ({
      ...group,
      toolCount: tools.filter(t => t.category === group.name).length
    }));
  },

  getAll: async (): Promise<CategoryGroup[]> => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let groups: CategoryGroup[];
    
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultGroups));
      groups = defaultGroups;
    } else {
      try {
        groups = JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing categories from localStorage", e);
        groups = defaultGroups;
      }
    }

    const tools = await toolsService.getAll();
    return groups.map(group => ({
      ...group,
      toolCount: tools.filter(t => t.category === group.name).length
    }));
  },

  add: async (group: Omit<CategoryGroup, 'id' | 'toolCount'>): Promise<CategoryGroup> => {
    const groups = await categoryService.getAll();
    const newGroup: CategoryGroup = {
      ...group,
      id: `cat-${Date.now()}`,
    };
    const groupsToSave = [...groups, newGroup];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groupsToSave.map(({toolCount, ...rest}) => rest)));
    return newGroup;
  },

  delete: async (id: string): Promise<void> => {
    const groups = (await categoryService.getAll()).filter(g => g.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups.map(({toolCount, ...rest}) => rest)));
  }
};
