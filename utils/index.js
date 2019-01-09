import moment from 'moment'

/**
 * 空港
 * @type {*[]}
 */
export const AIRPORT_LIST = [
  {value: 1, text: '東京羽田 / HND'},
  {value: 2, text: '東京成田 / NRT'},
  {value: 3, text: '大阪伊丹 / ITM'},
  {value: 4, text: '大阪関西 / KIX'},
  {value: 5, text: '福岡 / FUK'},
  {value: 6, text: '千歳 / CTS'},
  {value: 7, text: '中部 / NGO'},
  {value: 8, text: '那覇 / OKA'},
  {value: 9, text: '鹿児島 / KOJ'},
  {value: 10, text: '天草 / AXJ'},
  {value: 11, text: '神戸 / UKB'},
  {value: 12, text: '熊本 / KMJ'},
  {value: 13, text: '米子 / YGJ'}
]

/**
 * 航空会社
 * @type {*[]}
 */
export const AIRLINE_LIST = [
  {value: 1, text: 'JAL'},
  {value: 2, text: 'ANA'},
  {value: 3, text: 'Skymark'},
  {value: 4, text: 'Starflyer'},
  {value: 5, text: 'SolaseedAir'},
  {value: 6, text: 'AirDo'},
  {value: 7, text: 'Peach'},
  {value: 8, text: 'JetstarJapan'},
  {value: 9, text: 'ValillaAir'},
  {value: 10, text: 'SpringJapan'},
  {value: 11, text: 'AirasiaJapan'},
  {value: 12, text: 'AmakusaAirline'}
]

/**
 * 搭乗機材
 * @type {*[]}
 */
export const BOARDING_TYPE_LIST = [
  {value: 1, text: 'Boeing787-9'},
  {value: 2, text: 'Boeing787-8'},
  {value: 3, text: 'Boeing777-3'},
  {value: 4, text: 'Boeing777-2'},
  {value: 5, text: 'Boeing767-3'},
  {value: 6, text: 'Boeing737-8'},
  {value: 7, text: 'Boeing737-7'},
  {value: 8, text: 'Boeing737-5'},
  {value: 9, text: 'Boeing737-4'},
  {value: 10, text: 'Embraer190'},
  {value: 11, text: 'Embraer170'},
  {value: 12, text: 'Bombardier DHC8-Q400'},
  {value: 13, text: 'ATR42-6'},
  {value: 14, text: 'Boeing787-10'},
  {value: 15, text: 'AirbusA350-9'},
  {value: 16, text: 'AirbusA320'},
  {value: 17, text: 'AirbusA321'}
]

/**
 * 年
 * @type {number[]}
 */
export const YEARS = [
  {
    value: 2019,
    text: '2019'
  },
  {
    value: 2018,
    text: '2018'
  },
  {
    value: 2017,
    text: '2017'
  },
  {
    value: 2016,
    text: '2016'
  },
  {
    value: 2015,
    text: '2015'
  },
]

/**
 * 技術カテゴリー
 * @type {*[]}
 */
