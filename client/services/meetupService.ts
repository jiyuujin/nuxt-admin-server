import dayjs from 'dayjs'

export const fetchMeetups = async (): Promise<
  Array<{
    event_id: string
    event_name: string
    community_id: string
    community_name: string
    type: string
    category_id: string
    category_name: string
    date: string
    participants: string
    is_sponsor: boolean
    sponsor_name: string
    is_co_sponsor: boolean
    co_sponsor_name: string
  }>
> => {
  let result: Array<{
    event_id: string
    event_name: string
    community_id: string
    community_name: string
    type: string
    category_id: string
    category_name: string
    date: string
    participants: string
    is_sponsor: boolean
    sponsor_name: string
    is_co_sponsor: boolean
    co_sponsor_name: string
  }> = []

  const mtUrl = process.env.NUXT_APP_MEETUP_API
  const res = await fetch(mtUrl!)
  const json = await res.json()
  result = json.data

  return result
}

export const drawChart = (items, categoryName, communityName) => {
  const chartData: any = []

  chartData.push(['日付', `${communityName} ${categoryName} 参加者数 (予定)`])
  for (const i of items) {
    if (i.community_name === communityName) {
      if (i.category_name === categoryName) {
        chartData.push([
          dayjs(i.date).format('YYYY/MM/DD'),
          i.category_name === categoryName ? Number(i.participants) : null
        ])
      }
    }
  }

  return chartData
}
