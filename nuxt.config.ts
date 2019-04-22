import { Configuration } from 'webpack';
import { Context } from '@nuxt/vue-app';

export default {
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
    extend (config: Configuration, { isClient }: Context) {
      if (isClient) {
        config.devtool = '#source-map'
      }
    },
    typescript: {
      typeCheck: false // or ForkTsChecker options
    }
  },

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'nuxt-purgecss'
  ],

  plugins: [
    '~plugins/axios.ts',
    '~plugins/firebase.ts',
  ],

  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.ts'
    }
  },

  purgeCSS: {
    //
  },

  css: [
    '~/assets/main.scss',
  ],

  env: {
    API_KEY: process.env.API_KEY || 'AIzaSyAV7kCXzIPqtKeFnaNz-ywA3NEBUBw7S24',
    AUTH_DOMAIN: process.env.AUTH_DOMAIN || 'nuxtadmin-4a9e0.firebaseapp.com',
    PROJECT_ID: process.env.PROJECT_ID || 'nuxt-admin-tokyo',
    GRAPH_API: process.env.GRAPH_API || 'https://api.graph.cool/simple/v1/cjr94yoay4hds0196reyj9lke',
    APOLLO_KEY: process.env.APOLLO_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NDgyNDQ3NzQsImNsaWVudElkIjoiY2pyOTR5b2F5NGhkdDAxOTYwajIwdDE1aiJ9.WulBc4uocM_ytX6b6-U9Et_ieGGERE2BpYZVkpaBUlo',
  },
}
