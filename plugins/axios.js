import swal from 'sweetalert2'

export default ({ $axios, store }) => {
  $axios.onRequest(config => {

    // Base URL

    // Authorization Token, CSRF Token

    return config
  })

  $axios.onResponse(response => response, error => {
    const { status } = error.response || {}

    console.log('Status: ' + status)

    if (status >= 500) {
      swal({
        type: 'error',
        title: 'Error!'
      })
    }

    return Promise.reject(error)
  })
}
