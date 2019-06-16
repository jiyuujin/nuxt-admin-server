"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * Flightの追加を通知する
 * @param snapshot
 * @param context
 */
exports.notifyNewFlight = (snapshot, context) => {
    const item = snapshot.val();
    // 拡張for
    for (let key in item) {
        console.log(item[key]);
    }
    console.log(context.params.id + ' : ' + item['registration']);
    // Slackに通知する
    index_1.sendToSlack(`${item['registration']} 追加しました`);
    return true;
};
/**
 * Flightの更新を通知する
 * @param change
 * @param context
 */
exports.notifyEditFlight = (change, context) => {
    const item = change.after.val();
    console.log(context.params.id + ' : ' + item.registration);
    // Slackに通知する
    index_1.sendToSlack(`${item.registration} 更新しました`);
    return true;
};
/**
 * Flightの削除を通知する
 * @param snapshot
 * @param context
 */
exports.notifyRemoveFlight = (snapshot, context) => {
    const item = snapshot.val();
    console.log(context.params.id + ' : ' + item['registration']);
    // Slackに通知する
    index_1.sendToSlack(`${item['registration']} 削除しました`);
    return true;
};
//# sourceMappingURL=index.js.map