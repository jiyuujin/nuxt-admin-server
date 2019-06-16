import { sendToSlack } from '../../utils';

/**
 * Tipの追加を通知する
 * @param snapshot
 * @param context
 */
export const notifyNewTip = (snapshot, context): boolean => {
    const item = snapshot.data();
    console.log(context.params.id + ' : ' + item.title);

    // Slackに通知する
    return sendToSlack(`${item.title} 追加しました`);
};

/**
 * Tipの更新を通知する
 * @param change
 * @param context
 */
export const notifyEditTip = (change, context): boolean => {
    const item = change.after.data();
    console.log(context.params.id + ' : ' + item.title);

    // Slackに通知する
    return sendToSlack(`${item.title} 更新しました`);
};

/**
 * Tipの削除を通知する
 * @param snapshot
 * @param context
 */
export const notifyRemoveTip = (snapshot, context): boolean => {
    const item = snapshot.data();
    console.log(context.params.id + ' : ' + item.title);

    // Slackに通知する
    return sendToSlack(`${item.title} 削除しました`);
};
