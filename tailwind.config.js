module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'breaker-bay': {
          50: '#f4f9f9',
          100: '#d9eeec',
          200: '#b2ddd9',
          300: '#84c4c1',
          400: '#57a1a0',
          500: '#418b8b',
          600: '#326d6f',
          700: '#2b595a',
          800: '#264749',
          900: '#233d3e',
          950: '#102123'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
