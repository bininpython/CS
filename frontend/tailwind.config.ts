/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F7FA',
        foreground: '#0B0B0F',
        card: '#FFFFFF',
        border: '#E4E4E7',
        muted: '#71717A',
        accent: '#2563EB',
        accentLight: '#EFF6FF',
        purple: '#6D28D9',
        purpleDark: '#3B0764',
        purpleLight: '#F3E8FF',
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
        info: '#2563EB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
