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
        // Site palette: deep-space navy, electric indigo -> cyan, violet highlight
        ink: { DEFAULT: '#F4F6FF', soft: '#A3ABC7', dim: '#646D8E' },
        line: 'rgba(164,180,255,0.12)',
        night: '#05060F',
        surface: '#0C1022',
        star: '#FF801E',
        brand: { DEFAULT: '#5B7CFF', light: '#8EA6FF', mid: '#6F8CFF', cyan: '#3EE7FF', violet: '#B794FF' },
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
