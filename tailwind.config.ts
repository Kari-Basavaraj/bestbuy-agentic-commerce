import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Updated: 2026-01-09 - Official Best Buy brand colors
      colors: {
        bestbuy: {
          blue: '#0046BE',    // Best Buy Blue (primary)
          yellow: '#FFE000',  // Best Buy Yellow (tag/accent)
          dark: '#1D252C',    // Best Buy Dark (text)
          white: '#FFFFFF',   // White
        },
      },
    },
  },
  plugins: [],
}
export default config
