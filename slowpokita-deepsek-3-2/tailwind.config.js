/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/presentation/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1E1B4C',
        primary: '#FF2E97',
        secondary: '#FFD402',
        accent: '#0ABDC6',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}