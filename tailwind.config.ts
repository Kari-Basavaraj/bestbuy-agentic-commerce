import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bestbuy: {
          blue: '#0046be',
          yellow: '#fff200',
          dark: '#1d252c',
        },
      },
    },
  },
  plugins: [],
}
export default config
