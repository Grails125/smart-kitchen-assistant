
import React from 'react';
import { Recipe } from '../types';
import { Clock, Flame, ChevronRight, Sparkles, RefreshCcw, Loader2 } from 'lucide-react';

interface MealCardProps {
  label: string;
  recipe: Recipe;
  isSwapping?: boolean;
  onClick: () => void;
  onSwap: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ label, recipe, isSwapping, onClick, onSwap }) => {
  const isBreakfast = recipe.category === '早餐' || label.includes('早餐');

  const handleSwapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSwap();
  };

  return (
    <div 
      onClick={isSwapping ? undefined : onClick}
      className={`bg-white rounded-3xl p-5 shadow-sm border border-orange-50 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden ${
        isSwapping ? 'opacity-70 grayscale' : 'hover:shadow-xl hover:border-orange-200'
      }`}
    >
      {isBreakfast && (
        <div className="absolute -right-2 -top-2 bg-yellow-400/10 p-4 rounded-full">
          <Sparkles className="w-8 h-8 text-yellow-500/20 rotate-12" />
        </div>
      )}

      {/* Loading Overlay for swapping */}
      {isSwapping && (
        <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-sm flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
          isBreakfast ? 'bg-yellow-50 text-yellow-600' : 'bg-orange-50 text-orange-500'
        }`}>
          {label}
        </span>
        
        <button 
          onClick={handleSwapClick}
          disabled={isSwapping}
          className="p-1.5 rounded-full bg-gray-50 text-gray-400 hover:bg-orange-50 hover:text-orange-500 transition-colors z-20"
          title="不喜欢，换一道"
        >
          <RefreshCcw className={`w-3.5 h-3.5 ${isSwapping ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <h3 className="text-md font-black text-gray-800 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
        {recipe.title}
      </h3>
      
      <p className="text-xs text-gray-400 mb-6 line-clamp-2 flex-grow leading-relaxed">
        {recipe.description}
      </p>

      <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-auto pt-4 border-t border-gray-50">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{recipe.cookTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <Flame className="w-3 h-3" />
          <span>{recipe.calories}</span>
        </div>
        {!isSwapping && (
          <div className="ml-auto flex items-center gap-1 text-orange-400 group-hover:translate-x-1 transition-transform">
            <span className="font-bold">做法</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MealCard;
