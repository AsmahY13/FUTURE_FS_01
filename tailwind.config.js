/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // ← ADD THIS LINE (enables class-based dark mode)
  theme: {
    extend: {
      // Optional: You can add custom colors or animations
      colors: {
        // You can define custom colors if needed
      },
      animation: {
        // You can add custom animations
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}