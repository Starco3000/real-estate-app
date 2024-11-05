/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
        'lexend': ['Lexend', 'sans-serif'],
        'nunito-sans': ['Nunito Sans', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        'primary': '#723e00',
        'secondary': '#c19d0a',
        'main': '#f1debc',
        'layout': "#f8f8f8",
        'footer': '#f2f2f2',
      },
    },
  },
  plugins: [],
};
