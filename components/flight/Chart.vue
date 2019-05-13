<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
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

@Component({
  extends: Bar,
  async mounted() {
    await this.renderChart(this.chartData, OPTION)
  },
})
export default class FlightChart extends Vue {
  @Prop() chartData: object;
}
</script>
