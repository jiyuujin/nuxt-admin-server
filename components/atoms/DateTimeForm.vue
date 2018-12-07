<template>
  <v-flex xs12>
    <v-menu
      ref="menu"
      :close-on-content-click="false"
      v-model="menu"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="newVal"
        label="Date"
        hint="選択してください"
        persistent-hint
        prepend-icon="event"
        @blur="date = parseDate(dateFormatted)"
      />
      <v-date-picker
        v-model="newVal"
        no-title
        @input="menu = false"
      />
    </v-menu>
  </v-flex>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
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
        return this.data;
      },
      set (value) {
        this.$emit('form-data', value)
      }
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>

</style>
