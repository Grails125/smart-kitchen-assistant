
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { generateWeeklyPlan, swapSingleRecipe } from './geminiService';
import { WeeklyPlan, Recipe, DailyPlan } from './types';
import RecipeModal from './components/RecipeModal';
import MealCard from './components/MealCard';
import ShoppingList from './components/ShoppingList';
import Header from './components/Header';
import { Loader2, RefreshCcw, CalendarDays, Coffee, Sun, Moon } from 'lucide-react';

const App: React.FC = () => {
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [swappingIds, setSwappingIds] = useState<Set<string>>(new Set());
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchPlan = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const plan = await generateWeeklyPlan();
      setWeeklyPlan(plan);
      const today = new Date().getDay();
      const adjustedIndex = today === 0 ? 6 : today - 1; 
      setActiveDayIndex(adjustedIndex);
    } catch (err) {
      console.error(err);
      setError("生成周食谱失败，请检查网络或重试。");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  const currentDayPlan = useMemo(() => {
    return weeklyPlan ? weeklyPlan[activeDayIndex] : null;
  }, [weeklyPlan, activeDayIndex]);

  const handleSwap = async (recipe: Recipe, mealType: 'breakfast' | 'lunch' | 'dinner', index?: number) => {
    if (!weeklyPlan) return;
    
    // Create a unique temporary ID if none exists for loading state
    const tempId = recipe.id || `${activeDayIndex}-${mealType}-${index ?? 0}`;
    setSwappingIds(prev => new Set(prev).add(tempId));

    try {
      const newRecipe = await swapSingleRecipe(recipe.title, recipe.category);
      
      const newWeeklyPlan = [...weeklyPlan];
      const dayPlan = { ...newWeeklyPlan[activeDayIndex] };

      if (mealType === 'breakfast') {
        dayPlan.breakfast = newRecipe;
      } else if (mealType === 'lunch') {
        dayPlan.lunch = [...dayPlan.lunch];
        dayPlan.lunch[index!] = newRecipe;
      } else if (mealType === 'dinner') {
        dayPlan.dinner = [...dayPlan.dinner];
        dayPlan.dinner[index!] = newRecipe;
      }

      newWeeklyPlan[activeDayIndex] = dayPlan;
      setWeeklyPlan(newWeeklyPlan);
    } catch (err) {
      console.error("Swap failed", err);
      alert("换菜失败，请重试");
    } finally {
      setSwappingIds(prev => {
        const next = new Set(prev);
        next.delete(tempId);
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fffcf9] pb-24">
      <Header />
      
      <div className="bg-white border-b border-orange-50 sticky top-[73px] z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex justify-between gap-2 overflow-x-auto pb-1 no-scrollbar">
            {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, idx) => (
              <button
                key={day}
                onClick={() => setActiveDayIndex(idx)}
                className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-bold transition-all ${
                  activeDayIndex === idx 
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-100 scale-105' 
                    : 'text-gray-400 hover:bg-orange-50 hover:text-orange-400'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 pt-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="relative">
              <Loader2 className="w-16 h-16 animate-spin text-orange-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <CalendarDays className="w-6 h-6 text-orange-300" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-700">正在为您定制详尽周食谱...</p>
              <p className="text-sm text-gray-400 mt-1">包含细致入微的火候指导，周末睡个懒觉吧</p>
            </div>
          </div>
        ) : error ? (
          <div className="p-8 bg-red-50 text-red-600 rounded-3xl border border-red-100 text-center shadow-inner">
            <p className="font-bold mb-2">出错了</p>
            <p className="text-sm opacity-80">{error}</p>
            <button onClick={fetchPlan} className="mt-4 px-6 py-2 bg-red-100 hover:bg-red-200 rounded-full text-xs font-bold transition-colors">重试一次</button>
          </div>
        ) : currentDayPlan && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            
            {currentDayPlan.breakfast ? (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-black text-gray-800 tracking-tight">活力早餐</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <MealCard 
                    label="早餐" 
                    recipe={currentDayPlan.breakfast} 
                    isSwapping={swappingIds.has(currentDayPlan.breakfast.id || `${activeDayIndex}-breakfast-0`)}
                    onClick={() => setSelectedRecipe(currentDayPlan.breakfast!)} 
                    onSwap={() => handleSwap(currentDayPlan.breakfast!, 'breakfast')}
                  />
                </div>
              </section>
            ) : (
              <section className="bg-gray-50/50 rounded-3xl p-6 border-2 border-dashed border-gray-100 text-center">
                <p className="text-sm text-gray-400 font-medium">周末早上好！主妇休息日，早餐请随意～☕️</p>
              </section>
            )}

            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                  <Sun className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-black text-gray-800 tracking-tight">丰盛午餐</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentDayPlan.lunch.map((recipe, idx) => (
                  <MealCard 
                    key={recipe.id || `${activeDayIndex}-lunch-${idx}`}
                    label={`午餐 ${idx + 1}`} 
                    recipe={recipe} 
                    isSwapping={swappingIds.has(recipe.id || `${activeDayIndex}-lunch-${idx}`)}
                    onClick={() => setSelectedRecipe(recipe)} 
                    onSwap={() => handleSwap(recipe, 'lunch', idx)}
                  />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                  <Moon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-black text-gray-800 tracking-tight">温馨晚餐</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentDayPlan.dinner.map((recipe, idx) => (
                  <MealCard 
                    key={recipe.id || `${activeDayIndex}-dinner-${idx}`}
                    label={`晚餐 ${idx + 1}`} 
                    recipe={recipe} 
                    isSwapping={swappingIds.has(recipe.id || `${activeDayIndex}-dinner-${idx}`)}
                    onClick={() => setSelectedRecipe(recipe)} 
                    onSwap={() => handleSwap(recipe, 'dinner', idx)}
                  />
                ))}
              </div>
            </section>

            <ShoppingList plan={currentDayPlan} />

            <div className="flex justify-center pt-8">
              <button 
                onClick={fetchPlan}
                className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl shadow-gray-200 hover:bg-black transition-all hover:-translate-y-1 active:scale-95"
              >
                <RefreshCcw className="w-5 h-5" />
                重新规划整周计划
              </button>
            </div>
          </div>
        )}
      </main>

      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
        />
      )}
    </div>
  );
};

export default App;
