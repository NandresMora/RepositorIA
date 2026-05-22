import type { Pillar } from "../types/tool";
import { toolsService } from "./toolsService";

export interface CategoryGroup {
  id: string;
  name: string;
  icon: string;
  pillar: Pillar;
  description: string;
  toolCount?: number; // Optional as it's calculated
}

const STORAGE_KEY = 'categories_groups';

const defaultGroups: CategoryGroup[] = [
  {
    id: 'cat-1',
    name: 'LLM & AI',
    icon: 'psychology',
    pillar: 'Work',
    description: 'Large Language Models and AI integration tools.',
  },
  {
    id: 'cat-2',
    name: 'DevOps & CI/CD',
    icon: 'settings_suggest',
    pillar: 'Work',
    description: 'Infrastructure automation and deployment pipelines.',
  },
  {
    id: 'cat-3',
    name: 'Academic Research',
    icon: 'school',
    pillar: 'Study',
    description: 'Tools for theoretical study and academic documentation.',
  }
];

export const categoryService = {
  getAll: (): CategoryGroup[] => {
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

    // Calculate dynamic toolCount
    const tools = toolsService.getAll();
    return groups.map(group => ({
      ...group,
      toolCount: tools.filter(t => t.category === group.name || (t as any).categoryId === group.id).length
    }));
  },

  add: (group: Omit<CategoryGroup, 'id' | 'toolCount'>): CategoryGroup => {
    const groups = categoryService.getAll();
    const newGroup: CategoryGroup = {
      ...group,
      id: `cat-${Date.now()}`,
    };
    groups.push(newGroup);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups.map(({toolCount, ...rest}) => rest)));
    return newGroup;
  },

  delete: (id: string): void => {
    const groups = categoryService.getAll().filter(g => g.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups.map(({toolCount, ...rest}) => rest)));
  }
};
