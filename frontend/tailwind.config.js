const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'spin-fast': 'spin .5s linear infinite',
      },
      maxHeight: {
        0: '0',
        xl: '36rem',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      'xs': {'max': '639px'},
      ...defaultTheme.screens,
    }
  },
  plugins: [require('@tailwindcss/forms')],
};
