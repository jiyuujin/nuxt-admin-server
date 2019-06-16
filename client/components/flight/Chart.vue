<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
// import Chart from 'chart.js'
import { Bar } from 'vue-chartjs'

const OPTION = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 40
        }
      }
    ]
  }
};

@Component({})
export default class FlightChart extends mixins(Bar) {
  @Prop() chartData;

  mounted () {
    this.renderChart(this.chartData, OPTION)
  }
}
</script>
