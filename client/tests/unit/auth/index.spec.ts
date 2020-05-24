import * as firebase from 'firebase'

const onAuthStateChanged = jest.fn()

const getRedirectResult = jest.fn(() => {
  return Promise.resolve({
    user: {
      displayName: 'nekohack admin test',
      email: 'admin@nekohack-test.com',
      emailVerified: true
    }
  })
})

const createUserWithEmailAndPassword = jest.fn(() => {
  return Promise.resolve('result of createUserWithEmailAndPassword')
})

const signInWithEmailAndPassword = jest.fn(() => {
  return Promise.resolve('result of signInWithEmailAndPassword')
})

const sendEmailVerification = jest.fn(() => {
  return Promise.resolve('result of sendEmailVerification')
})

const signInWithRedirect = jest.fn(() => {
  return Promise.resolve('result of signInWithRedirect')
})

const sendPasswordResetEmail = jest.fn(() => Promise.resolve())

describe('setup', () => {
  beforeEach(() => {
    // @ts-ignore
    jest.spyOn(firebase, 'initializeApp').mockImplementation(() => {
      return {
        auth: () => {
          return {
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword,
            currentUser: {
              sendEmailVerification
            },
            signInWithRedirect
          }
        }
      }
    })
  })

  it('Auth test', () => {
    // @ts-ignore
    jest.spyOn(firebase, 'auth').mockImplementation(() => {
      return {
        onAuthStateChanged,
        currentUser: {
          displayName: 'nekohack admin test',
          email: 'admin@nekohack-test.com',
          emailVerified: true
        },
        getRedirectResult,
        sendPasswordResetEmail
      }
    })
  })
})
