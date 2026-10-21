/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Raleway headlines, Inter text, JetBrains Mono labels, Space Grotesk wordmark
        display: ['"Raleway Variable"', '"Inter Variable"', 'system-ui', 'sans-serif'],
        body: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        inter: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        grotesk: ['"Space Grotesk Variable"', '"Inter Variable"', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },

      colors: {
        // Liquid-glass palette: white surfaces, near-black ink, electric
        // blue (#0066dd passes AA as text) with sky highlights; `deep` for
        // dark bands, `star` for ratings.
        ink: { DEFAULT: '#0B0F1A', soft: '#4A5163', dim: '#5E6578' },
        line: 'rgba(0,0,0,0.10)',
        night: '#FFFFFF',
        surface: '#F5F8FC',
        deep: '#080B14',
        star: '#FF801E',
        brand: { DEFAULT: '#0066DD', light: '#60B1FF', mid: '#319AFF', cyan: '#0B7A75', violet: '#6D4AFF' },
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
