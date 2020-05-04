import { ItemDataList } from '~/types/database'
import { connectCollection } from './collectionService'
import { PAGE_SIZE } from './paginationService'

const collection = connectCollection('contacts')

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
