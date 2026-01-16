import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-lg border-t border-purple-200 dark:border-purple-500/20 py-8 px-4 relative z-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-800 dark:text-gray-400">
          © 2026 Asmah Yaseen. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;