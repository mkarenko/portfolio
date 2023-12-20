/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mirage: '#141727',
        liteMirage: '#2c2e3d',
        eastBay: '#40497c',
        moodyBlue: '#6b7bd1',
        offWhite: '#e9dcc5',
      },
    },
  },
  plugins: [],
};
