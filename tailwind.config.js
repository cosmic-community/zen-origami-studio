/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'zen': {
          50: '#f8faf7',
          100: '#f0f4ec',
          200: '#dde7d2',
          300: '#c4d4b0',
          400: '#a6bd87',
          500: '#8da568',
          600: '#718851',
          700: '#5a6c42',
          800: '#495637',
          900: '#3d472f',
        },
        'sage': {
          50: '#f6f7f4',
          100: '#eaede4',
          200: '#d6dcc9',
          300: '#b8c4a4',
          400: '#96a77c',
          500: '#7a8b5e',
          600: '#5f6e48',
          700: '#4c563b',
          800: '#3f4632',
          900: '#363c2c',
        },
        'bamboo': {
          50: '#f9faf6',
          100: '#f2f5ea',
          200: '#e3ead3',
          300: '#cdd9b2',
          400: '#b2c48a',
          500: '#99ae69',
          600: '#7d9051',
          700: '#627142',
          800: '#505b37',
          900: '#444e30',
        },
        'sakura': {
          50: '#fef7f7',
          100: '#fdeef0',
          200: '#fce2e5',
          300: '#f9cad2',
          400: '#f4a4b4',
          500: '#ec7c97',
          600: '#de5a7c',
          700: '#c93d63',
          800: '#a73356',
          900: '#8c2e4d',
        },
        'cream': {
          50: '#fefdfb',
          100: '#fefbf6',
          200: '#fdf5e9',
          300: '#faecd4',
          400: '#f6ddb4',
          500: '#f0c68a',
          600: '#e5a85c',
          700: '#d4883c',
          800: '#b06d32',
          900: '#8f5a2e',
        }
      },
      fontFamily: {
        'zen': ['Inter', 'system-ui', 'sans-serif'],
        'calligraphy': ['Brush Script MT', 'cursive'],
      },
      boxShadow: {
        'zen': '0 4px 20px rgba(141, 165, 104, 0.15)',
        'sage': '0 4px 20px rgba(122, 139, 94, 0.15)',
        'sakura': '0 4px 20px rgba(236, 124, 151, 0.15)',
      },
      animation: {
        'drift': 'drift 20s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'meditation-fade': 'meditation-fade 2s ease-out',
        'gentle-slide': 'gentle-slide 1.5s ease-out',
        'breathe': 'breathe 4s ease-in-out infinite',
        'sakura-fall': 'sakura-fall 15s linear infinite',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(100vh) translateX(20px) rotate(90deg)' },
          '50%': { transform: 'translateY(200vh) translateX(-10px) rotate(180deg)' },
          '75%': { transform: 'translateY(300vh) translateX(15px) rotate(270deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'meditation-fade': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'gentle-slide': {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'sakura-fall': {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
}