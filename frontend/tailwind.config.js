module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'legal-blue': '#002f6e',
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}