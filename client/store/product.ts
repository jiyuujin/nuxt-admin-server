import { Module, ActionTree, MutationTree } from 'vuex'
import { signIn, signOut } from '~/services/authService'

const namespaced = true

type RootState = {
    version: string
}

export const state = (): State => ({
    isCookieAccepted: false,
    userStatus: false
})

interface State {
    isCookieAccepted: boolean | false;
    userStatus: boolean | false
}

export const mutations: MutationTree<State> = {
    acceptCookie (state) {
        state.isCookieAccepted = true
    },
    setUserStatus (state, payload) {
        state.userStatus = payload
    }
}

export const actions: RootActionTree<State, RootState> = {
    async signIn({ commit }, params) {
        if (await signIn(params)) {
            commit('setUserStatus', true)
        }
    },
    async signOut({ commit }) {
        if (await signOut()) {
            commit('setUserStatus', false)
        }
    }
}

export interface RootActionTree<State, RootState> extends ActionTree<State, RootState> {
    signIn(
        { commit }, params
    ): Promise<void>
    signOut(
        { commit }
    ): Promise<void>
}

export const getters = {
    //
}

export const product: Module<State, RootState> = {
    namespaced,
    state,
    mutations,
    actions,
    getters
}
