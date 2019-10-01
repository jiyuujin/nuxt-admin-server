import Vue from 'vue'

/**
 * ダイアログを設定する
 * @param error
 * @param title
 * @returns {Promise<any>|Promise<void>}
 */
export function setDialog (error, title) {
    if (error) {
        setTimeout(() => {
            Vue.toasted.error(`${title}を入力してください`)
        }, 5000)
        Vue.toasted.clear()
    }

    setTimeout(() => {
        Vue.toasted.error(title)
    }, 5000)
    Vue.toasted.clear()
}

/**
 * 文字列のバリデーション
 * @param value
 * @returns {boolean}
 */
export function isValidText (value) {
    if (value === '') {
        return true
    } else {
        return false
    }
}

/**
 * 数値のバリデーション
 * @param value
 * @returns {boolean}
 */
export function isValidNumber (value) {
    if (value === '') {
        return true
    } else {
        return false
    }
}

/**
 * 配列のバリデーション
 * @param array
 * @returns {boolean}
 */
export function isValidArray (array) {
    if (array.length === 0) {
        return true
    } else {
        return false
    }
}

export default {}
