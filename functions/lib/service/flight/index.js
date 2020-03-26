"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
/**
 * Flightの追加を通知する
 * @param snapshot
 * @param context
 */
exports.notifyNewFlight = (snapshot, context) => {
    const item = snapshot.data();
    console.log(context.params.id + ' : ' + item.registration);
    // Slackに通知する
    return utils_1.sendToSlack(`${item.registration} 追加しました`);
};
/**
 * Flightの更新を通知する
 * @param change
 * @param context
 */
exports.notifyEditFlight = (change, context) => {
    const item = change.after.data();
    console.log(context.params.id + ' : ' + item.registration);
    // Slackに通知する
    return utils_1.sendToSlack(`${item.registration} 更新しました`);
};
/**
 * Flightの削除を通知する
 * @param snapshot
 * @param context
 */
exports.notifyRemoveFlight = (snapshot, context) => {
    const item = snapshot.data();
    console.log(context.params.id + ' : ' + item.registration);
    // Slackに通知する
    return utils_1.sendToSlack(`${item.registration} 削除しました`);
};
//# sourceMappingURL=index.js.map