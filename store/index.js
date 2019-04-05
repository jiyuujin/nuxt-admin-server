import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import { productModule } from './product'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    namespaced: true,
    product: productModule
  }
});

// export default store
