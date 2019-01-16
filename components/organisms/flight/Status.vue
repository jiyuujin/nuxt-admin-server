<template>
  <div
    v-if="list"
  >
    <h3>
      Flight
    </h3>
    <FlightChart
      :chart-data="getChartDataset(list)"
    />
  </div>
</template>

<script>
import FlightChart from './FlightChart'

const YEARS = [
  2015,
  2016,
  2017,
  2018,
  2019
];

const LABEL_TEXT = 'Flights';

const COLOR_TEXT = '#42b883';

export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  components: {
    FlightChart
  },
  methods: {
    getChartDataset(items) {
      let dataset = []
      for (let yearIndex = 0; yearIndex < YEARS.length; yearIndex++) {
        const size = items.filter(item => {
          return item.data.time.includes(YEARS[yearIndex]) === true
        }) || 0

        // console.log(YEARS[yearIndex] + ' : ' + size.length)
        dataset.push(size.length)
      }

      return {
        labels: YEARS,
        datasets: [
          {
            label: LABEL_TEXT,
            backgroundColor: COLOR_TEXT,
            data: dataset
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
