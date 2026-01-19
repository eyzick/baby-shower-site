/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blush': {
          50: '#fef7f5',
          100: '#fdeee9',
          200: '#fbd9cf',
          300: '#f8bfae',
          400: '#f4a08a',
          500: '#ef8167',
          600: '#e25c3f',
          700: '#c44a30',
          800: '#a03d28',
          900: '#843525',
        },
        'sage': {
          50: '#f6f7f4',
          100: '#e8ebe3',
          200: '#d3d9c9',
          300: '#b4c0a4',
          400: '#95a77e',
          500: '#788c61',
          600: '#5d6f4b',
          700: '#4a583d',
          800: '#3d4834',
          900: '#343d2d',
        },
        'cream': {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#faf2e5',
          300: '#f5e7d1',
          400: '#edd6b5',
          500: '#e3c398',
          600: '#d4a96f',
          700: '#c08d4f',
          800: '#9f7342',
          900: '#825f38',
        },
        'sky': {
          50: '#f4f9fb',
          100: '#e6f2f7',
          200: '#c8e3ed',
          300: '#9bcdde',
          400: '#66b1ca',
          500: '#4296b4',
          600: '#337997',
          700: '#2c627a',
          800: '#295266',
          900: '#264556',
        }
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        'body': ['"DM Sans"', 'system-ui', 'sans-serif'],
        'handwritten': ['"Caveat"', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'wiggle': 'wiggle 3s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'drift': 'drift 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        drift: {
          '0%': { transform: 'translateX(-100%) rotate(0deg)' },
          '100%': { transform: 'translateX(100vw) rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}

