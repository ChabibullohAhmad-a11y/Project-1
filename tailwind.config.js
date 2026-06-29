/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#fceed1',
          purple: '#7d3cff',
          yellow: '#f2d53c',
          red: '#c80e13',
          dark: '#1a1a2e',
          muted: '#6b6b80',
          card: '#fdf6e4',
          border: '#e8d9b5',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
        'progress': 'progress 0.6s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        progress: { from: { width: '0%' }, to: {} },
      },
      boxShadow: {
        card: '0 2px 8px rgba(26,26,46,0.08)',
        'card-hover': '0 4px 16px rgba(26,26,46,0.12)',
        purple: '0 4px 14px rgba(125,60,255,0.25)',
      },
    },
  },
  plugins: [],
}
