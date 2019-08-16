import dayjs from 'dayjs';
import { MenuList, SimpleList, CustomListWithUrl, CustomListWithColor } from '../types/database.types';

/**
 * 空港
 * @type {*[]}
 */
export const AIRPORT_LIST: SimpleList[] = [
  {value: 0, text: '東京羽田 / HND'},
  {value: 1, text: '東京成田 / NRT'},
  {value: 2, text: '大阪伊丹 / ITM'},
  {value: 3, text: '大阪関西 / KIX'},
  {value: 4, text: '福岡 / FUK'},
  {value: 5, text: '千歳 / CTS'},
  {value: 6, text: '中部 / NGO'},
  {value: 7, text: '那覇 / OKA'},
  {value: 8, text: '鹿児島 / KOJ'},
  {value: 9, text: '天草 / AXJ'},
  {value: 10, text: '神戸 / UKB'},
  {value: 11, text: '熊本 / KMJ'},
  {value: 12, text: '米子 / YGJ'},
  {value: 13, text: '秋田 / AXT'},
]

/**
 * 航空会社
 * @type {*[]}
 */
export const AIRLINE_LIST: SimpleList[] = [
  {value: 0, text: 'JAL'},
  {value: 1, text: 'ANA'},
  {value: 2, text: 'Skymark'},
  {value: 3, text: 'Starflyer'},
  {value: 4, text: 'SolaseedAir'},
  {value: 5, text: 'AirDo'},
  {value: 6, text: 'Peach'},
  {value: 7, text: 'JetstarJapan'},
  {value: 8, text: 'ValillaAir'},
  {value: 9, text: 'SpringJapan'},
  {value: 10, text: 'AirasiaJapan'},
  {value: 11, text: 'AmakusaAirline'}
]

/**
 * 搭乗機材
 * @type {*[]}
 */
export const BOARDING_TYPE_LIST: SimpleList[] = [
  {value: 0, text: 'Boeing787-9'},
  {value: 1, text: 'Boeing787-8'},
  {value: 2, text: 'Boeing777-3'},
  {value: 3, text: 'Boeing777-2'},
  {value: 4, text: 'Boeing767-3'},
  {value: 5, text: 'Boeing737-8'},
  {value: 6, text: 'Boeing737-7'},
  {value: 7, text: 'Boeing737-5'},
  {value: 8, text: 'Boeing737-4'},
  {value: 9, text: 'Embraer190'},
  {value: 10, text: 'Embraer170'},
  {value: 11, text: 'Bombardier DHC8-Q400'},
  {value: 12, text: 'ATR42-6'},
  {value: 13, text: 'Boeing787-10'},
  {value: 14, text: 'AirbusA350-9'},
  {value: 15, text: 'AirbusA320'},
  {value: 16, text: 'AirbusA321'}
]

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
 * 空港の名前を取得する
 * @param id
 * @returns {string}
 */
export function getAirportName(id) {
  let text: string = ''
  AIRPORT_LIST.forEach(airport => {
    if (airport.value === id) {
      text = airport.text
    }
  })
  return text
}

/**
 * 航空会社の名前を取得する
 * @param id
 * @returns {string}
 */
export function getAirlineName(id) {
  let text: string = ''
  AIRLINE_LIST.forEach(airline => {
    if (airline.value === id) {
      text = airline.text
    }
  })
  return text
}

/**
 * 搭乗機材の名前を取得する
 * @param id
 * @returns {*}
 */
export function getBoardingTypeName(id) {
  let text: string = ''
  BOARDING_TYPE_LIST.forEach(boardingType => {
    if (boardingType.value === id) {
      text = boardingType.text
    }
  })
  return text
}

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
