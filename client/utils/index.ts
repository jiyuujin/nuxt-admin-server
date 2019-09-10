import dayjs from 'dayjs';

/* eslint-disable */
import {
    MenuList,
    SimpleList,
    CustomListWithUrl,
    CustomListWithColor
} from '@/types/database.types';
/* eslint-enable */

/**
 * 年
 * @type {number[]}
 */
export const YEARS: SimpleList[] = [
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
 * イベント地域
 * @type {*[]}
 */
export const LOCALES: SimpleList[] = [
    {
        value: 0,
        text: '指定無し'
    },
    {
        value: 1,
        text: '東京'
    },
    {
        value: 2,
        text: '大阪'
    },
    {
        value: 3,
        text: 'その他'
    }
]

/**
 * お問い合わせカテゴリー
 * @type {*[]}
 */
export const CONTACT_CATEGORIES: SimpleList[] = [
    {
        value: 1,
        text: '仕事のご依頼'
    },
    {
        value: 2,
        text: '当ブログへのご提案'
    },
    {
        value: 10,
        text: 'ブログ記事全般'
    },
    {
        value: 99,
        text: 'その他'
    }
]

/**
 * メニュー
 * @type {*[]}
 */
export const MENU_LIST: MenuList[] = [
    {
        title: 'tip',
        url: '/tip',
        src: 'nyanko.png',
        flex: 3
    },
    {
        title: 'qiita',
        url: '/qiita',
        src: 'qiita.png',
        flex: 3
    },
    {
        title: 'flight',
        url: '/flight',
        src: 'takeoff.png',
        flex: 3
    },
]

/**
 * ソーシャル
 * @type {*[]}
 */
export const SOCIAL_LIST: CustomListWithUrl[] = [
    {
        name: 'slack',
        url: 'https://jiyuujinjs.slack.com/'
    },
    {
        name: 'twitter',
        url: 'https://twitter.com/jiyuujinlab'
    },
    {
        name: 'github',
        url: 'https://github.com/jiyuujin'
    },
    {
        name: 'bitbucket',
        url: 'https://bitbucket.org/jiyuujin'
    }
]

/**
 * 技術カテゴリー
 * @type {*[]}
 */
export const CATEGORIES: CustomListWithColor[] = [
    {
        value: 0,
        text: 'Web',
        backgroundColor: '#0033ff',
        color: '#fff'
    },
    {
        value: 1,
        text: 'HTML5',
        backgroundColor: '#0099ff',
        color: '#000'
    },
    {
        value: 2,
        text: 'CSS',
        backgroundColor: '#00ff99',
        color: '#000'
    },
    {
        value: 3,
        text: 'Javascript',
        backgroundColor: '#ffff00',
        color: '#000'
    },
    {
        value: 4,
        text: 'EcmaScript',
        backgroundColor: '#ff9966',
        color: '#000'
    },
    {
        value: 5,
        text: 'PHP',
        backgroundColor: '#000099',
        color: '#fff'
    },
    {
        value: 6,
        text: 'Zendframework',
        backgroundColor: '#009933',
        color: '#fff'
    },
    {
        value: 7,
        text: 'Laravel',
        backgroundColor: '#ff99cc',
        color: '#000'
    },
    {
        value: 8,
        text: 'Scala',
        backgroundColor: '#ff0000',
        color: '#fff'
    },
    {
        value: 9,
        text: 'Playframework',
        backgroundColor: '#666666',
        color: '#fff'
    },
    {
        value: 10,
        text: 'Kotlin',
        backgroundColor: '#ffcc33',
        color: '#000'
    },
    {
        value: 11,
        text: 'Sparkframework',
        backgroundColor: '#cccccc',
        color: '#000'
    },
    {
        value: 12,
        text: 'Heroku',
        backgroundColor: '#ccffff',
        color: '#000'
    },
    {
        value: 13,
        text: 'Netlify',
        backgroundColor: '#99ffcc',
        color: '#000'
    },
    {
        value: 14,
        text: 'AWS',
        backgroundColor: '#660000',
        color: '#fff'
    },
    {
        value: 15,
        text: 'React',
        backgroundColor: '#3300ff',
        color: '#fff'
    },
    {
        value: 16,
        text: 'Vue',
        backgroundColor: '#33ff33',
        color: '#000'
    },
    {
        value: 17,
        text: 'Objective-c',
        backgroundColor: '#cc9933',
        color: '#000'
    },
    {
        value: 18,
        text: 'Swift',
        backgroundColor: '#ff6633',
        color: '#fff'
    },
    {
        value: 19,
        text: 'Firebase',
        backgroundColor: '#ff9900',
        color: '#fff'
    },
    {
        value: 20,
        text: 'TypeScript',
        backgroundColor: '#ff33ff',
        color: '#fff'
    },
    {
        value: 21,
        text: 'Nuxt.js',
        backgroundColor: '#339933',
        color: '#fff'
    },
    {
        value: 22,
        text: 'VuePress',
        backgroundColor: '#33ff99',
        color: '#000'
    },
    {
        value: 23,
        text: 'Gatsby',
        backgroundColor: '#990099',
        color: '#fff'
    },
    {
        value: 24,
        text: 'Angular',
        backgroundColor: '#ff3333',
        color: '#fff'
    },
    {
        value: 25,
        text: 'Elixir',
        backgroundColor: '#660099',
        color: '#fff'
    },
    {
        value: 26,
        text: 'Java',
        backgroundColor: '#ff6600',
        color: '#fff'
    },
    {
        value: 27,
        text: 'Docker',
        backgroundColor: '#1D2088',
        color: '#fff'
    },
    {
        value: 28,
        text: 'MySQL',
        backgroundColor: '#ff9933',
        color: '#fff'
    },
    {
        value: 29,
        text: 'PostgreSQL',
        backgroundColor: '#333399',
        color: '#fff'
    },
    {
        value: 30,
        text: 'Redis',
        backgroundColor: '#cc0000',
        color: '#fff'
    },
    {
        value: 31,
        text: 'Others',
        backgroundColor: '#000000',
        color: '#fff'
    }
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
