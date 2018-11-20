import moment from 'moment'

export default {
  getTimeFormat (time) {
    return moment(time).format('YYYY年MM月DD日')
  },
  getDiffTime (time) {
    if (moment().diff(time, 'day') !== 0) return moment().diff(time, 'day') + 'day'
    if (moment().diff(time, 'hour') !== 0) return moment().diff(time, 'hour') + 'hour'
    if (moment().diff(time, 'minute') !== 0) return moment().diff(time, 'minute') + 'min'
    return moment().diff(time, 'second') + 'sec'
  }
}
