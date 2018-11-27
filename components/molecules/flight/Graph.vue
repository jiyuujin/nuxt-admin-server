<script>
import { Bar, mixins } from 'vue-chartjs'
export default {
  mixins: [Bar, mixins.reactiveData],
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  async mounted() {
    await this.render()
  },
  methods: {
    async render() {
      await this.renderChart(
        {
          labels: [
            2015,
            2016,
            2017,
            2018,
            2019
          ],
          datasets: [
            {
              label: 'Flight Count',
              backgroundColor: '#f87979',
              data: this.data
            }
          ]
        },
        {
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
        }
      )
    }
  }
}
</script>
