import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        natural: {
          50: '#f6fbf7',
          100: '#ecf7ee',
          200: '#d0eed6',
          300: '#a8e3b5',
          400: '#7fd690',
          500: '#4fc56a',
          600: '#2f9b4a',
          700: '#196b33',
          800: '#0f4a25',
          900: '#083219',
        },
        emerald: {
          50: '#f3fbf9',
          100: '#e8f7ef',
          200: '#c7f0dd',
          300: '#8de0b6',
          400: '#49c885',
          500: '#10b981',
          600: '#0e9a6a',
          700: '#0b6f46',
          800: '#07492f',
          900: '#05361f',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(135deg, rgba(79,197,106,0.06), rgba(10,74,59,0.12))',
      },
    },
  },
  plugins: [],
};
export default config;