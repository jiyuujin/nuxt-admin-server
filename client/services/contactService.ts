import { ItemDataList } from '~/types/database'
import { connectCollection } from './collectionService'
import { PAGE_SIZE } from './paginationService'
import dayjs from 'dayjs'

const collection = connectCollection('contacts')

const years: number[] = [2018, 2019, 2020, 2021]

export const fetchContacts = async (): Promise<ItemDataList> => {
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

export const drawChart = (item) => {
  const chartData: any = []

  const filtered: any = []
  item.map((d: any) => {
    filtered.push(dayjs(d.data.time).format('YYYY'))
  })
  chartData.push(['年', '問い合わせ数'])
  const list = years.map((y) => {
    const list = filtered.filter((r) => r === String(y))
    return [String(y), list.length]
  })
  list.forEach((item) => {
    chartData.push([item[0], item[1]])
  })

  return chartData
}
