import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'

// Vuex - State
import state from './state'
// Vuex - Mutations
import * as mutations from './mutations'
// Vuex - Actions
import * as actions from './actions'
// Vuex - Getters
import * as getters from './getters'

Vue.use(Vuex);

const store = () => new Vuex.Store({
  state,
  mutations: {
    ...firebaseMutations,
    ...mutations
  },
  actions,
  getters
});

export default store
