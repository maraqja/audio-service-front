/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      invert: {
        25: '.25',
        50: '.5',
        75: '.75',
      }
    },
  },
  plugins: [],
}
