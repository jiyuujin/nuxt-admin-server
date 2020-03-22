import { Configuration } from 'webpack'
import { Context } from '@nuxt/types'

require('dotenv').config()

const sass = require('sass')
const fiber = require('fibers')

export default {
  srcDir: './client',

  mode: 'spa',

  head: {
    title: 'admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://s3-ap-northeast-1.amazonaws.com/jiyuujinlab/bakeneko.png'
      }
    ]
  },

  loading: { color: '#fff' },

  build: {
    extend(config: Configuration, { isClient }: Context) {
      if (isClient) {
        config.devtool = '#source-map'
      }
    },
    loaders: {
      scss: {
        implementation: sass,
        sassOptions: {
          fiber: fiber
        }
      }
    },
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')({
          cascade: false,
          grid: true
        }),
        require('cssnano')({
          preset: 'default',
          discardComments: { removeAll: true },
          zindex: false
        })
      ]
    }
  },

  buildModules: [
    [
      '@nuxt/typescript-build',
      {
        typeCheck: true,
        ignoreNotFoundWarnings: true
      }
    ]
  ],

  modules: [
    // '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],

  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/firebase.ts',
    '~/plugins/j-stylebook.ts',
    '~/plugins/composition-api.ts'
    // '~/plugins/vue-toasted.ts'
  ],

  env: {
    NUXT_APP_API_KEY: process.env.NUXT_APP_API_KEY,
    NUXT_APP_AUTH_DOMAIN: process.env.NUXT_APP_AUTH_DOMAIN,
    NUXT_APP_PROJECT_ID: process.env.NUXT_APP_PROJECT_ID
  }
}
