import { sendToSlack } from '../../utils';

/**
 * Eventの追加を通知する
 * @param snapshot
 * @param context
 */
export const notifyNewEvent = (snapshot, context): boolean => {
    const item = snapshot.data();
    console.log(context.params.id + ' : ' + item.title);

    // Slackに通知する
    return sendToSlack(`${item.title} 追加しました`);
};
