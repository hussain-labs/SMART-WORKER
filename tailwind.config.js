/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
        canvas: "var(--color-surface)",
        card: "var(--color-card)",
        warm: "var(--color-border)",
        espresso: "var(--color-text-main)",
        muted: "var(--color-text-muted)",
      }
    },
  },
  plugins: [],
}
