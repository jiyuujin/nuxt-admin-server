'use strict';

import Firestore from '~/plugins/firebase'
import { firebaseAction } from 'vuexfire'
import Cookies from 'js-cookie'
import axios from 'axios'
import { setDialog, isValidText, isValidNumber, isValidArray } from './utils'

const adminFirestore = Firestore.firestore();
adminFirestore.settings({
  timestampsInSnapshots: true
});

const ERROR_DIALOG = true

const PAGE_SIZE = 20

// tipsデータベース
const tipsCollection = adminFirestore.collection('tips');

// videosデータベース
const videosCollection = adminFirestore.collection('videos')

// eventsデータベース
const eventsCollection = adminFirestore.collection('events')

// surveysデータベース
const surveysCollection = adminFirestore.collection('surveys')

// Qiita Basic URL
const BASE_URL = 'https://qiita.com/api/v2/tags/';

const qiitaOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
};

// flightsデータベース
const flightsCollection = adminFirestore.collection('flights')

// Netlify Basic URL
const NETLIFY_URL = 'https://api.netlify.com/api/v1/';

const netlifyOptions = {
  headers: {
    'Content-Type': 'application/json',
    'common': {
      'Authorization': `Bearer ${process.env.NETLIFY_TOKEN}`
    }
  }
};

/**
 * ログインユーザステータスを更新する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const setUserStatus = firebaseAction (({ commit }, payload) => {
  commit('setUserStatus', payload)

  if (!payload) {
    Cookies.remove('token')
  } else {
    Cookies.set('token', payload, { expires: 365 })
  }
});

/**
 * ダイアログを追加する
 * @type {Function}
 */
export const addDialog = ({ commit }) => {
  // ダイアログを追加する
  commit('setDialog', true)
};

/**
 * ダイアログを削除する
 * @type {Function}
 */
export const removeDialog = ({ commit }) => {
  // ダイアログを削除する
  commit('setDialog', false)
};

/**
 * Tip情報を取得する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const initTips = firebaseAction(({ bindFirebaseRef, commit }, params) => {
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
});

/**
 * Tip情報を追加する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const addTip = firebaseAction((ctx, { title, url, description, tags, event, time }) => {
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
});

/**
 * Tip情報を更新する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const updateTip = firebaseAction((ctx, { key, data }) => {
  tipsCollection.doc(key).set({
    title: data.title,
    url: data.url,
    description: data.description,
    tags: data.tags,
    event: data.event,
    time: data.time
  })

  return setDialog(!ERROR_DIALOG, data.title + '更新しました')
});

/**
 * Tip情報を削除する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const removeTip = firebaseAction((ctx, { key, data }) => {
  tipsCollection.doc(key).delete()

  return setDialog(!ERROR_DIALOG, data.title + '削除しました')
});

/**
 * Qiita情報を取得する
 * @param commit
 * @param params
 */
export const initQiitas = ({ commit }, params) => {
  // ローディングを開始する
  commit('setLoading', true)

  axios.get(BASE_URL + params.tag + '/items?page=' + params.page, qiitaOptions)
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
};

/**
 * Flight情報を取得する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const initFlights = firebaseAction(({ bindFirebaseRef, commit }) => {
  // ローディングを開始する
  commit('setLoading', true)

  flightsCollection.orderBy('time', 'desc').get()
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
  commit('setLoading', false)
});

/**
 * Flight情報を追加する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const addFlight = firebaseAction((ctx, { time, departure, arrival, airline, boardingType, registration }) => {
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
});

/**
 * Flight情報を更新する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const updateFlight = firebaseAction((ctx, { key, data }) => {
  flightsCollection.doc(key).set({
    time: data.time,
    departure: data.departure,
    arrival: data.arrival,
    airline: data.airline,
    boardingType: data.boardingType,
    registration: data.registration
  })

  return setDialog(!ERROR_DIALOG, data.registration + '更新しました')
});

/**
 * Flight情報を削除する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const removeFlight = firebaseAction((ctx, { key, data }) => {
  flightsCollection.doc(key).delete()

  return setDialog(!ERROR_DIALOG, data.registration + '削除しました')
});

/**
 * Video情報を取得する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const initVideos = firebaseAction(({ bindFirebaseRef, commit }) => {
  // ローディングを開始する
  commit('setLoading', true)

  videosCollection.get()
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
});

/**
 * Video情報を追加する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const addVideo = firebaseAction((ctx, { title, event, videoPath }) => {
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
});

/**
 * Event情報を取得する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const initEvents = firebaseAction(({ bindFirebaseRef, commit }) => {
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
});

/**
 * Event情報を追加する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const addEvent = firebaseAction(({ ctx, state }, { name, url, locale }) => {
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
});

/**
 * Survey情報を取得する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const initSurveys = firebaseAction(({ bindFirebaseRef, commit }, params) => {
  // ローディングを開始する
  commit('setLoading', true)

  if (params) {
    surveysCollection.where('type', '==', params.event).get()
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

        commit('setSurveys', result)
      })
      .catch(error => {
        // console.log(error)
        commit('setSurveys', null)

        setDialog(ERROR_DIALOG, '取得に失敗しました')
      })

    // ローディングを終了する
    return commit('setLoading', false)
  }

  surveysCollection.orderBy('time', 'desc').get()
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

      commit('setSurveys', result)
    })
    .catch(error => {
      // console.log(error)
      commit('setSurveys', null)

      setDialog(ERROR_DIALOG, '取得に失敗しました')
    })

  // ローディングを終了する
  commit('setLoading', false)
});

/**
 * Site情報を取得する
 * @param commit
 */
export const initSites = ({ commit }) => {
  // ローディングを開始する
  commit('setLoading', true)

  axios.get(NETLIFY_URL + '/sites', netlifyOptions)
    .then(response => {
      // サイト情報を設定する
      commit('setSites', response.data)

      // console.log(response.data)
    })
    .catch(error => {
      // console.log(error)
    })
    .finally(() => {
      // ローディングを終了する
      commit('setLoading', false)
    })
};
