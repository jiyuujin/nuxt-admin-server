import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { notifyNewTip, notifyEditTip, notifyRemoveTip } from './service/tip'
import {
  notifyNewFlight,
  notifyEditFlight,
  notifyRemoveFlight
} from './service/flight'
import { notifyNewContact } from './service/contact'
import { notifyNewEvent } from './service/event'

import { sendToSlack } from './utils'

admin.initializeApp(functions.config().firebase)

/**
 * Hello World
 */
export const helloWorld = functions
  .region('asia-northeast1')
  .https.onRequest((request, response): any => {
    const bodyText: string = request.body.text

    // Slackに通知する
    return sendToSlack(bodyText)
  })

/**
 * Tipの追加を通知する
 */
export const onTipCreated = functions
  .region('asia-northeast1')
  .firestore.document('/tips/{id}')
  .onCreate((snapshot, context) => {
    notifyNewTip(snapshot, context)
  })

/**
 * Tipの更新を通知する
 */
export const onTipUpdated = functions
  .region('asia-northeast1')
  .firestore.document('/tips/{id}')
  .onUpdate((change, context) => {
    notifyEditTip(change, context)
  })

/**
 * Tipの削除を通知する
 */
export const onTipRemoved = functions
  .region('asia-northeast1')
  .firestore.document('/tips/{id}')
  .onDelete((snapshot, context) => {
    notifyRemoveTip(snapshot, context)
  })

/**
 * Flightの追加を通知する
 */
export const onFlightCreated = functions
  .region('asia-northeast1')
  .firestore.document('/flights/{id}')
  .onCreate((snapshot, context) => {
    return notifyNewFlight(snapshot, context)
  })

/**
 * Flightの更新を通知する
 */
export const onFlightUpdated = functions
  .region('asia-northeast1')
  .firestore.document('/flights/{id}')
  .onUpdate((change, context) => {
    return notifyEditFlight(change, context)
  })

/**
 * Flightの削除を通知する
 */
export const onFlightRemoved = functions
  .region('asia-northeast1')
  .firestore.document('/flights/{id}')
  .onDelete((snapshot, context) => {
    return notifyRemoveFlight(snapshot, context)
  })

/**
 * Contactの追加を通知する
 */
export const onContactCreated = functions
  .region('asia-northeast1')
  .firestore.document('/contacts/{id}')
  .onCreate((snapshot, context) => {
    notifyNewContact(snapshot, context)
  })

/**
 * Eventの追加を通知する
 */
export const onEventCreated = functions
  .region('asia-northeast1')
  .firestore.document('/events/{id}')
  .onCreate((snapshot, context) => {
    notifyNewEvent(snapshot, context)
  })
