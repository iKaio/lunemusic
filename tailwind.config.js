/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter"
      },
      spacing: {
        '21p': '21.42%',
        '14p': '14.28%',
        '10p': '10.71%',
        '7p': '7.14%',
      }
    },
  },
  plugins: [],
}
