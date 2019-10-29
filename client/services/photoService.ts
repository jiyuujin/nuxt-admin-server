import { connectCollection } from './collectionService';
import { isValidText } from '~/store/utils';

const collection = connectCollection('photos')

export const addPhoto = async ({ name, content }: Photo) => {
    if (isValidText(name)) {
        return
    }

    collection.add({
        'name':name,
        'content': content
    })
}

interface Photo {
    name: string
    content: string
}
