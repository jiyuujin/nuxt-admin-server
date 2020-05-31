"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
/**
 * Tipの追加を通知する
 * @param snapshot
 * @param context
 */
exports.notifyNewTip = (snapshot, context) => {
    const item = snapshot.data();
    console.log(context.params.id + ' : ' + item.title);
    // Slackに通知する
    return utils_1.sendToSlack(`${item.title} 追加しました`);
};
/**
 * Tipの更新を通知する
 * @param change
 * @param context
 */
exports.notifyEditTip = (change, context) => {
    const item = change.after.data();
    console.log(context.params.id + ' : ' + item.title);
    // Slackに通知する
    return utils_1.sendToSlack(`${item.title} 更新しました`);
};
/**
 * Tipの削除を通知する
 * @param snapshot
 * @param context
 */
exports.notifyRemoveTip = (snapshot, context) => {
    const item = snapshot.data();
    console.log(context.params.id + ' : ' + item.title);
    // Slackに通知する
    return utils_1.sendToSlack(`${item.title} 削除しました`);
};
//# sourceMappingURL=index.js.map