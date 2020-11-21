import { ItemDataList } from '~/types/database'
import { connectCollection } from './collectionService'
import { PAGE_SIZE } from './paginationService'
import { isValidText } from '~/store/utils'
import dayjs from 'dayjs'

const years: number[] = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]

const collection = connectCollection('flights')

export const fetchFlights = async () => {
  let result: ItemDataList = {
    item: []
  }

  await collection
    .orderBy('time', 'desc')
    .get()
    .then((snapshot) => {
      let i = 1
      snapshot.forEach((doc) => {
        // console.log(doc.id + ' ' + doc.data())
        result.item.push({
          id: doc.id,
          data: doc.data(),
          page: Math.ceil(i / PAGE_SIZE)
        })
        i++
      })
    })

  return result
}

export const addFlight = async ({
  time,
  departure,
  arrival,
  airline,
  boardingType,
  registration
}: Flight) => {
  if (isValidText(time)) {
    return
  }

  await collection.add({
    time: time,
    departure: departure,
    arrival: arrival,
    airline: airline,
    boardingType: boardingType,
    registration: registration
  })
}

export const drawChart = (item) => {
  const chartData: any = []

  const filtered: any = []
  item.map((d: any) => {
    filtered.push(dayjs(d.data.time).format('YYYY'))
  })
  chartData.push(['年', '搭乗回数'])
  const list = years.map((y) => {
    const list = filtered.filter((r) => r === String(y))
    return [String(y), list.length]
  })
  list.forEach((item) => {
    chartData.push([item[0], item[1]])
  })

  return chartData
}

export const drawLocaleChart = (item) => {
  const chartData: any = []

  const filtered: any = []
  item.map((d: any) => {
    filtered.push(dayjs(d.data.time).format('YYYY'))
  })
  chartData.push(['年', '東京', '大阪', '札幌', '福岡', '那覇'])
  const list = years.map((y) => {
    // const list = filtered.filter((r) => r === String(y))
    let tokyoNum = 0
    let osakaNum = 0
    let sapporoNum = 0
    let fukuokaNum = 0
    let okinawaNum = 0
    item.map((d: any) => {
      if (dayjs(d.data.time).format('YYYY') === String(y)) {
        if (
          d.data.departure === 0 ||
          d.data.departure === 1 ||
          d.data.arrival === 0 ||
          d.data.arrival === 1
        ) {
          tokyoNum += 1
        }
        if (
          d.data.departure === 2 ||
          d.data.departure === 3 ||
          d.data.departure === 10 ||
          d.data.arrival === 2 ||
          d.data.arrival === 3 ||
          d.data.arrival === 10
        ) {
          osakaNum += 1
        }
        if (d.data.departure === 5 || d.data.arrival === 5) {
          sapporoNum += 1
        }
        if (d.data.departure === 4 || d.data.arrival === 4) {
          fukuokaNum += 1
        }
        if (d.data.departure === 7 || d.data.arrival === 7) {
          okinawaNum += 1
        }
      }
    })
    return [String(y), tokyoNum, osakaNum, sapporoNum, fukuokaNum, okinawaNum]
  })
  list.forEach((item) => {
    chartData.push([item[0], item[1], item[2], item[3], item[4], item[5]])
  })

  return chartData
}

export const drawAirlineChart = (item) => {
  const chartData: any = []

  const filtered: any = []
  item.map((d: any) => {
    filtered.push(dayjs(d.data.time).format('YYYY'))
  })
  chartData.push(['年', 'ANA', 'JAL', 'Skymark', 'LCC'])
  const list = years.map((y) => {
    // const list = filtered.filter((r) => r === String(y))
    let anaNum = 0
    let jalNum = 0
    let skyNum = 0
    let lccNum = 0
    item.map((d: any) => {
      if (dayjs(d.data.time).format('YYYY') === String(y)) {
        if (d.data.airline === 1) {
          anaNum += 1
        }
        if (d.data.airline === 0) {
          jalNum += 1
        }
        if (d.data.airline === 2) {
          skyNum += 1
        }
        if (
          d.data.airline === 6 ||
          d.data.airline === 7 ||
          d.data.airline === 8 ||
          d.data.airline === 9 ||
          d.data.airline === 10
        ) {
          lccNum += 1
        }
      }
    })
    return [String(y), anaNum, jalNum, skyNum, lccNum]
  })
  list.forEach((item) => {
    chartData.push([item[0], item[1], item[2], item[3], item[4]])
  })

  return chartData
}

export const drawBoardingTypeChart = (item) => {
  const chartData: any = []

  const filtered: any = []
  item.map((d: any) => {
    filtered.push(dayjs(d.data.time).format('YYYY'))
  })
  chartData.push([
    '年',
    'Boeing737',
    'Boeing767',
    'Boeing777',
    'Boeing787',
    'A320 + A321',
    'Embraer',
    'ATR'
  ])
  const list = years.map((y) => {
    // const list = filtered.filter((r) => r === String(y))
    let b3Num = 0
    let b6Num = 0
    let b7Num = 0
    let b8Num = 0
    let a320Num = 0
    let embraerNum = 0
    let atrNum = 0
    item.map((d: any) => {
      if (dayjs(d.data.time).format('YYYY') === String(y)) {
        if (
          d.data.boardingType === 5 ||
          d.data.boardingType === 6 ||
          d.data.boardingType === 7 ||
          d.data.boardingType === 8
        ) {
          b3Num += 1
        }
        if (d.data.boardingType === 4) {
          b6Num += 1
        }
        if (d.data.boardingType === 2 || d.data.boardingType === 3) {
          b7Num += 1
        }
        if (
          d.data.boardingType === 0 ||
          d.data.boardingType === 1 ||
          d.data.boardingType === 13
        ) {
          b8Num += 1
        }
        if (d.data.boardingType === 15 || d.data.boardingType === 16) {
          a320Num += 1
        }
        if (d.data.boardingType === 9 || d.data.boardingType === 10) {
          embraerNum += 1
        }
        if (d.data.boardingType === 12) {
          atrNum += 1
        }
      }
    })
    return [String(y), b3Num, b6Num, b7Num, b8Num, a320Num, embraerNum, atrNum]
  })
  list.forEach((item) => {
    chartData.push([
      item[0],
      item[1],
      item[2],
      item[3],
      item[4],
      item[5],
      item[6],
      item[7]
    ])
  })

  return chartData
}

interface Flight {
  time: string
  departure: number
  arrival: number
  airline: number
  boardingType: number
  registration: string
}
