import { Module, ActionTree, MutationTree } from 'vuex';
import { RootState } from './types';
import { Dictionary, WorkForm } from '~/types/database.types';

const namespaced = true;

export const state = (): State => ({
  works: null,
});

export interface State {
  works: Dictionary<WorkForm> | null;
}

export interface RootState extends State {
  //
}

export const mutations: MutationTree<State> = {
  setWorks (state, payload) {
    state.works = payload
  },
};

export const actions: RootActionTree<State, RootState> = {
  async fetchProfile ({ commit }, responseData) {
    await commit('setWorks', responseData.allWorks)
  }
};

export interface RootActionTree<State, RootState> extends ActionTree<State, RootState> {
  fetchProfile(
    { commit },
    responseData
  ): Promise<void>;
}

export const getters = {
  //
};

export const profile: Module<State, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
};
