import { ItemDataList } from '@/types/database.types'
import { connectCollection } from './collectionService'
import { PAGE_SIZE } from './paginationService'
import { isValidText } from '~/store/utils'
import dayjs from 'dayjs'

const collection = connectCollection('tips')

export const fetchTips = async () => {
    let result: ItemDataList = {
        item: []
    }

    await collection.orderBy('time', 'desc').get()
        .then(snapshot => {
            let i = 1
            snapshot.forEach(doc => {
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

export const addTip = async ({ title, url, description, tags, event }: Tip) => {
    if (isValidText(title)) {
        return
    }

    await collection.add({
        'title': title,
        'url': url,
        'description': description,
        'tags': tags,
        'event': event,
        'time': dayjs().format()
    })
}

interface Tip {
    title: string
    url: string
    description: string
    tags: number[]
    event: number
}
