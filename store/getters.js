/**
 * ログインユーザステータスを取得する
 * @param state
 * @returns {boolean}
 */
export function userStatus (state) {
  return state.userStatus
}

/**
 * Tip情報を取得する
 * @param state
 * @returns {any[]}
 */
export function tips (state) {
  return state.tips
}

/**
 * Qiita情報を取得する
 * @param state
 * @returns {null|*|Array}
 */
export function qiitas (state) {
  return state.qiitas
}

/**
 * Flight情報を取得する
 * @param state
 * @returns {any[]}
 */
export function flights (state) {
  return state.flights
}

/**
 * Image情報を取得する
 * @param state
 * @returns {T[]}
 */
export function images (state) {
  return state.images
}

/**
 * Sites情報を取得する
 * @param state
 * @returns {Array}
 */
export function sites (state) {
  return state.sites
}
