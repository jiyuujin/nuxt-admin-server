export const EVENT_LIST = [
  {value: 0, text: 'None'},
  {value: 1, text: 'Vue.js Meetup'},
  {value: 2, text: 'Nuxt Meetup'},
  {value: 3, text: 'Javascript Festival'},
  {value: 4, text: 'Roppongi.js'},
  {value: 5, text: 'Gotanda.js'},
  {value: 6, text: 'Meguro.es'},
  {value: 7, text: 'We are JavaScripters!'},
  {value: 8, text: 'React Native Meetup'},
  {value: 9, text: 'React.js Meetup'},
  {value: 10, text: 'Angular Meetup'},
  {value: 11, text: 'AWS Dev Day'},
  {value: 12, text: 'Serverless Meetup'},
  {value: 13, text: 'Firebase Meetup'},
  {value: 14, text: 'Firebase yebisu'},
  {value: 15, text: 'Netlify Meetup'},
  {value: 16, text: 'Fastly Yamagoya Meetup'},
  {value: 17, text: 'Laravel/Vue.js Meetup'},
  {value: 18, text: 'Laravel Tokyo'},
  {value: 19, text: 'Scala Matsuri'},
  {value: 20, text: 'Scala Kansai Summit'},
  {value: 21, text: 'Kotlin Fest'},
  {value: 99, text: 'Others'}
]

export function getEventName(id) {
  return EVENT_LIST.find(event => {
    if (event.value === id) {
      return event.text
    }
  }).text
}

export default {}
