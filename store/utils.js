import swal from 'sweetalert2'

/**
 * ダイアログを設定する
 * @param error
 * @param title
 * @returns {Promise<any>|Promise<SweetAlertResult>}
 */
export function setDialog (error, title) {
  if (error) {
    return swal({
      type: 'error',
      title: title + 'を入力してください'
    })
  }

  return swal({
    title: title
  })
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
