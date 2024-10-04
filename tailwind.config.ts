import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/blocks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/payload/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        text: 'hsl(var(--text))',
        secondary: 'hsl(var(--secondary))',
        background: 'hsl(var(--background))',
        card: 'hsl(var(--card))',
        input: 'hsl(var(--input))',
        transparent: 'transparent',
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger))',
          foreground: 'hsl(var(--danger-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        popover: 'hsl(var(--popover))',
        pink: 'hsl(var(--pink))',
        indigo: 'hsl(var(--indigo))',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      fontSize: {
        xs: '0.8rem',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      transitionTimingFunction: {
        'custom-ease': 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
      keyframes: {
        'image-blur-frames': {
          '0%': { filter: 'blur(16px)' },
          '100%': { filter: 'blur(0px)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'image-blur': 'image-blur-frames 0.1s ease-in',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
}

export default config
