"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const flight_1 = require("./service/flight");
const contact_1 = require("./service/contact");
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
//# sourceMappingURL=index.js.map
