"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const moment = require("moment");
const rp = require("request-promise");
/**
 * Slackに通知する
 * @param message
 */
exports.sendToSlack = (message) => {
    const timeText = '(' +
        moment().add(9, 'hours').format('MM/DD hh:mm') +
        ')';
    // request-promiseを使うために前提としてrequestをインストールする必要がある
    rp.post({
        uri: functions.config().slack.webhook_url,
        body: {
            text: `${message} ${timeText}`
        },
        json: true
    }).then(() => {
        //
    }).catch(error => {
        console.log(error);
        return false;
    });
    return true;
};
//# sourceMappingURL=utils.js.map