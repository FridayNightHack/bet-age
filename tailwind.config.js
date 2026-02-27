/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        container: '81.25rem',
        'container-wide': 'calc(93.75rem - 2 * 1rem)', // или "91.75rem"
      },
      height: {
        basic: '5.62rem',
        'inp-h': '40px',
        'line-base': '2px',
      },
      gridTemplateColumns: {
        'dsc-hd': '50% repeat(3, 1fr)',
      },
      fontFamily: {
        basic: "'Poppins', sans-serif",
        primary: "'Rubik', sans-serif",
        segoe: "'Segoe UI', sans-serif",
      },
      fontSize: {
        medium: 'clamp(20px,2.66vw,40px)',
      },
      colors: {
        light: '#ffffff',
        'light-gray': '#C4C4C4',
        wheat: '#F5DEB3',
        orange: '#ca5434',
        dark: '#201f20',
        'dark-medium': '#3f3e3e',
        'dark-gray': '#2D2C2D',
        'normal-gray': '#3C4149',
      },
      padding: {
        base: '2.5rem',
      },
      borderRadius: {
        button: '0.1rem',
      },
      screens: {
        'max-lg': { max: '80rem' },
        'max-md': { max: '64rem' },
        'max-sm': { max: '53.87rem' },
        'max-xs': { max: '37.25rem' },

        'min-sm': { min: '53.87rem' },
        custom: '37.25rem',
      },
    },
  },
  plugins: [],
};
