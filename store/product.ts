import { Module, ActionTree, MutationTree } from 'vuex';
import { RootState } from './types';
import Firestore from '~/plugins/firebase';
import firebase from 'firebase';
import moment from 'moment';
import { SweetAlertResult } from 'sweetalert2';
import { Dictionary, ItemDataList, TipForm, FlightForm, EventForm, ContactForm } from '~/types/database.types'
import { setDialog, isValidText } from '~/store/utils';

const adminFirestore = Firestore.firestore();
const tipsCollection = adminFirestore.collection('tips');
const flightsCollection = adminFirestore.collection('flights');
const eventsCollection = adminFirestore.collection('events');
const contactsCollection = adminFirestore.collection('contacts');

const PAGE_SIZE = 20;

const ERROR_DIALOG = true;

const namespaced = true;

export const state = (): State => ({
  isCookieAccepted: false,
  userStatus: false,
  loading: null,
  dialog: false,
  tips: null,
  flights: null,
  events: null,
  contacts: null
});

export interface State {
  isCookieAccepted: boolean | false;
  userStatus: boolean | false;
  loading: string | null;
  dialog: boolean | false;
  tips: Dictionary<TipForm> | null;
  flights: Dictionary<FlightForm> | null;
  events: Dictionary<EventForm> | null;
  contacts: Dictionary<ContactForm> | null;
}

export interface RootState extends State {
  //
}

