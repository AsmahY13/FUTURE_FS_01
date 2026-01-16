import React from 'react';
import { MousePositionType } from '../../types';
import { useTheme } from '../../context/ThemeContext'; // ADD THIS IMPORT

interface BackgroundProps {
  mousePosition: MousePositionType;
}

const Background: React.FC<BackgroundProps> = ({ mousePosition }) => {
  const { theme } = useTheme(); // ADD THIS HOOK

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Mouse-following orb - different opacity for light mode */}
      <div 
        className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-pulse transition-opacity duration-300"
        style={{
          left: `${mousePosition.x / 20}px`,
          top: `${mousePosition.y / 20}px`,
          transition: 'all 0.3s ease-out'
        }}
      />
      {/* Static orbs - different colors for light mode */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-400 dark:bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-pulse transition-colors duration-300" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-400 dark:bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-pulse transition-colors duration-300" style={{ animationDelay: '4s' }} />
      
      {/* Subtle grid pattern for light mode */}
      {theme === 'light' && (
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(to right, #7c3aed 1px, transparent 1px),
                             linear-gradient(to bottom, #7c3aed 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      )}
    </div>
  );
};

export default Background;