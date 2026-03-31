/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f4f4f0',
          100: '#e8e8e0',
          200: '#d0d0c0',
          300: '#b0b09a',
          400: '#888870',
          500: '#666650',
          600: '#4a4a38',
          700: '#333325',
          800: '#1e1e14',
          900: '#0f0f08',
        },
        accent: {
          DEFAULT: '#e8531a',
          hover: '#c94010',
          light: '#fff0eb',
        },
      },
    },
  },
  plugins: [],
}
