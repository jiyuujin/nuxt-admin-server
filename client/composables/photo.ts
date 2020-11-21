import { SetupContext, reactive, onMounted } from '@vue/composition-api'
import firebase from 'firebase'

import { fetchPhotos, addPhoto } from '~/services/photoService'
import { ItemDataList } from '~/types/database'

export default (props: {}, ctx: SetupContext) => {
  const state = reactive({
    photos: {} as ItemDataList,
    name: '' as string,
    content: '' as string
  })

  onMounted(async () => {
    Promise.all([(state.photos = await fetchPhotos())])
  })

  const reset = () => {
    state.name = ''
    state.content = ''
  }

  const postPhoto = async () => {
    await addPhoto(state)
    reset()
  }

  const onFileChange = (e) => {
    const files = e.target.files
    state.name = files[0].name.replace(/.png/g, '')

    const fr = new FileReader()
    fr.readAsDataURL(files[0])
    fr.addEventListener('load', () => {
      upload(files[0])
    })
  }

  const upload = (file) => {
    const storageRef = firebase.storage().ref().child(state.name)
    storageRef.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        state.content = downloadURL
      })
    })
  }

  return {
    state,
    reset,
    postPhoto,
    onFileChange,
    upload
  }
}
