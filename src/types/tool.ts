export type Category = 
  | 'LLM' 
  | 'Image Generation' 
  | 'Coding' 
  | 'Productivity' 
  | 'Audio/Video' 
  | 'Design' 
  | 'Research' 
  | 'DevOps'
  | 'Testing/APIs'
  | 'Diagrams'
  | 'Automation'
  | 'Cloud/Deploy'
  | 'Other';

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: Category;
  icon?: string;
  isFavorite?: boolean;
}
