/**
 * Cookieを受け入れる
 * @param state
 */
export function acceptCookie (state) {
  state.isCookieAccepted = true
}

/**
 * ログインユーザステータスを設定する
 * @param state
 * @param payload
 */
export function setUserStatus (state, payload) {
  state.userStatus = payload
}

/**
 * ローディングを設定する
 * @param state
 * @param payload
 */
export function setLoading (state, payload) {
  state.loading = payload
}

/**
 * ダイアログを設定する
 * @param state
 * @param payload
 */
export function setDialog (state, payload) {
  state.dialog = payload
}

/**
 * フライトログ数を設定する
 * @param state
 * @param payload
 */
export function setCount (state, payload) {
  state.count = payload
}

/**
 * Qiita情報を設定する
 * @param state
 * @param payload
 */
export function setQiitas (state, payload) {
  state.qiitas = payload
}

/**
 * サイト情報を設定する
 * @param state
 * @param payload
 */
export function setSites (state, payload) {
  state.sites = payload
}
