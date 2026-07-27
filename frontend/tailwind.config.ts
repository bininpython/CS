/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0F',
        foreground: '#FFFFFF',
        primary: {
          DEFAULT: '#6D28D9',
          dark: '#3B0764',
          light: '#F3E8FF',
        },
        card: '#12121A',
        muted: '#181825',
        border: '#27273A',
        textSecondary: '#A1A1AA',
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
        info: '#2563EB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};
