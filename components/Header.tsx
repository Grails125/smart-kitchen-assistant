
import React from 'react';
import { Utensils } from 'lucide-react';

const Header: React.FC = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <header className="bg-white border-b border-orange-100 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-200">
            <Utensils className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">主妇智能小帮手</h1>
            <p className="text-xs text-gray-500">今日美味已准备就绪</p>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-gray-700">{formattedDate}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
