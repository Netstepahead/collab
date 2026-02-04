/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // StepAhead Brand Colors
        primary: {
          DEFAULT: '#1F3A60', // Deep Blue from logo
          light: '#4472C4',
          dark: '#1E3A5F',
        },
        secondary: {
          DEFAULT: '#FBAF3F', // Bright Orange from logo
          light: '#FF6B35',
          dark: '#FF9800',
        },
        background: {
          DEFAULT: '#FDFBF7', // Cream/Beige
          alt: '#F5F5E8',
        },
        surface: {
          DEFAULT: '#FFFFFF', // White for cards
        },
        // Additional brand colors
        teal: {
          DEFAULT: '#2B9B8B',
          light: '#4CAF50',
        },
        text: {
          primary: '#1E88C7',
          secondary: '#5A5A5A',
          dark: '#333333',
        },
      },
      fontFamily: {
        sans: ['Heebo', 'Assistant', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
