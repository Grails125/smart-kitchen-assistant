
import React from 'react';
import { Recipe } from '../types';
import { X, Clock, Users, ListChecks, MessageSquareText } from 'lucide-react';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-48 bg-orange-100 flex items-center justify-center overflow-hidden">
          <img 
            src={`https://picsum.photos/seed/${recipe.title}/800/400`} 
            alt={recipe.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-3xl font-bold text-white mb-2">{recipe.title}</h2>
            <div className="flex gap-4 text-white/90 text-sm">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {recipe.cookTime}</span>
              <span className="flex items-center gap-1 font-semibold">{recipe.difficulty}难度</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Ingredients */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-2 mb-4 text-gray-800">
                <Users className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold">食材清单</h3>
              </div>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex justify-between items-center text-sm p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-700 font-medium">{ing.name}</span>
                    <span className="text-gray-400">{ing.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="md:col-span-7">
              <div className="flex items-center gap-2 mb-4 text-gray-800">
                <ListChecks className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold">烹饪步骤</h3>
              </div>
              <div className="space-y-6">
                {recipe.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-50 text-orange-500 font-bold flex items-center justify-center text-sm border border-orange-200">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>

              {recipe.tips && (
                <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-2 text-blue-700">
                    <MessageSquareText className="w-4 h-4" />
                    <span className="text-sm font-bold">小贴士</span>
                  </div>
                  <p className="text-sm text-blue-600 italic">“{recipe.tips}”</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex justify-center bg-gray-50/50">
          <button 
            onClick={onClose}
            className="px-10 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-100 transition-all hover:scale-105 active:scale-95"
          >
            记住了，去开火！
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
