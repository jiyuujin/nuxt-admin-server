module.exports = {
  theme: {
    boxShadow: {
      card: '0 2px 5px rgba(204, 204, 204, 1)'
    }
  },

  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },

  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.ts',
      'nuxt.config.ts'
    ]
  }
}
