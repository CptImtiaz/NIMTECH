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
        ink: { DEFAULT: '#0B1220', soft: '#55617A', dim: '#8A94A8' },
        line: 'rgba(11,18,32,0.09)',
        night: '#050B18',
        star: '#FF801E',
        brand: { DEFAULT: '#0A6CFF', light: '#60B1FF', mid: '#319AFF' },
      },
    },
  },
  plugins: [],
}
