import { ItemDataList } from '~/types/database'
import { connectCollection } from './collectionService'
import { PAGE_SIZE } from './paginationService'
import { isValidText } from '~/store/utils'
import dayjs from 'dayjs'

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

  const years: number[] = [2014, 2015, 2016, 2017, 2018, 2019, 2020]

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

interface Flight {
  time: string
  departure: number
  arrival: number
  airline: number
  boardingType: number
  registration: string
}
