<script lang="ts">
import Vue from 'vue'
import { Bar } from 'vue-chartjs'
import { CHART_OPTIONS } from '~/utils/flight'

export default Vue.extend({
    mixins: [Bar],
    props: {
        chartData: {
            type: Object,
            required: true
        }
    },
    mounted () {
        (this as any).renderChart(this.chartData, CHART_OPTIONS)
    }
})
</script>
