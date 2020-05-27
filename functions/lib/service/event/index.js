"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
/**
 * Eventの追加を通知する
 * @param snapshot
 * @param context
 */
exports.notifyNewEvent = (snapshot, context) => {
    const item = snapshot.data();
    console.log(context.params.id + ' : ' + item.title);
    // Slackに通知する
    return utils_1.sendToSlack(`${item.title} 追加しました`);
};
//# sourceMappingURL=index.js.map