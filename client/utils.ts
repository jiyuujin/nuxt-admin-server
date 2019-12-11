import dayjs from 'dayjs'

import { List } from './types/utils'

/**
 * 年
 */
export const YEARS: List[] = [
    {
        value: 0,
        text: '2019'
    },
    {
        value: 1,
        text: '2018'
    },
    {
        value: 2,
        text: '2017'
    },
    {
        value: 3,
        text: '2016'
    },
    {
        value: 4,
        text: '2015'
    },
]

/**
 * dayjs形式を取得する
 * @param time
 * @returns {*}
 */
export function getTimeFormat (time) {
    return dayjs(time).format('YYYY年MM月DD日')
}

/**
 * 時間の差を取得する
 * @param time
 * @returns {string}
 */
export function getDiffTime (time) {
    if (dayjs().diff(time, 'day') !== 0) return dayjs().diff(time, 'day') + 'day'
    if (dayjs().diff(time, 'hour') !== 0) return dayjs().diff(time, 'hour') + 'hour'
    if (dayjs().diff(time, 'minute') !== 0) return dayjs().diff(time, 'minute') + 'min'
    return dayjs().diff(time, 'second') + 'sec'
}

export default {}
