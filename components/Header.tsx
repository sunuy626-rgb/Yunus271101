
import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { SunIcon, MoonIcon, ZapIcon } from './icons/Icons';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm shrink-0">
      <div className="flex items-center gap-2">
        <ZapIcon className="w-6 h-6 text-blue-500" />
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">AI Logo Architect</h1>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
      </button>
    </header>
  );
};

export default Header;
