/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: '#916E4B',
        color2: '#BB9773',
        color3: '#C7AA8C',
        color4: '#F0D8C0',
        color5: '#FFE9D4',
      },
    },
  },
  plugins: [],
}
