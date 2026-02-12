import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#faf9f6',
          50: '#f5f3ef',
          100: '#f0ede7',
          200: '#e8e4dc',
          300: '#ddd8ce',
          400: '#d0c9bc',
          500: '#c4bcad',
        },
        gold: {
          DEFAULT: '#3b7d6e',
          light: '#5a9e8f',
          dark: '#2d6358',
          50: '#eef7f4',
          100: '#d4ede6',
          200: '#a8dbce',
          300: '#7cc9b6',
          400: '#3b7d6e',
          500: '#2d6358',
          600: '#224b43',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-jakarta)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'grain': 'grain 8s steps(10) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(59, 125, 110, 0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(59, 125, 110, 0.3)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
