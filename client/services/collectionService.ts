import Firestore from '@/plugins/firebase'

const adminFirestore = Firestore.firestore()

export const connectCollection = (collectionName: string) => {
    return adminFirestore.collection(collectionName)
}
