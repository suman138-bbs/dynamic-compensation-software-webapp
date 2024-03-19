const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'chevron-right': "url('./assets/chevron-right.svg')",
        'chevron-left': "url('./assets/chevron-left.svg')",
        calendar: "url('./assets/calendar.svg')",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
