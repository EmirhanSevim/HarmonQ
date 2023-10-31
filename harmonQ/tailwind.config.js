/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '258px': '258px',
      },
    },
  },
  plugins: [require('flowbite/plugin', 'tw-elements/dist/plugin.cjs')],
};
