/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#84BF69',
        secondary: '#C0DFE2',
        tertiary: '#08A689',
        secondary2: '#8E80BF',
        quaternary: '#F2F2F2',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
