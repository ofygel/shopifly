/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/data/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'text-new': '#dcdcdc'
      },
      boxShadow: {
        'glow': '0 0 25px rgba(139, 69, 19, 0.3)',
        'glow-hover': '0 0 35px rgba(160, 82, 45, 0.5)'
      }
    }
  },
  plugins: [],
}
