/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mkj: {
          blue: '#0052CC',
          'blue-hover': '#0047BA',
          'blue-light': '#EFF6FF',
          'blue-border': '#BFDBFE',
          orange: '#FF5500',
          'orange-vibrant': '#FF6B00',
          'orange-light': '#FFF7ED',
          'orange-border': '#FED7AA',
          navy: '#0A2540',
          'slate-dark': '#0F172A',
          'slate-body': '#334155',
          'slate-muted': '#64748B',
          border: '#E2E8F0',
          surface: '#FFFFFF',
          'surface-alt': '#F8FAFC',
          emerald: '#10B981',
          'emerald-light': '#ECFDF5',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.07), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}