import { connectCollection } from './collectionService'
import { isValidText } from '~/store/utils'
import { ItemDataList } from '~/types/database'
import { PAGE_SIZE } from '~/services/paginationService'

const collection = connectCollection('photos')

export const fetchPhotos = async () => {
  let result: ItemDataList = {
    item: []
  }

  await collection.get().then((snapshot) => {
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

export const addPhoto = async ({ name, content }: Photo) => {
  if (isValidText(name)) {
    return
  }

  collection.add({
    name: name,
    content: content
  })
}

interface Photo {
  name: string
  content: string
}
