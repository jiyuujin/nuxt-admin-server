"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
/**
 * Photoの追加を通知する
 * @param snapshot
 * @param context
 */
exports.notifyNewPhoto = (snapshot, context) => {
    const item = snapshot.data();
    console.log(context.params.id + ' : ' + item.name);
    // Slackに通知する
    return utils_1.sendToSlack(`${item.name} 追加しました\n${item.content}`);
};
//# sourceMappingURL=index.js.map