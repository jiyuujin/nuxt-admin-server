import { Module, ActionTree, MutationTree } from 'vuex';
import { RootState } from './types';
import { Dictionary, WorkForm, ProductForm, ActivityForm } from '../types/database.types';

const namespaced = true;

export const state = (): State => ({
    works: null,
    products: null,
    activities: null
});

export interface State {
  works: Dictionary<WorkForm> | null;
  products: Dictionary<ProductForm> | null;
  activities: Dictionary<ActivityForm> | null;
}

export interface RootState extends State {
  //
}

export const mutations: MutationTree<State> = {
    setWorks (state, payload) {
        state.works = payload
    },
    setProducts (state, payload) {
        state.products = payload
    },
    setActivities (state, payload) {
        state.activities = payload
    },
};

export const actions: RootActionTree<State, RootState> = {
    async fetchWorks ({ commit }, responseData) {
        await commit('setWorks', responseData)
    },
    async fetchProducts ({ commit }, responseData) {
        await commit('setProducts', responseData)
    },
    async fetchActivities ({ commit }, responseData) {
        await commit('setActivities', responseData)
    }
};

export interface RootActionTree<State, RootState> extends ActionTree<State, RootState> {
  fetchWorks(
    { commit },
    responseData
  ): Promise<void>;
  fetchProducts(
    { commit },
    responseData
  ): Promise<void>;
  fetchActivities(
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
