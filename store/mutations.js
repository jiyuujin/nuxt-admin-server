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
 * Tip情報を設定する
 * @param state
 * @param payload
 */
export function setTips (state, payload) {
  state.tips = payload
}

/**
 * Video情報を設定する
 * @param state
 * @param payload
 */
export function setVideos (state, payload) {
  state.videos = payload
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
 * Flight情報を設定する
 * @param state
 * @param payload
 */
export function setFlights (state, payload) {
  state.flights = payload
}

/**
 * Event情報を設定する
 * @param state
 * @param payload
 */
export function setEvents (state, payload) {
  state.events = payload
}

/**
 * Survey情報を設定する
 * @param state
 * @param payload
 */
export function setSurveys (state, payload) {
  state.surveys = payload
}

/**
 * Survey情報を設定する
 * @param state
 * @param payload
 */
export function setContacts (state, payload) {
  state.contacts = payload
}

/**
 * サイト情報を設定する
 * @param state
 * @param payload
 */
export function setSites (state, payload) {
  state.sites = payload
}
