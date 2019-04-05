'use strict';

import Firestore from '~/plugins/firebase'
import firebase from 'firebase'
// import { firebaseAction } from 'vuexfire'
import Cookies from 'js-cookie'
import axios from 'axios'
import moment from 'moment'

import { setDialog, isValidText, isValidNumber, isValidArray } from './utils';

import { CATEGORIES } from '~/utils/index';

const adminFirestore = Firestore.firestore();
// adminFirestore.settings({
//   timestampsInSnapshots: true
// });

// Firestore Collections
const CONTACT_COLLECTION = 'contacts';
const EVENT_COLLECTION = 'events';
const FLIGHT_COLLECTION = 'flights';
const TIP_COLLECTION = 'tips';
const VIDEO_COLLECTION = 'videos';

const contactsCollection = adminFirestore.collection(CONTACT_COLLECTION);
const eventsCollection = adminFirestore.collection(EVENT_COLLECTION);
const flightsCollection = adminFirestore.collection(FLIGHT_COLLECTION);
const tipsCollection = adminFirestore.collection(TIP_COLLECTION);
const videosCollection = adminFirestore.collection(VIDEO_COLLECTION);

// Qiita Basic API
const QIITA_BASE_API = 'https://qiita.com/api/v2/tags/';

// Qiita Option
const QIITA_OPTION = {
  headers: {
    'Content-Type': 'application/json'
  }
};

// Page Size
const PAGE_SIZE = 20;

// Error Dialog
const ERROR_DIALOG = true;

export const state = () => ({
  isCookieAccepted: false,
  userStatus: false,
  token: null,
  loading: null,
  dialog: false,
  tips: null,
  videos: null,
  qiitas: [],
  flights: null,
  events: null,
  contacts: null
});

export const mutations = {
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
  setVideos (state, payload) {
    state.videos = payload
  },
  setQiitas (state, payload) {
    state.qiitas = payload
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

export const actions = {
  async signIn ({ commit }, params) {
    await firebase.auth()
      .signInWithEmailAndPassword(params.email, params.password)
      .then(response => {
        // ログインユーザステータスをtrueに更新する
        commit('setUserStatus', true)
      })
      .catch(error => {
        console.log(error)
      })
  },
  async signOut ({ commit }) {
    await firebase.auth()
      .signOut()
      .then(response => {
        // ログインユーザステータスをfalseに更新する
        commit('setUserStatus', false)
      })
      .catch(error => {
        console.log(error)
      })
  },
  initContacts ({ bindFirebaseRef, commit }, params) {
    // ローディングを開始する
    commit('setLoading', true)

    if (params) {
      contactsCollection.where('category.value', '==', params.contactCategory).get()
        .then(snapshot => {
          let result = {
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

      // ローディングを終了する
      return commit('setLoading', false)
    }

    contactsCollection.orderBy('time', 'desc').get()
      .then(snapshot => {
        let result = {
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

    // ローディングを終了する
    commit('setLoading', false)
  },
  initEvents ({ bindFirebaseRef, commit }) {
    // ローディングを開始する
    commit('setLoading', true)

    eventsCollection.orderBy('id', 'asc').get()
      .then(snapshot => {
        let result = {
          item: []
        }
        snapshot.forEach(doc => {
          // console.log(doc.id + ' ' + doc.data())
          result.item.push({
            value: doc.data().id,
            text: doc.data().name
          })
        })

        commit('setEvents', result)
      })
      .catch(error => {
        // console.log(error)
        commit('setEvents', null)

        setDialog(ERROR_DIALOG, '取得に失敗しました')
      })

    // ローディングを終了する
    commit('setLoading', false)
  },
  addEvent ({ ctx, state }, { name, url, locale }) {
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
  initFlights ({ bindFirebaseRef, commit }, params) {
    // ローディングを開始する
    commit('setLoading', true)

    if (params.boardingType !== 0) {
      flightsCollection.where('boardingType', '==', params.boardingType).get()
        .then(snapshot => {
          let result = {
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

      // ローディングを終了する
      return commit('setLoading', false)
    }

    flightsCollection.orderBy('time', 'desc').get()
      .then(snapshot => {
        let result = {
          item: []
        }
        let i = 1

        // snapshot.forEach(doc => {
        //   // console.log(doc.id + ' ' + doc.data())
        //   result.item.push({
        //     id: doc.id,
        //     data: doc.data(),
        //     page: Math.ceil(i / PAGE_SIZE)
        //   })
        //   i++
        // })

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
        // ローディングを終了する
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
  initTips ({ bindFirebaseRef, commit }, params) {
    // ローディングを開始する
    commit('setLoading', true)

    if (params) {
      tipsCollection.where('event', '==', params.event).get()
        .then(snapshot => {
          let result = {
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

      // ローディングを終了する
      return commit('setLoading', false)
    }

    tipsCollection.orderBy('time', 'desc').get()
      .then(snapshot => {
        let result = {
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

    // ローディングを終了する
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
  initVideos ({ bindFirebaseRef, commit }) {
    // ローディングを開始する
    commit('setLoading', true)

    videosCollection.orderBy('title', 'asc').get()
      .then(snapshot => {
        let result = {
          item: []
        }
        let i = 0
        snapshot.forEach(doc => {
          // console.log(doc.id + ' ' + doc.data())
          result.item.push({
            id: doc.id,
            data: doc.data(),
            page: Math.ceil(i / PAGE_SIZE)
          })
        })
        commit('setVideos', result)
      })
      .catch(error => {
        // console.log(error)
        commit('setVideos', null)

        setDialog(ERROR_DIALOG, '取得に失敗しました')
      })

    // ローディングを終了する
    commit('setLoading', false)
  },
  addVideo (ctx, { title, event, videoPath }) {
    if (isValidText(title)) {
      return setDialog(ERROR_DIALOG, '入力してください')
    }

    if (isValidText(videoPath)) {
      return setDialog(ERROR_DIALOG, 'イベントを設定ください')
    }

    // 正規表現を使ってIDだけ取り出す
    const result = videoPath.match(/([^?v=]+)/g)

    videosCollection.add({
      'title': title,
      'event': event,
      'videoID': result[result.length - 1]
    })

    return setDialog(!ERROR_DIALOG, title + '追加しました')
  },
  initQiitas ({ commit }, params) {
    // ローディングを開始する
    commit('setLoading', true)

    const tagName = CATEGORIES.find(category => {
      if (category.value === params.tag) {
        return category
      }
    }).text

    axios.get(QIITA_BASE_API + tagName + '/items?page=' + params.page, QIITA_OPTION)
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
      .finally(() => {
        // ローディングを終了する
        commit('setLoading', false)
      })
  },
  addDialog ({ commit }) {
    // ダイアログを追加する
    commit('setDialog', true)
  },
  removeDialog ({ commit }) {
    // ダイアログを削除する
    commit('setDialog', false)
  }
}

export const getters = {
  //
}

export const productModule = {
  state,
  mutations,
  actions,
  getters
}
