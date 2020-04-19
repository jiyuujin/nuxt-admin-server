import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import { ChartData, ChartOptions } from 'chart.js'
import { Bar, mixins } from 'vue-chartjs'

type VCData = {
  chartData: ChartData
}

type VCMethod = {
  renderChart(chartData: ChartData, options: ChartOptions): void
}

type VCComputed = unknown

type VCProps = {
  options: Object
}

const VueChartPlugin: Plugin = () => {
  const { reactiveProp } = mixins

  Vue.component<VCData, VCMethod, VCComputed, VCProps>('bar', {
    extends: Bar,
    mixins: [reactiveProp],
    props: {
      options: {
        type: Object,
        default: () => {}
      }
    },
    mounted(): void {
      this.renderChart(this.chartData, this.options)
    }
  })
}

export default VueChartPlugin
