<script>
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

export default {
  extends: Bar,
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  async mounted() {
    await this.renderChart(this.chartData, OPTION)
  },
  watch: {
    async chartData(val) {
      await this.renderChart(this.chartData, OPTION)
    }
  }
}
</script>
