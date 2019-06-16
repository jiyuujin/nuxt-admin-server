import { Module, ActionTree, MutationTree } from 'vuex';
import axios from 'axios';
import { RootState } from './types';
import { Dictionary, QiitaForm } from '../types/database.types';
import { CATEGORIES } from '../utils';
import { setDialog } from './utils';

const QIITA_BASE_API = 'https://qiita.com/api/v2/tags/';
const ERROR_DIALOG = true;

const namespaced = true;

export const state = (): State => ({
  qiitas: null,
});

export interface State {
  qiitas: Dictionary<QiitaForm> | null;
}

export interface RootState extends State {
  //
}

export const mutations: MutationTree<State> = {
  setQiitas (state, payload) {
    state.qiitas = payload
  },
};

export const actions: RootActionTree<State, RootState> = {
  fetchQiitas ({ commit }, params) {
    let tagName: string = '';

    CATEGORIES.forEach(category => {
      if (category.value === params.tag) {
        tagName = category.text
      }
    });

    axios.get(QIITA_BASE_API + tagName + '/items?page=' + params.page, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (params.search !== '') {
          // 検索している時
          const searchPost = response.data.filter(item => {
            if (item.title.includes(params.search) === true) return item
          })

          return commit('setQiitas', searchPost)
        }

        commit('setQiitas', response.data)
      })
      .catch(error => {
        // console.log(error)

        setDialog(ERROR_DIALOG, '取得に失敗しました')
      })
  }
};

export interface RootActionTree<State, RootState> extends ActionTree<State, RootState> {
  fetchQiitas(
    { commit }, params
  ): void;
}

export const getters = {
  //
};

export const qiita: Module<State, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
};
