// import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types'

// Modules
import { product } from './product'
import { profile } from './profile'
import { qiita } from './qiita'

// Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    'product': product,
    'profile': profile,
    'qiita': qiita,
  },
  state: {
    version: '1.0.0'
  }
}

export const createStore = () => {
  return new Vuex.Store<RootState>(store)
}

// export default createStore
