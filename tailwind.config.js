/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#f93270',
          lemon: '#8fbf1a',
          green: '#005c29',
          white: '#ffffff',
        }
      }
    },
  },
  plugins: [],
}
