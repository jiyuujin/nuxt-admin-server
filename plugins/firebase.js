import * as firebase from 'firebase'

if (!firebase.apps.length) {
  const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL
  }
  firebase.initializeApp(config)
}

export default firebase
