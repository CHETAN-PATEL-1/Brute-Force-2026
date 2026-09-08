/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#faf8ff',
          elevated: '#ffffff',
          dark: '#1a1025',
        },
        ink: {
          DEFAULT: '#1e1033',
          muted: '#6b5b7a',
          subtle: '#9d8faf',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      borderRadius: {
        card: '1rem',
        button: '0.75rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(88 28 135 / 0.06), 0 4px 16px -2px rgb(88 28 135 / 0.1)',
        'card-hover': '0 8px 32px -4px rgb(168 85 247 / 0.25)',
        glow: '0 0 40px -8px rgb(168 85 247 / 0.45)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #3b0764 0%, #7e22ce 45%, #a855f7 100%)',
        'mesh-gradient':
          'radial-gradient(at 20% 20%, rgb(168 85 247 / 0.35) 0, transparent 50%), radial-gradient(at 80% 0%, rgb(126 34 206 / 0.3) 0, transparent 45%), radial-gradient(at 80% 80%, rgb(59 7 100 / 0.25) 0, transparent 40%)',
      },
      animation: {
        shimmer: 'shimmer 1.8s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
