
import { GoogleGenAI, Type } from "@google/genai";
import { WeeklyPlan, Recipe } from "./types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    prepTime: { type: Type.STRING },
    cookTime: { type: Type.STRING },
    calories: { type: Type.STRING },
    difficulty: { type: Type.STRING },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          amount: { type: Type.STRING }
        },
        required: ["name", "amount"]
      }
    },
    steps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "极其详尽的分步说明，包含食材预处理、火候控制（大/中/小火）、精准时间、调味先后顺序等。"
    },
    tips: { type: Type.STRING },
    category: { type: Type.STRING }
  },
  required: ["title", "description", "ingredients", "steps", "category"]
};

const dailyPlanSchema = {
  type: Type.OBJECT,
  properties: {
    dayName: { type: Type.STRING },
    date: { type: Type.STRING },
    breakfast: { ...recipeSchema, nullable: true },
    lunch: { type: Type.ARRAY, items: recipeSchema },
    dinner: { type: Type.ARRAY, items: recipeSchema }
  },
  required: ["dayName", "lunch", "dinner"]
};

const weeklyPlanSchema = {
  type: Type.ARRAY,
  items: dailyPlanSchema
};

export const generateWeeklyPlan = async (): Promise<WeeklyPlan> => {
  const prompt = `
    作为一名专业的家庭营养师，请为家庭主妇生成一份【连续7天】的完整食谱计划（周一至周日）。
    
    规则要求：
    1. 烹饪说明极其重要：请提供非常详尽、分步骤的烹饪说明。
    2. 周一至周五早餐：10分钟内完成，适合小孩老人。
    3. 周六周日早餐：设置为 null。
    4. 午餐和晚餐：周一至五每餐3个菜；周末午餐丰盛（4-5个），周末晚餐简餐（炒饭/面）。
    5. 语言：中文。严格按JSON格式返回。
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: weeklyPlanSchema
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from Gemini");
  return JSON.parse(text.trim());
};

export const swapSingleRecipe = async (oldTitle: string, category: string): Promise<Recipe> => {
  const prompt = `
    我是一名家庭主妇，我不喜欢当前的这道菜：“${oldTitle}”。
    请为我推荐另一道同属于“${category}”类别的替代菜品。
    要求：
    1. 风格：简单易学，家常口味。
    2. 说明：提供极其详尽的分步烹饪说明（火候、时间、调料顺序）。
    3. 如果是早餐，请确保10分钟内能完成。
    4. 请返回一个新的Recipe对象，JSON格式。
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: recipeSchema
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from Gemini");
  return JSON.parse(text.trim());
};
