/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          header: '#121E1A',
          primary: '#0D3B2E',
          'primary-hover': '#092920',
          secondary: '#E06D38',
          'secondary-hover': '#C85A28',
          'secondary-light': '#FBF3EA',
          bg: '#FFFDF9',
          'bg-alt': '#F4EDE4',
          surface: '#FFFFFF',
          'text-main': '#1A2E26',
          'text-muted': '#5C6B64',
          border: '#E5DDD0',
        },
        'brand-bg': '#F8F4EC',
        'brand-dark': '#17382B',
        'brand-accent': '#D96B27',
        'brand-card': '#FFFFFF',
        'brand-muted': '#6B7280',
        'brand-border': '#EAE5D9',
        'theme-bg': '#FDF9F3',
        'theme-primary': '#1E3A2F',
        'theme-accent': '#D96B27',
        'theme-card': '#FFFFFF',
        'theme-muted': '#6B7280',
        'theme-border': '#EAE5D9',
        primary: "var(--color-primary)",
        coral: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        peach: "var(--color-secondary)",
        canvas: "var(--color-bg-base)",
        card: "var(--color-surface)",
        warm: "var(--color-border)",
        espresso: "var(--color-text-main)",
        muted: "var(--color-text-muted)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'Merriweather', 'serif']
      }
    },
  },
  plugins: [],
}
