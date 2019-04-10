const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.js'),
    require('autoprefixer', {
      grid: true
    }),
    require('postcss-import'),
    purgecss({
      content: [
        './pages/**/*.vue',
        './layouts/**/*.vue',
        './components/**/*.vue'
      ],
      whitelist: ['html', 'body'],
      whitelistPatterns: [/nuxt-/]
    })
  ]
}
