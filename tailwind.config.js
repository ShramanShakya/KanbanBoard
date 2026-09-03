/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1C2321',
        paper: '#F7F5F0',
        paper2: '#EFEBE1',
        slate: '#3A4750',
        teal: {
          DEFAULT: '#0EA5A0',
          dark: '#0B7E7A',
          light: '#CFEFEC',
        },
        amber: {
          DEFAULT: '#E8A33D',
          light: '#FBE7C6',
        },
        coral: {
          DEFAULT: '#E85D4C',
          light: '#FBD9D3',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(28,35,33,0.06), 0 1px 3px rgba(28,35,33,0.08)',
        lift: '0 6px 16px rgba(28,35,33,0.12)',
      },
    },
  },
  plugins: [],
}
