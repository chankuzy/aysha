/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#07111F',
        navy: '#0F172A',
        'navy-light': '#16213A',
        rose: '#FF5D8F',
        'rose-deep': '#E14577',
        lavender: '#B9A6F0',
        gold: '#F3C978',
        cream: '#FBF6EF',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-18px) translateX(8px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.25 },
          '50%': { opacity: 1 },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.55, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.06)' },
        },
      },
      animation: {
        drift: 'drift 6s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3.5s ease-in-out infinite',
      },
      boxShadow: {
        glow: '0 0 60px rgba(255, 93, 143, 0.35)',
        'glow-gold': '0 0 50px rgba(243, 201, 120, 0.35)',
        'glow-lavender': '0 0 50px rgba(185, 166, 240, 0.3)',
      },
    },
  },
  plugins: [],
}
