/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A1F44', // Deep navy background
        primary: '#0A66C2',
        cyan: '#00C2FF',
      }
    },
  },
  plugins: [],
}
