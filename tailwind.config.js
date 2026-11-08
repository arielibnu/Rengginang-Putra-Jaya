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
          DEFAULT: '#8A3319',
          50: '#FDF4F0',
          100: '#FCE6DC',
          200: '#F9CBB9',
          500: '#9E3C1F',
          600: '#8A3319',
          700: '#732913',
          800: '#5C200E',
          900: '#45170A',
        },
        forest: {
          DEFAULT: '#1E463A',
          hover: '#16362C',
          light: '#2B5E4F',
        },
        warm: {
          bg: '#FAF6F0',
          card: '#FFFFFF',
          border: '#EFE6DC',
          peach: '#FEEFE6',
          'peach-text': '#A84E20',
          green: '#EDF7EE',
          'green-text': '#2E7D32',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

