// Helper functions for theme management
export const getThemeColor = (theme: 'light' | 'dark') => {
  return theme === 'dark' ? '#0f172a' : '#ffffff';
};

// Theme-specific gradients
export const getBackgroundGradient = (theme: 'light' | 'dark') => {
  return theme === 'dark' 
    ? 'from-slate-900 via-purple-900 to-slate-900'
    : 'from-gray-50 via-purple-50 to-gray-50';
};

// Theme-specific text colors
export const getTextColor = (theme: 'light' | 'dark') => {
  return theme === 'dark' ? 'text-white' : 'text-gray-900';
};

// Theme-specific card backgrounds
export const getCardBackground = (theme: 'light' | 'dark') => {
  return theme === 'dark' 
    ? 'bg-slate-800/30'
    : 'bg-white/80';
};

// Theme-specific border colors
export const getBorderColor = (theme: 'light' | 'dark') => {
  return theme === 'dark'
    ? 'border-purple-500/20'
    : 'border-purple-300/40';
};