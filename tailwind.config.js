/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bento Light Mode Palette
        // Cyber/Black Mode Palette
        slate: {
          950: '#000000', // Pure Black (Main BG)
          900: '#0a0a0a', // Almost Black (Card BG)
          800: '#171717', // Dark Grey
          700: '#262626', // Borders
          600: '#404040',
          500: '#525252',
          400: '#a3a3a3',
          300: '#d4d4d8',
          200: '#e5e5e5',
          100: '#f5f5f5',
          50: '#fafafa',
        },
        brand: {
          blue: '#06b6d4', // Cyan 500 (Primary Accent)
          soft: '#cffafe', // Cyan 100 (Soft Background)
        },
        status: {
          success: '#10B981', // Emerald 500
          error: '#EF4444',   // Red 500
          warning: '#F59E0B', // Amber 500
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'], // Added for headings if needed
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(28, 25, 23, 0.05)',
        'md': '0 4px 6px -1px rgba(28, 25, 23, 0.02), 0 2px 4px -1px rgba(28, 25, 23, 0.02)',
        'lg': '0 10px 15px -3px rgba(28, 25, 23, 0.03), 0 4px 6px -2px rgba(28, 25, 23, 0.02)',
        'bento': '0 20px 40px -10px rgba(28, 25, 23, 0.08)', // Soft large shadow
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
