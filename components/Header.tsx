
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from './icons/ThemeIcons';

export default function Header(): React.ReactNode {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-md transition-colors duration-500">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Trufarte Logo" className="h-10 w-10 object-contain" />
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Início</Link>
                <Link to="/cardapio" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Cardápio</Link>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-full text-primary-dark dark:text-accent hover:bg-primary-light/50 dark:hover:bg-accent/20 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}