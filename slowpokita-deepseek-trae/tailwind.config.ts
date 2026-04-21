import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1E1B4C',
        backgroundLight: '#2A2766',
        backgroundDark: '#15133B',
        foreground: '#F8F9FA',
        primary: '#FF2E97',
        secondary: '#FFD402',
        accent: '#0ABDC6',
        muted: '#A0A0C0',
        border: '#3A3780',
      },
      borderRadius: {
        DEFAULT: '12px',
      },
      boxShadow: {
        DEFAULT: '0 10px 30px rgba(0, 0, 0, 0.3)',
        light: '0 5px 15px rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;