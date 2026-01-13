
export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  calories: string;
  difficulty: '简单' | '中等' | '困难';
  ingredients: Ingredient[];
  steps: string[];
  tips: string;
  category: '早餐' | '午餐' | '晚餐' | '小零食';
}

export interface DailyPlan {
  dayName: string; // e.g., "周一"
  date: string;
  breakfast?: Recipe | null; // Breakfast is optional (none on weekends)
  lunch: Recipe[];    // Lunch can have multiple dishes
  dinner: Recipe[];   // Dinner can have multiple dishes
}

export type WeeklyPlan = DailyPlan[];
