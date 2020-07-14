import { Module, ActionTree, MutationTree } from 'vuex'

const namespaced = true

type RootState = {
  version: string
}

export const state = (): State => ({
  isCookieAccepted: false
})

interface State {
  isCookieAccepted: boolean | false
}

export const mutations: MutationTree<State> = {
  acceptCookie(state) {
    state.isCookieAccepted = true
  }
}

export const actions: RootActionTree<State, RootState> = {
  async accept({ commit }) {
    commit('acceptCookie')
  }
}

export interface RootActionTree<State, RootState>
  extends ActionTree<State, RootState> {
  accept({ commit }): Promise<void>
}

export const getters = {
  //
}

export const cookie: Module<State, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
