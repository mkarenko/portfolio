/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#141727',
        secondary: '#abc2e5',
        offWhite: '#f3f5fb',
      },
    },
  },
  plugins: [],
};
