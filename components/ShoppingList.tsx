
import React, { useMemo } from 'react';
import { DailyPlan } from '../types';
import { ShoppingBasket, CheckCircle2, Square } from 'lucide-react';

interface ShoppingListProps {
  plan: DailyPlan;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ plan }) => {
  const allIngredients = useMemo(() => {
    // Collect ingredients safely from breakfast (if exists), plus lunch and dinner
    const list = [
      ...(plan.breakfast ? plan.breakfast.ingredients : []),
      ...plan.lunch.flatMap(r => r.ingredients),
      ...plan.dinner.flatMap(r => r.ingredients)
    ];
    
    // Group by name
    const grouped = list.reduce((acc, curr) => {
      const name = curr.name.trim();
      if (!acc[name]) {
        acc[name] = curr.amount;
      } else {
        if (!acc[name].includes(curr.amount)) {
          acc[name] += ` + ${curr.amount}`;
        }
      }
      return acc;
    }, {} as Record<string, string>);

    return Object.entries(grouped);
  }, [plan]);

  return (
    <section className="bg-white rounded-[2.5rem] p-8 border border-orange-100 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
        <ShoppingBasket className="w-32 h-32" />
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 p-2.5 rounded-2xl text-white shadow-lg shadow-emerald-100">
            <ShoppingBasket className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-800">{plan.dayName} 采购清单</h3>
            <p className="text-xs text-gray-400">建议在早市一次性购齐以下食材</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-10">
        {allIngredients.length > 0 ? (
          allIngredients.map(([name, amount], idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 group cursor-pointer hover:bg-emerald-50/50 p-2 -ml-2 rounded-xl transition-colors"
            >
              <div className="flex-shrink-0 w-5 h-5 border-2 border-gray-100 rounded-lg flex items-center justify-center group-hover:border-emerald-300 transition-colors">
                <Square className="w-3 h-3 text-transparent group-hover:text-emerald-100" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-700 group-hover:text-emerald-600 transition-colors">
                  {name}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">{amount}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-sm text-gray-400 py-4">今天似乎不需要额外采购食材呢～</p>
        )}
      </div>

      <div className="mt-10 py-4 px-6 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        <p className="text-xs text-emerald-700 font-bold">
          所有食材均为菜场常用，建议早晨挑选最鲜活的。
        </p>
      </div>
    </section>
  );
};

export default ShoppingList;
