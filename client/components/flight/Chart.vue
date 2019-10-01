<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import { Bar } from 'vue-chartjs'
import { CHART_OPTIONS } from '~/utils/flight'

@Component({
    mounted () {
        (this as any).renderChart((this as any).chartData, CHART_OPTIONS)
    }
})
export default class FlightChart extends mixins(Bar) {
    @Prop() chartData;
}
</script>
