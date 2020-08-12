<template>
  <GChart :type="chartType" :data="chartData" :options="chartOptions" />
</template>

<script>
import { defineComponent } from '@vue/composition-api'

import { GChart } from 'vue-google-charts'

export default defineComponent({
  components: {
    GChart
  },
  props: {
    chartType: {
      type: String,
      default: ''
    },
    chartData: {
      type: Array,
      default: () => {
        return []
      }
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
})
</script>
