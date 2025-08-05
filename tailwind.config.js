/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        zen: {
          50: '#f8faf8',
          100: '#f0f4f0',
          200: '#dde8dd',
          300: '#c4d6c4',
          400: '#a3bfa3',
          500: '#7fa67f',
          600: '#658965',
          700: '#4f6f4f',
          800: '#3f5a3f',
          900: '#324832',
        },
        sage: {
          50: '#f6f7f4',
          100: '#edeee8',
          200: '#d9ddd1',
          300: '#bfc5b2',
          400: '#a0a78c',
          500: '#858c6f',
          600: '#6a7057',
          700: '#555a47',
          800: '#46493c',
          900: '#3b3e34',
        },
        sakura: {
          50: '#fef7f7',
          100: '#feeeee',
          200: '#fddcdc',
          300: '#fbb7b7',
          400: '#f68a8a',
          500: '#ed5e5e',
          600: '#d83b3b',
          700: '#b52d2d',
          800: '#962828',
          900: '#7c2727',
        },
        bamboo: {
          50: '#f7f8f5',
          100: '#eef0ea',
          200: '#dce0d5',
          300: '#c1c9b6',
          400: '#a3ad92',
          500: '#879174',
          600: '#6c755c',
          700: '#565d4a',
          800: '#464c3e',
          900: '#3a4034',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        zen: ['Zen Antique Soft', 'serif'],
        calligraphy: ['Dancing Script', 'cursive'],
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'drift': 'drift 20s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%': { transform: 'translateX(-100px) translateY(100vh) rotate(0deg)' },
          '100%': { transform: 'translateX(100vw) translateY(-100px) rotate(360deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '0.9' },
        },
      },
      backgroundImage: {
        'rice-paper': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23f0f4f0\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm12 0c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        'bamboo-texture': "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23eef0ea\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z\"/%3E%3C/g%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
}