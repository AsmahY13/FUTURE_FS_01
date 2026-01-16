import React from 'react';
import { Menu, X, Code, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface NavigationProps {
  isMenuOpen: boolean;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  isMenuOpen,
  activeSection,
  scrollToSection,
  setIsMenuOpen
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-lg z-50 border-b border-purple-200 dark:border-purple-500/20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent flex items-center">
            <Code className="mr-2 text-purple-600 dark:text-purple-400" size={24} />
            AsmahYaseen.dev
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize transition-all relative group ${
                  activeSection === item 
                    ? 'text-purple-700 dark:text-purple-400 font-medium' 
                    : 'text-gray-800 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                {item}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 transform origin-left transition-transform ${
                  activeSection === item ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>
            ))}
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-purple-700" />
              )}
            </button>
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            {/* Theme Toggle Button for Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-purple-700" />
              )}
            </button>
            
            <button
              className="text-purple-700 dark:text-purple-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-purple-200 dark:border-purple-500/20 transition-colors duration-300">
          <div className="px-4 py-3 space-y-3">
            {['home', 'about', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left capitalize py-2 text-gray-800 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
              >
                {item}
              </button>
            ))}
            {/* Theme toggle in mobile menu */}
            <button
              onClick={toggleTheme}
              className="block w-full text-left capitalize py-2 text-gray-800 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 transition-colors flex items-center"
            >
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
              <span className="ml-2">
                {theme === 'dark' ? (
                  <Sun size={18} className="text-yellow-500" />
                ) : (
                  <Moon size={18} className="text-purple-700" />
                )}
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;