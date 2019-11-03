import { ItemDataList } from '@/types/database.types';
import { connectCollection } from './collectionService';
import { PAGE_SIZE } from './paginationService';
import { isValidText } from '~/store/utils';

const collection = connectCollection('events')

export const fetchEvents = async () => {
    let result: ItemDataList = {
        item: []
    }

    await collection.orderBy('id', 'asc').get()
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

export const addEvent = async ({ name, url, locale }: Event) => {
    if (isValidText(name)) {
        return
    }

    if (isValidText(name)) {
        return
    }

    await collection.add({
        'id': null,
        'name': name,
        'url': url,
        'locale': locale
    })
}

interface Event {
    name: string
    url: string
    locale: number
}
