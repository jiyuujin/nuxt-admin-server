import swal from 'sweetalert2'

export default ({ $axios, store }) => {
    $axios.onRequest(config => {
        return config
    })

    $axios.onResponse(response => response, error => {
        if (error.response >= 500) {
            swal({
                type: 'error',
                title: 'Error!'
            })
        }
        return Promise.reject(error)
    })
}
