/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // 主题颜色
      colors: {
        'background': {
          DEFAULT: 'rgba(16, 18, 27, 0.4)', // theme-bg-color
          'light': 'rgba(255, 255, 255, 0.31)', // light mode variant
        },
        'border': {
          DEFAULT: 'rgba(113, 119, 144, 0.25)', // border-color
          'light': 'rgba(255, 255, 255, 0.35)', // light mode variant
        },
        'theme': {
          DEFAULT: '#f9fafb', // theme-color
          'light': '#3c3a3a', // light mode variant
        },
        'inactive': {
          DEFAULT: 'rgba(113, 119, 144, 0.78)', // inactive-color
          'light': '#333333', // light mode variant
        },
        'button': {
          'inactive': 'rgba(249, 250, 251, 0.55)', // button-inactive
          'inactive-light': '#3c3a3a', // light mode variant
        },
        'hover-menu': {
          DEFAULT: 'rgba(12, 15, 25, 0.3)', // hover-menu-bg
          'light': 'rgba(255, 255, 255, 0.35)', // light mode variant
        },
        'content': {
          'title': '#999ba5', // content-title-color
          'background': 'rgba(146, 151, 179, 0.13)', // content-bg
        },
        'dropdown': {
          'background': '#21242d', // dropdown-bg
          'hover': 'rgb(42, 46, 60)', // dropdown-hover
        },
        'popup': {
          DEFAULT: 'rgb(22, 25, 37)', // popup-bg
          'light': 'rgb(255, 255, 255)', // light mode variant
        },
        'search': {
          DEFAULT: '#14162b', // search-bg
          'light': 'rgba(255, 255, 255, 0.31)', // light mode variant
        },
        'overlay': {
          DEFAULT: 'rgba(36, 39, 59, 0.3)', // overlay-bg
          'light': 'rgba(255, 255, 255, 0.3)', // light mode variant
        },
        'scrollbar': {
          DEFAULT: 'rgba(1, 2, 3, 0.4)', // scrollbar-bg
          'light': 'rgba(255, 253, 253, 0.57)', // light mode variant
        },
      },
      // 字体设置
      fontFamily: {
        'body': ['Poppins', 'sans-serif'], // body-font
      },
    },
  },

  plugins: [],
}