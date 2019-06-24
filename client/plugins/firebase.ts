import * as firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  const config = {
    apiKey: process.env.NUXT_APP_API_KEY,
    authDomain: process.env.NUXT_APP_AUTH_DOMAIN,
    projectId: process.env.NUXT_APP_PROJECT_ID,
    storageBucket: process.env.NUXT_APP_BUCKET
  }
  firebase.initializeApp(config)
}

export default firebase
