/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { 
    extend: {
      fontFamily: {
        pressStart: ['"Press Start 2P"', 'mono'],
      }
    } 
  },
  plugins: [],
}