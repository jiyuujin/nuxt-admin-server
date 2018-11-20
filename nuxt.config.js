const firebase = require('./.firebase.json')
const netlify = require('./.netlify.json')

module.exports = {
  head: {
    title: 'nuxt-admin-server',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://s3-ap-northeast-1.amazonaws.com/jiyuujinlab/bakeneko.png' }
    ]
  },

  loading: { color: '#3B8070' },

  build: {
    extend(config) {
      if (process.server && process.browser) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios'
  ],

  plugins: [
    '~plugins/vuetify'
  ],

  css: [
    'vuetify/dist/vuetify.min.css',
    'material-design-icons-iconfont/dist/material-design-icons.css',
    '@mdi/font/css/materialdesignicons.css'
  ],

  env: {
    API_KEY: firebase.API_KEY,
    AUTH_DOMAIN: firebase.AUTH_DOMAIN,
    DATABASE_URL: firebase.DATABASE_URL,
    NETLIFY_TOKEN: netlify.NETLIFY_TOKEN
  },
}
