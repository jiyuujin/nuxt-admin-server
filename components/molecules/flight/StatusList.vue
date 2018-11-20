<template>
  <h3>
    Flight
    <span
      v-for="year in years"
      :key="year"
      v-if="year === 2018"
    >
      {{ list.length }} ({{ getPerFlight(year) }}) レグ
    </span>
  </h3>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      years: [2018, 2017, 2016, 2015]
    }
  },
  methods: {
    getPerFlight (year) {
      let count = null
      this.list.forEach (flight => {
        if (flight.time.includes(year + '-')) {
          count++
        }
      })
      return count
    }
  }
}
</script>

<style scoped>

</style>