export const mutations: MutationTree<State> = {
  acceptCookie (state) {
    state.isCookieAccepted = true
  },
  setUserStatus (state, payload) {
    state.userStatus = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setDialog (state, payload) {
    state.dialog = payload
  },
  setTips (state, payload) {
    state.tips = payload
  },
  setFlights (state, payload) {
    state.flights = payload
  },
  setEvents (state, payload) {
    state.events = payload
  },
  setContacts (state, payload) {
    state.contacts = payload
  }
};

export const actions: RootActionTree<State, RootState> = {
  async signIn ({ commit }, params) {
    await firebase.auth()
      .signInWithEmailAndPassword(params.email, params.password)
      .then(response => {
        commit('setUserStatus', true)
      })
      .catch(error => {
        // console.log(error)
      })
  },
  async signOut ({ commit }) {
    await firebase.auth()
      .signOut()
      .then(response => {
        commit('setUserStatus', false)
      })
      .catch(error => {
        // console.log(error)
      })
  },
  initTips ({ commit }, params) {
    commit('setLoading', true)

    if (params) {
      tipsCollection.where('event', '==', params.event).get()
        .then(snapshot => {
          let result: ItemDataList = {
            item: []
          }
          let i = 1
          snapshot.forEach(doc => {
            // console.log(doc.id + ' ' + doc.data())
            result.item.push({
              id: doc.id,
              data: doc.data(),
              page: Math.ceil(i / PAGE_SIZE)
            })
            i++
          })

          commit('setTips', result)
        })
        .catch(error => {
          // console.log(error)
          commit('setTips', null)

          setDialog(ERROR_DIALOG, '取得に失敗しました')
        })

      return commit('setLoading', false)
    }

    tipsCollection.orderBy('time', 'desc').get()
      .then(snapshot => {
        let result: ItemDataList = {
          item: []
        }
        let i = 1
        snapshot.forEach(doc => {
          // console.log(doc.id + ' ' + doc.data())
          result.item.push({
            id: doc.id,
            data: doc.data(),
            page: Math.ceil(i / PAGE_SIZE)
          })
          i++
        })

        commit('setTips', result)
      })
      .catch(error => {
        // console.log(error)
        commit('setTips', null)

        setDialog(ERROR_DIALOG, '取得に失敗しました')
      })

    return commit('setLoading', false)
  },
  addTip (ctx, { title, url, description, tags, event, time }) {
    if (isValidText(title)) {
      return setDialog(ERROR_DIALOG, '入力してください')
    }

    tipsCollection.add({
      'title': title,
      'url': url,
      'description': description,
      'tags': tags,
      'event': event,
      'time': time
    })

    return setDialog(!ERROR_DIALOG, title + '追加しました')
  },
  updateTip (ctx, { key, data }) {
    tipsCollection.doc(key).set({
      title: data.title,
      url: data.url,
      description: data.description,
      tags: data.tags,
      event: data.event,
      time: data.time
    })

    return setDialog(!ERROR_DIALOG, data.title + '更新しました')
  },
  removeTip (ctx, { key, data }) {
    tipsCollection.doc(key).delete()

    return setDialog(!ERROR_DIALOG, data.title + '削除しました')
  },
  initFlights ({ commit }, params) {
    // ローディングを開始する
    commit('setLoading', true)

    if (params.boardingType !== 0) {
      flightsCollection.where('boardingType', '==', params.boardingType).get()
        .then(snapshot => {
          let result: ItemDataList = {
            item: []
          }
          let i = 1
          snapshot.forEach(doc => {
            // console.log(doc.id + ' ' + doc.data())
            result.item.push({
              id: doc.id,
              data: doc.data(),
              page: Math.ceil(i / PAGE_SIZE)
            })
            i++
          })

          commit('setFlights', result)
        })
        .catch(error => {
          // console.log(error)
          commit('setFlights', null)

          setDialog(ERROR_DIALOG, '取得に失敗しました')
        })

      return commit('setLoading', false)
    }

    flightsCollection.orderBy('time', 'desc').get()
      .then(snapshot => {
        let result: ItemDataList = {
          item: []
        }
        let i = 1

        if (params.year === 0) {
          snapshot.forEach(doc => {
            // console.log(doc.id + ' ' + doc.data())
            result.item.push({
              id: doc.id,
              data: doc.data(),
              page: Math.ceil(i / PAGE_SIZE)
            })
            i++
          })
        } else {
          snapshot.forEach(doc => {
            // console.log(doc.id + ' ' + doc.data())
            if (moment(doc.data().time).format('YYYY') == params.year) {
              result.item.push({
                id: doc.id,
                data: doc.data(),
                page: Math.ceil(i / PAGE_SIZE)
              })
              i++
            }
          })
        }

        commit('setFlights', result)
      })
      .catch(error => {
        // console.log(error)
        commit('setFlights', null)

        setDialog(ERROR_DIALOG, '取得に失敗しました')
      })
      .finally(() => {
        commit('setLoading', false)
      })
  },
  addFlight (ctx, { time, departure, arrival, airline, boardingType, registration }) {
    if (isValidText(registration)) {
      return setDialog(ERROR_DIALOG, '入力してください')
    }

    flightsCollection.add({
      time: time,
      departure: departure,
      arrival: arrival,
      airline: airline,
      boardingType: boardingType,
      registration: registration
    })

    return setDialog(!ERROR_DIALOG, registration + '追加しました')
  },
  updateFlight (ctx, { key, data }) {
    flightsCollection.doc(key).set({
      time: data.time,
      departure: data.departure,
      arrival: data.arrival,
      airline: data.airline,
      boardingType: data.boardingType,
      registration: data.registration
    })

    return setDialog(!ERROR_DIALOG, data.registration + '更新しました')
  },
  removeFlight (ctx, { key, data }) {
    flightsCollection.doc(key).delete()

    return setDialog(!ERROR_DIALOG, data.registration + '削除しました')
  },
  initEvents ({ commit }) {
    commit('setLoading', true)

    eventsCollection.orderBy('id', 'asc').get()
      .then(snapshot => {
        let result: ItemDataList = {
          item: []
        }
        let i = 1
        snapshot.forEach(doc => {
          // console.log(doc.id + ' ' + doc.data())
          result.item.push({
            id: doc.id,
            data: doc.data(),
            page: Math.ceil(i / PAGE_SIZE)
          })
          i++
        })

        commit('setEvents', result)
      })
      .catch(error => {
        // console.log(error)
        commit('setEvents', null)

        setDialog(ERROR_DIALOG, '取得に失敗しました')
      })

    commit('setLoading', false)
  },
  addEvent ({ state }, { name, url, locale }) {
    if (isValidText(name)) {
      return setDialog(ERROR_DIALOG, '入力してください')
    }

    if (!state.events) {
      return setDialog(ERROR_DIALOG, 'イベントを設定ください')
    }

    const next = state.events.item.length + 1

    eventsCollection.add({
      'id': next,
      'name': name,
      'url': url,
      'locale': locale
    })

    return setDialog(!ERROR_DIALOG, name + '追加しました')
  },
  initContacts ({ commit }, params) {
    commit('setLoading', true)

    if (params) {
      contactsCollection.where('category.value', '==', params.contactCategory).get()
        .then(snapshot => {
          let result: ItemDataList = {
            item: []
          }
          let i = 1
          snapshot.forEach(doc => {
            // console.log(doc.id + ' ' + doc.data())
            result.item.push({
              id: doc.id,
              data: doc.data(),
              page: Math.ceil(i / PAGE_SIZE)
            })
            i++
          })

          commit('setContacts', result)
        })
        .catch(error => {
          // console.log(error)
          commit('setContacts', null)

          setDialog(ERROR_DIALOG, '取得に失敗しました')
        })

      return commit('setLoading', false)
    }

    contactsCollection.orderBy('time', 'desc').get()
      .then(snapshot => {
        let result: ItemDataList = {
          item: []
        }
        let i = 1
        snapshot.forEach(doc => {
          // console.log(doc.id + ' ' + doc.data())
          result.item.push({
            id: doc.id,
            data: doc.data(),
            page: Math.ceil(i / PAGE_SIZE)
          })
          i++
        })

        commit('setContacts', result)
      })
      .catch(error => {
        // console.log(error)
        commit('setContacts', null)

        setDialog(ERROR_DIALOG, '取得に失敗しました')
      })

    commit('setLoading', false)
  },
  addDialog ({ commit }) {
    commit('setDialog', true)
  },
  removeDialog ({ commit }) {
    commit('setDialog', false)
  }
}

export interface RootActionTree<State, RootState> extends ActionTree<State, RootState> {
  signIn(
    { commit }, params
  ): void;
  signOut(
    { commit }
  ): void;
  initTips(
    { commit }, params
  ): Promise<void>;
  addTip(
    ctx, { title, url, description, tags, event, time }
  ): Promise<SweetAlertResult>;
  updateTip(
    ctx, { key, data }
  ): Promise<SweetAlertResult>;
  removeTip(
    ctx, { key, data }
  ): Promise<SweetAlertResult>;
  initFlights(
    { commit }, params
  ): void;
  addFlight(
    ctx, { time, departure, arrival, airline, boardingType, registration }
  ): Promise<SweetAlertResult>;
  updateFlight(
    ctx, { key, data }
  ): Promise<SweetAlertResult>;
  removeFlight(
    ctx, { key, data }
  ): Promise<SweetAlertResult>;
  initEvents(
    { commit }
  ): void;
  addEvent(
    { state }, { name, url, locale }
  ): Promise<SweetAlertResult>;
  initContacts(
    { commit }, params
  ): void;
  addDialog(
    { commit }
  ): void;
  removeDialog(
    { commit }
  ): void;
}

export const getters = {
  //
};

export const product: Module<State, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
};
