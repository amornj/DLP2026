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
        primary: {
          DEFAULT: '#1a365d',
          light: '#2a4a7f',
          dark: '#0f2440',
        },
        danger: '#B22222',
        success: '#1E824C',
        warning: '#D4A017',
        lipid: {
          red: '#C53030',
          blue: '#2B6CB0',
          purple: '#6B46C1',
          teal: '#2C7A7B',
        },
      },
    },
  },
  plugins: [],
}
export default config
