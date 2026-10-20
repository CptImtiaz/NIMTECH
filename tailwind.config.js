/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Sora for headings, Inter for text, JetBrains Mono for labels (self-hosted)
        fustat: ['"Sora Variable"', 'Inter Variable', 'system-ui', 'sans-serif'],
        display: ['"Sora Variable"', 'Inter Variable', 'system-ui', 'sans-serif'],
        body: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        inter: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      colors: {
        // Site palette: white surfaces, navy ink, indigo -> cyan -> violet accents.
        // `night` is the page background; `deep` is for the dark accent bands.
        ink: { DEFAULT: '#0B1020', soft: '#4A5372', dim: '#646D88' },
        line: 'rgba(15,23,60,0.10)',
        night: '#FFFFFF',
        surface: '#F6F8FC',
        deep: '#070A1A',
        star: '#FF801E',
        brand: { DEFAULT: '#4C63F6', light: '#6E86FF', mid: '#5A72FF', cyan: '#0891B2', violet: '#7C5CFA' },
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
