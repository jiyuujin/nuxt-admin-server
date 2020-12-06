import { List } from '@/types/utils'

/**
 * 空港
 */
export const AIRPORT_LIST: List[] = [
  { value: 0, text: '東京羽田 / HND' },
  { value: 1, text: '東京成田 / NRT' },
  { value: 2, text: '大阪伊丹 / ITM' },
  { value: 3, text: '大阪関西 / KIX' },
  { value: 4, text: '福岡 / FUK' },
  { value: 5, text: '千歳 / CTS' },
  { value: 6, text: '中部 / NGO' },
  { value: 7, text: '那覇 / OKA' },
  { value: 8, text: '鹿児島 / KOJ' },
  { value: 9, text: '天草 / AXJ' },
  { value: 10, text: '神戸 / UKB' },
  { value: 11, text: '熊本 / KMJ' },
  { value: 12, text: '米子 / YGJ' },
  { value: 13, text: '秋田 / AXT' },
  { value: 14, text: 'バンコク / BKK' },
  { value: 15, text: '台北 / TPE' }
]

/**
 * 航空会社
 */
export const AIRLINE_LIST: List[] = [
  { value: 0, text: 'JAL' },
  { value: 1, text: 'ANA' },
  { value: 2, text: 'Skymark' },
  { value: 3, text: 'Starflyer' },
  { value: 4, text: 'SolaseedAir' },
  { value: 5, text: 'AirDo' },
  { value: 6, text: 'Peach' },
  { value: 7, text: 'JetstarJapan' },
  { value: 8, text: 'ValillaAir' },
  { value: 9, text: 'SpringJapan' },
  { value: 10, text: 'AirasiaJapan' },
  { value: 11, text: 'AmakusaAirline' },
  { value: 12, text: 'Thai Airways' },
  { value: 13, text: 'China Airlines' },
  { value: 14, text: 'Eva Airways' },
  { value: 15, text: 'V Air' },
  { value: 16, text: 'Tiger Air' }
]

/**
 * 搭乗機材
 */
export const BOARDING_TYPE_LIST: List[] = [
  { value: 0, text: 'Boeing787-9' },
  { value: 1, text: 'Boeing787-8' },
  { value: 2, text: 'Boeing777-3' },
  { value: 3, text: 'Boeing777-2' },
  { value: 4, text: 'Boeing767-3' },
  { value: 5, text: 'Boeing737-8' },
  { value: 6, text: 'Boeing737-7' },
  { value: 7, text: 'Boeing737-5' },
  { value: 8, text: 'Boeing737-4' },
  { value: 9, text: 'Embraer190' },
  { value: 10, text: 'Embraer170' },
  { value: 11, text: 'Bombardier DHC8-Q400' },
  { value: 12, text: 'ATR42-6' },
  { value: 13, text: 'Boeing787-10' },
  { value: 14, text: 'AirbusA350-9' },
  { value: 15, text: 'AirbusA320' },
  { value: 16, text: 'AirbusA321' },
  { value: 17, text: 'Boeing747-4' },
  { value: 18, text: 'Boeing747-8' }
]

/**
 * 空港の名前を取得する
 * @param id
 * @returns {string}
 */
export function getAirportName(id) {
  let text: string = ''
  AIRPORT_LIST.forEach((airport) => {
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
  AIRLINE_LIST.forEach((airline) => {
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
  BOARDING_TYPE_LIST.forEach((boardingType) => {
    if (boardingType.value === id) {
      text = boardingType.text
    }
  })
  return text
}
