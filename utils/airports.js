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

export function getAirportName(id) {
  return AIRPORT_LIST.find((airport) => {
    if (airport.value === id) {
      return airport.text
    }
  }).text
}

export default {}
