import Vue from 'vue'

export default ({ $axios, store }) => {
  $axios.onRequest((config) => {
    return config
  })

  $axios.onResponse(
    (response) => response,
    (error) => {
      if (error.response >= 500) {
        setTimeout(() => {
          Vue.toasted.error('Error!')
        }, 5000)
        Vue.toasted.clear()
      }
      return Promise.reject(error)
    }
  )
}
