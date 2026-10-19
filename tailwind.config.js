/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        fustat: ['Fustat', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          light: '#60B1FF',
          DEFAULT: '#319AFF',
          star: '#FF801E',
        },
      },
    },
  },
  plugins: [],
}
