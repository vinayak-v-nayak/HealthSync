// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{html,js,jsx,ts,tsx}', // Add paths to all files using Tailwind
    ],
    theme: {
      extend: {
        colors: {
          primary: '#3B82F6', // Custom Blue for CTA buttons, focus states, etc.
          secondary: '#1D4ED8', // Darker blue
          lightGray: '#F3F4F6', // Light background for cards, sections
          darkGray: '#1F2937', // Dark text for headings
          accent: '#FBBF24', // Accent color for highlights
        },
        fontFamily: {
          sans: ['Inter', 'Arial', 'sans-serif'], // Modern, clean font family
          serif: ['Georgia', 'Times', 'serif'], // Serif fallback
        },
        spacing: {
          128: '32rem', // Custom spacing (tailored to your design)
          144: '36rem',
        },
        boxShadow: {
          'custom': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)', // Soft shadow for cards
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'), // Form styling plugin
      require('@tailwindcss/typography'), // Typography plugin for rich text
    ],
  }
  