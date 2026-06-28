/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1B2A4A',
        parchment: '#F2F4EF',
        'parchment-dim': '#E6EAE2',
        hairline: '#D6DBD0',
        amber: '#D98E3B',
        forest: '#3F6B4F',
        clay: '#9C3450',
        slate: '#8B93A1',
        action: '#155EEF',
        'action-dim': '#E8EFFE',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
