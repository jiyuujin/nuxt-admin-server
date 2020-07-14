import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

import { cookie } from './cookie'
import { product } from './product'

Vue.use(Vuex)

type RootState = {
  version: string
}

const store: StoreOptions<RootState> = {
  modules: {
    cookie: cookie,
    product: product
  },
  state: {
    version: '1.0.0'
  }
}

export const createStore = () => {
  return new Vuex.Store<RootState>(store)
}

// export default createStore
