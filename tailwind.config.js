/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/html/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{njk,md}", "./src/**/*.svg",],
  theme: {
    extend: {},
  },
});

