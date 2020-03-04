import { sendToSlack } from '../../utils'

/**
 * Flightの追加を通知する
 * @param snapshot
 * @param context
 */
export const notifyNewFlight = (snapshot, context): boolean => {
  const item = snapshot.data()
  console.log(context.params.id + ' : ' + item.registration)

  // Slackに通知する
  return sendToSlack(`${item.registration} 追加しました`)
}

/**
 * Flightの更新を通知する
 * @param change
 * @param context
 */
export const notifyEditFlight = (change, context): boolean => {
  const item = change.after.data()
  console.log(context.params.id + ' : ' + item.registration)

  // Slackに通知する
  return sendToSlack(`${item.registration} 更新しました`)
}

/**
 * Flightの削除を通知する
 * @param snapshot
 * @param context
 */
export const notifyRemoveFlight = (snapshot, context): boolean => {
  const item = snapshot.data()
  console.log(context.params.id + ' : ' + item.registration)

  // Slackに通知する
  return sendToSlack(`${item.registration} 削除しました`)
}
