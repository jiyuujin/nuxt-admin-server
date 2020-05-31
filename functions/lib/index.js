"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const tip_1 = require("./service/tip");
const flight_1 = require("./service/flight");
const contact_1 = require("./service/contact");
const event_1 = require("./service/event");
const utils_1 = require("./utils");
admin.initializeApp(functions.config().firebase);
/**
 * Hello World
 */
exports.helloWorld = functions.region('asia-northeast1')
    .https
    .onRequest((request, response) => {
    const bodyText = request.body.text;
    // Slackに通知する
    return utils_1.sendToSlack(bodyText);
});
/**
 * Tipの追加を通知する
 */
exports.onTipCreated = functions.region('asia-northeast1')
    .firestore
    .document('/tips/{id}')
    .onCreate((snapshot, context) => {
    tip_1.notifyNewTip(snapshot, context);
});
/**
 * Tipの更新を通知する
 */
exports.onTipUpdated = functions.region('asia-northeast1')
    .firestore
    .document('/tips/{id}')
    .onUpdate((change, context) => {
    tip_1.notifyEditTip(change, context);
});
/**
 * Tipの削除を通知する
 */
exports.onTipRemoved = functions.region('asia-northeast1')
    .firestore
    .document('/tips/{id}')
    .onDelete((snapshot, context) => {
    tip_1.notifyRemoveTip(snapshot, context);
});
/**
 * Flightの追加を通知する
 */
exports.onFlightCreated = functions.region('asia-northeast1')
    .firestore
    .document('/flights/{id}')
    .onCreate((snapshot, context) => {
    return flight_1.notifyNewFlight(snapshot, context);
});
/**
 * Flightの更新を通知する
 */
exports.onFlightUpdated = functions.region('asia-northeast1')
    .firestore
    .document('/flights/{id}')
    .onUpdate((change, context) => {
    return flight_1.notifyEditFlight(change, context);
});
/**
 * Flightの削除を通知する
 */
exports.onFlightRemoved = functions.region('asia-northeast1')
    .firestore
    .document('/flights/{id}')
    .onDelete((snapshot, context) => {
    return flight_1.notifyRemoveFlight(snapshot, context);
});
/**
 * Contactの追加を通知する
 */
exports.onContactCreated = functions.region('asia-northeast1')
    .firestore
    .document('/contacts/{id}')
    .onCreate((snapshot, context) => {
    contact_1.notifyNewContact(snapshot, context);
});
/**
 * Eventの追加を通知する
 */
exports.onEventCreated = functions.region('asia-northeast1')
    .firestore
    .document('/events/{id}')
    .onCreate((snapshot, context) => {
    event_1.notifyNewEvent(snapshot, context);
});
//# sourceMappingURL=index.js.map