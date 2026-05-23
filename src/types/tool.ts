export type Pillar = 'Study' | 'Work' | 'Business';

export type Category = string;

export interface Tool {
  id: string;
  name: string;
  description: string;
  useCase?: string;
  url: string;
  pillar: Pillar;
  category: Category;
  tags?: string[];
  gifUrl?: string;
  icon?: string;
  isFavorite?: boolean;
}
