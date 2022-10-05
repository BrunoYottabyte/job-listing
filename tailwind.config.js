/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{html,js,vue}"
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark-cyan':{
          100: 'hsl(180, 29%, 50%)'
        },
        'neutral-cyan-background': {
          100: 'hsl(180, 52%, 96%)'
        },
        'neutral-cyan-filter': {
          100: 'hsl(180, 31%, 95%)'
        },
        'neutral-dark-cyan': {
          100: 'hsl(180, 8%, 52%)'
        },
        'neutral-very-dark-cyan': {
          100: 'hsl(180, 14%, 20%)'
        }
      },
      screens: {
        'md': {'max': '900px'},
        'sm': {'max': '600px'}
      }
    },
  },
  plugins: [],
}
