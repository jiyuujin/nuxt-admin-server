import { sendToSlack } from '../../utils'

/**
 * Contactの追加を通知する
 * @param snapshot
 * @param context
 */
export const notifyNewContact = (snapshot, context): boolean => {
  const item = snapshot.data()
  console.log(context.params.id + ' : ' + item.title)

  // Slackに通知する
  return sendToSlack(`${item.title} 追加しました`)
}
