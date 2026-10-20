/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Geist for everything, Geist Mono for labels and data (self-hosted)
        fustat: ['"Geist Variable"', 'system-ui', 'sans-serif'],
        display: ['"Geist Variable"', 'system-ui', 'sans-serif'],
        body: ['"Geist Variable"', 'system-ui', 'sans-serif'],
        inter: ['"Geist Variable"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono Variable"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      colors: {
        // Enterprise palette: white surfaces, deep navy ink, electric blue
        // with teal and violet accents. `deep` is for dark bands.
        ink: { DEFAULT: '#0A0F29', soft: '#4B5375', dim: '#5F6785' },
        line: 'rgba(10,15,41,0.10)',
        night: '#FFFFFF',
        surface: '#F5F7FB',
        deep: '#070B1F',
        star: '#F5A524',
        brand: { DEFAULT: '#2A4BFF', light: '#8FA2FF', mid: '#3A58FF', cyan: '#0B7A75', violet: '#6D4AFF' },
        // Semantic tokens for the Software landing (vars are scoped to .nexora)
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: { DEFAULT: 'hsl(var(--primary) / <alpha-value>)', foreground: 'hsl(var(--primary-foreground) / <alpha-value>)' },
        secondary: { DEFAULT: 'hsl(var(--secondary) / <alpha-value>)', foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)' },
        muted: { DEFAULT: 'hsl(var(--muted) / <alpha-value>)', foreground: 'hsl(var(--muted-foreground) / <alpha-value>)' },
        accent: { DEFAULT: 'hsl(var(--accent) / <alpha-value>)', foreground: 'hsl(var(--accent-foreground) / <alpha-value>)' },
        border: 'hsl(var(--border) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
