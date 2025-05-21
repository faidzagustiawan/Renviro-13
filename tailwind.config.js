/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'background-primary': 'var(--background-primary)',
        'background-secondary': 'var(--background-secondary)',
      },
      textColor: {
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
      },
      borderColor: {
        'border-color': 'var(--border-color)',
      },
      colors: {
        primary: {
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        secondary: {
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
        },
        accent: {
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
        },
      },
    },
  },
  plugins: [],
}