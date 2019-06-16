"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * Imageの追加を通知する
 * @param snapshot
 * @param context
 */
exports.notifyNewImage = (snapshot, context) => {
    const item = snapshot.val();
    // 拡張for
    for (let key in item) {
        console.log(item[key]);
    }
    console.log(context.params.id + ' : ' + item['title']);
    // Slackに通知する
    index_1.sendToSlack(`${item['title']} 追加しました`);
    return true;
};
/**
 * Imageの更新を通知する
 * @param change
 * @param context
 */
exports.notifyEditImage = (change, context) => {
    const item = change.after.val();
    console.log(context.params.id + ' : ' + item.title);
    // Slackに通知する
    index_1.sendToSlack(`${item.title} 更新しました`);
    return true;
};
//# sourceMappingURL=index.js.map