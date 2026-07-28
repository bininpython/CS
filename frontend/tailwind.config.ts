/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#0B0B0F',
        sidebarHover: '#1A1A24',
        background: '#F3F4F6',
        foreground: '#0B0B0F',
        card: '#FFFFFF',
        border: '#E5E7EB',
        muted: '#6B7280',
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
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
};
