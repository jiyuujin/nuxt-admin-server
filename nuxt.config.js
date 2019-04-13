module.exports = {
  head: {
    title: 'nuxt-admin-server',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://s3-ap-northeast-1.amazonaws.com/jiyuujinlab/bakeneko.png' }
    ]
  },

  loading: { color: '#3B8070' },

  build: {
    extractCSS: true,
    extend (config, { isDev }) {
      if (isDev && process.isClient) {
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
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'nuxt-purgecss'
  ],

  plugins: [
    '~plugins/axios',
    '~plugins/firebase',
    {
      src: '~plugins/vue-chartjs',
      ssr: false
    },
    {
      src: '~plugins/stylebook.js',
      ssr: false
    }
  ],

  purgeCSS: {
    //
  },

  css: [
    '~/assets/main.scss',
  ],

  env: {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
  },
}
