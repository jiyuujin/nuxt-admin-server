import Admin from '~/plugins/firebase'
import { firebaseAction } from 'vuexfire'
import Cookies from 'js-cookie'
import axios from 'axios'

const adminDB = Admin.database();
// tipsデータベース
const tipsRef = adminDB.ref('/tips');
// flightsデータベース
const flightsRef = adminDB.ref('/flights');
// imagesデータベース
const imagesRef = adminDB.ref('/images');
// videosデータベース
const videosRef = adminDB.ref('/videos');

const YEAR = ['2019', '2018', '2017', '2016', '2015'];

// Qiita Basic URL
const BASE_URL = 'https://qiita.com/api/v2/tags/';

const qiitaOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
};

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
  commit('setDialog', true)

  // console.log('DIALOG TRUE')
};

/**
 * ダイアログを削除する
 * @type {Function}
 */
export const removeDialog = ({ commit }) => {
  commit('setDialog', false)

  // console.log('DIALOG FALSE')
};

/**
 * Tip情報を取得する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const initTips = firebaseAction(({ bindFirebaseRef, commit }) => {
  // ローディングを開始する
  commit('setLoading', true)

  // Sort by time
  bindFirebaseRef('tips', tipsRef.orderByChild('time'))

  // ローディングを終了する
  commit('setLoading', false)
});

/**
 * Tip情報を追加する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const addTip = firebaseAction((ctx, { title, url, description, tags, event, time }) => {
  tipsRef.push({
    title,
    url,
    description,
    tags,
    event,
    time
  })
});

/**
 * Tip情報を更新する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const updateTip = firebaseAction((ctx, { key, data }) => {
  let postData = {
    title: data.title,
    url: data.url,
    description: data.description,
    tags: data.tags,
    event: data.event,
    time: data.time
  }
  let updates = {}
  updates['/tips/' + key] = postData
  adminDB.ref().update(updates)
});

/**
 * Tip情報を削除する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const removeTip = firebaseAction((ctx, { key, data }) => {
  let updates = {}
  // data には null が入ります
  updates['/tips/' + key] = data
  adminDB.ref().update(updates)
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

  // Sort by time
  bindFirebaseRef('flights', flightsRef.orderByChild('time'))

  let counts = []
  YEAR.forEach(y => {
    flightsRef.orderByChild('time').startAt(y).endAt(y + '\uf8ff').once("value", function(snap) {
      counts.push(snap.numChildren())
    })
  })
  commit('setCount', counts)

  // ローディングを終了する
  commit('setLoading', false)
});

/**
 * Flight情報を追加する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const addFlight = firebaseAction((ctx, { time, departure, arrival, airline, boardingType, registration }) => {
  flightsRef.push({
    time,
    departure,
    arrival,
    airline,
    boardingType,
    registration
  })
});

/**
 * Flight情報を更新する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const updateFlight = firebaseAction((ctx, { key, data }) => {
  let postData = {
    time: data.time,
    departure: data.departure,
    arrival: data.arrival,
    airline: data.airline,
    boardingType: data.boardingType,
    registration: data.registration
  }
  let updates = {}
  updates['/flights/' + key] = postData
  adminDB.ref().update(updates)
});

/**
 * Flight情報を削除する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const removeFlight = firebaseAction((ctx, { key, data }) => {
  let updates = {}
  // data には null が入ります
  updates['/flights/' + key] = data
  adminDB.ref().update(updates)
});

/**
 * Image情報を取得する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const initImages = firebaseAction(({ bindFirebaseRef, commit }) => {
  // ローディングを開始する
  commit('setLoading', true)

  // Sort by time
  bindFirebaseRef('images', imagesRef.orderByChild('time'))

  // ローディングを終了する
  commit('setLoading', false)
});

/**
 * Image情報を追加する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const addImage = firebaseAction((ctx, { time, title, imagePath }) => {
  imagesRef.push({
    time,
    title: title,
    imagePath: imagePath
  })
});

/**
 * Video情報を取得する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const initVideos = firebaseAction(({ bindFirebaseRef, commit }) => {
  // ローディングを開始する
  commit('setLoading', true)

  // Sort by time
  bindFirebaseRef('videos', videosRef.orderByChild('title'))

  // ローディングを終了する
  commit('setLoading', false)
});

/**
 * Video情報を追加する
 * @type {(context: ActionContext<any, any>, payload: any) => any}
 */
export const addVideo = firebaseAction((ctx, { title, event, videoPath }) => {
  // 正規表現を使ってIDだけ取り出す
  const result = videoPath.match(/([^?v=]+)/g)

  videosRef.push({
    title: title,
    event: event,
    videoID: result[result.length - 1]
  })
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
