export function isValid (value) {
  if (value === '') {
    return true
  } else {
    return false
  }
}

export function isValidWithArray (array) {
  if (array.length === 0) {
    return true
  } else {
    return false
  }
}

export default {
  isValid (val) {
    if (val === '') {
      return true
    } else {
      return false
    }
  },
  isValidWithArray (array) {
    if (array.length === 0) {
      return true
    } else {
      return false
    }
  }
}