export const CATEGORIES = [
  {value: 1, text: 'Web', backgroundColor: '#0033ff', color: '#fff'},
  {value: 2, text: 'HTML5', backgroundColor: '#0099ff', color: '#000'},
  {value: 3, text: 'CSS', backgroundColor: '#00ff99', color: '#000'},
  {value: 4, text: 'Javascript', backgroundColor: '#ffff00', color: '#000'},
  {value: 5, text: 'EcmaScript', backgroundColor: '#ff9966', color: '#000'},
  {value: 6, text: 'PHP', backgroundColor: '#000099', color: '#fff'},
  {value: 7, text: 'Zendframework', backgroundColor: '#009933', color: '#fff'},
  {value: 8, text: 'Laravel', backgroundColor: '#ff99cc', color: '#000'},
  {value: 9, text: 'Scala', backgroundColor: '#ff0000', color: '#fff'},
  {value: 10, text: 'Playframework', backgroundColor: '#666666', color: '#fff'},
  {value: 11, text: 'Kotlin', backgroundColor: '#ffcc33', color: '#000'},
  {value: 12, text: 'Sparkframework', backgroundColor: '#cccccc', color: '#000'},
  {value: 13, text: 'Heroku', backgroundColor: '#ccffff', color: '#000'},
  {value: 14, text: 'Netlify', backgroundColor: '#99ffcc', color: '#000'},
  {value: 15, text: 'AWS', backgroundColor: '#660000', color: '#fff'},
  {value: 16, text: 'React', backgroundColor: '#3300ff', color: '#fff'},
  {value: 17, text: 'Vue', backgroundColor: '#33ff33', color: '#000'},
  {value: 18, text: 'Objective-c', backgroundColor: '#cc9933', color: '#000'},
  {value: 19, text: 'Swift', backgroundColor: '#ff6633', color: '#fff'},
  {value: 20, text: 'Firebase', backgroundColor: '#ff9900', color: '#fff'},
  {value: 21, text: 'TypeScript', backgroundColor: '#ff33ff', color: '#fff'},
  {value: 22, text: 'Nuxt.js', backgroundColor: '#339933', color: '#fff'},
  {value: 23, text: 'VuePress', backgroundColor: '#33ff99', color: '#000'},
  {value: 24, text: 'Gatsby', backgroundColor: '#990099', color: '#fff'},
  {value: 25, text: 'Angular', backgroundColor: '#ff3333', color: '#fff'},
  {value: 26, text: 'Elixir', backgroundColor: '#660099', color: '#fff'},
  {value: 27, text: 'Java', backgroundColor: '#ff6600', color: '#fff'},
  {value: 28, text: 'Docker', backgroundColor: '#1D2088', color: '#fff'},
  {value: 29, text: 'MySQL', backgroundColor: '#ff9933', color: '#fff'},
  {value: 30, text: 'PostgreSQL', backgroundColor: '#333399', color: '#fff'},
  {value: 31, text: 'Redis', backgroundColor: '#cc0000', color: '#fff'},
  {value: 99, text: 'Others', backgroundColor: '#000000', color: '#fff'}
]

/**
 * イベント地域
 * @type {*[]}
 */
export const LOCALES = [
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
export const CONTACT_CATEGORIES = [
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
export const MENU_LIST = [
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
  {
    title: 'event',
    url: '/event',
    src: 'event.png',
    flex: 3
  }
]

/**
 * ソーシャル
 * @type {*[]}
 */
export const SOCIAL_LIST = [
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
 * 空港の名前を取得する
 * @param id
 * @returns {*}
 */
export function getAirportName(id) {
  return AIRPORT_LIST.find((airport) => {
    if (airport.value === id) {
      return airport.text
    }
  }).text
}

/**
 * 航空会社の名前を取得する
 * @param id
 * @returns {string}
 */
export function getAirlineName(id) {
  return './' + AIRLINE_LIST.find(airline => {
    if (airline.value === id) {
      return airline.text
    }
  }).text.toLowerCase() + '.png'
}

/**
 * 搭乗機材の名前を取得する
 * @param id
 * @returns {*}
 */
export function getBoardingTypeName(id) {
  return BOARDING_TYPE_LIST.find((boardingType) => {
    if (boardingType.value === id) {
      return boardingType.text
    }
  }).text
}

/**
 * moment型式を取得する
 * @param time
 * @returns {*}
 */
export function getTimeFormat (time) {
  return moment(time).format('YYYY年MM月DD日')
}

/**
 * 時間の差を取得する
 * @param time
 * @returns {string}
 */
export function getDiffTime (time) {
  if (moment().diff(time, 'day') !== 0) return moment().diff(time, 'day') + 'day'
  if (moment().diff(time, 'hour') !== 0) return moment().diff(time, 'hour') + 'hour'
  if (moment().diff(time, 'minute') !== 0) return moment().diff(time, 'minute') + 'min'
  return moment().diff(time, 'second') + 'sec'
}

export default {}
