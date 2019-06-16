import { sendToSlack } from '../../utils';

/**
 * Photoの追加を通知する
 * @param snapshot
 * @param context
 */
export const notifyNewPhoto = (snapshot, context): boolean => {
    const item = snapshot.data();
    console.log(context.params.id + ' : ' + item.name);

    // Slackに通知する
    return sendToSlack(`${item.name} 追加しました\n${item.content}`);
};
