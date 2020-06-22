import * as functions from 'firebase-functions'
import dayjs from 'dayjs'
import * as rp from 'request-promise'

/**
 * Slackに通知する
 * @param message
 */
export const sendToSlack = (message): boolean => {
  const timeText: string =
    '(' + dayjs().add(9, 'hour').format('MM/DD hh:mm') + ')'

  // request-promiseを使うために前提としてrequestをインストールする必要がある
  rp.post({
    uri: functions.config().slack.webhook_url,
    body: {
      text: `${message} ${timeText}`
    },
    json: true
  })
    .then(() => {
      //
    })
    .catch((error) => {
      console.log(error)
      return false
    })

  return true
}
