import dayjs from 'dayjs'

/**
 * dayjs形式を取得する
 * @param time
 * @returns {*}
 */
export function getTimeFormat(time) {
  return dayjs(time).format('YYYY/MM/DD')
}

/**
 * 時間の差を取得する
 * @param time
 * @returns {string}
 */
export function getDiffTime(time) {
  if (dayjs().diff(time, 'day') !== 0) return dayjs().diff(time, 'day') + 'day'
  if (dayjs().diff(time, 'hour') !== 0)
    return dayjs().diff(time, 'hour') + 'hour'
  if (dayjs().diff(time, 'minute') !== 0)
    return dayjs().diff(time, 'minute') + 'min'
  return dayjs().diff(time, 'second') + 'sec'
}
