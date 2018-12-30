<template>
  <picker
    v-model="newVal"
    :value="formatDate(data)"
  />
</template>

<script>
import Picker from 'vuejs-datepicker'
import moment from 'moment'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    Picker
  },
  data () {
    return {
      dateFormatted: null,
      menu: false
    }
  },
  computed: {
    newVal: {
      get () {
        return this.formatDate(this.data)
      },
      set (value) {
        this.$emit('form-data', moment(new Date(value)))
      }
    }
  },
  methods: {
    formatDate (date) {
      const y = moment(date).format('YYYY')
      const m = moment(date).format('MM')
      const d = moment(date).format('DD')
      return new Date(Number(y), Number(m) - 1, Number(d))
    }
  }
}
</script>

<style scoped>

</style>
