/** @type {import('tailwindcss').Config} */
const konstaConfig = require('konsta/config');

// module.exports = konstaConfig({
//   content: ["./src/**/*.{html,js}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// });

module.exports = konstaConfig({
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/index.html'],
  darkMode: 'class',
});
