import { forwardRef } from 'react'

// Minimal shadcn/ui-style Button built on the semantic colour tokens.
type Variant = 'default' | 'ghost' | 'outline'
type Size = 'default' | 'icon'

const BASE = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
const VARIANTS: Record<Variant, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  ghost: 'hover:bg-secondary hover:text-secondary-foreground',
  outline: 'border border-border bg-background hover:bg-secondary',
}
const SIZES: Record<Size, string> = {
  default: 'h-10 px-4 py-2',
  icon: 'h-10 w-10',
}

// Like tailwind-merge for the few groups we override: a class in
// `override` removes base classes of the same group (and modifiers).
const GROUP = /^((?:[a-z-]+:)*)(rounded|h|w|px|py|bg|border)(?=-|$)/
function merge(base: string, override: string) {
  const taken = new Set(override.split(/\s+/).map((c) => c.match(GROUP)?.slice(1).join('')).filter(Boolean))
  const kept = base.split(/\s+/).filter((c) => !taken.has(c.match(GROUP)?.slice(1).join('')))
  return [...kept, override].join(' ')
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className = '', variant = 'default', size = 'default', ...props }, ref) => (
  <button ref={ref} className={merge(`${BASE} ${VARIANTS[variant]} ${SIZES[size]}`, className)} {...props} />
))
Button.displayName = 'Button'
