import { Configuration } from 'webpack';
import { Context } from '@nuxt/vue-app';

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
      { rel: 'icon', type: 'image/x-icon', href: 'https://s3-ap-northeast-1.amazonaws.com/jiyuujinlab/bakeneko.png' }
    ]
  },

  loading: {
    color: '#fff'
  },

  build: {
    extend (config: Configuration, { isClient }: Context) {
      if (isClient) {
        config.devtool = '#source-map'
      }
    },
    typescript: {
      typeCheck: true // or ForkTsChecker options
    }
  },

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],

  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/firebase.ts',
  ],

  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.ts'
    }
  },

  css: [
    '~/assets/main.scss',
  ],

  env: {
    NUXT_APP_API_KEY: process.env.NUXT_APP_API_KEY || 'AIzaSyAV7kCXzIPqtKeFnaNz-ywA3NEBUBw7S24',
    NUXT_APP_AUTH_DOMAIN: process.env.NUXT_APP_AUTH_DOMAIN || 'nuxtadmin-4a9e0.firebaseapp.com',
    NUXT_APP_PROJECT_ID: process.env.NUXT_APP_PROJECT_ID || 'nuxt-admin-tokyo',
    NUXT_APP_GRAPH_API: process.env.NUXT_APP_GRAPH_API || 'https://api.graph.cool/simple/v1/cjr94yoay4hds0196reyj9lke',
    NUXT_APP_APOLLO_KEY: process.env.NUXT_APP_APOLLO_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NDgyNDQ3NzQsImNsaWVudElkIjoiY2pyOTR5b2F5NGhkdDAxOTYwajIwdDE1aiJ9.WulBc4uocM_ytX6b6-U9Et_ieGGERE2BpYZVkpaBUlo',
  },
}
