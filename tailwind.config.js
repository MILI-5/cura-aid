// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#183153', // dark navy
        accent: '#3A8D8D', // muted green
        blueOverlay: 'rgba(24,49,83,0.7)', // soft blue overlay
        offwhite: '#F8F9FA',
        testimonialBg: '#F5F6F8',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '2rem',
      },
    },
  },
  plugins: [],
}
