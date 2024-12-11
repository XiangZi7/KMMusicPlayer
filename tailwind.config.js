/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        float: 'float 4s ease-in-out infinite',
        move6: 'move6 1s infinite',
      },
      keyframes: {
        move6: {
          '0%': { height: '0.2em' },
          '25%': { height: '0.7em' },
          '50%': { height: '1.5em' },
          '100%': { height: '0.2em' },
        },
      },
    },
  },
  plugins: [],
}
