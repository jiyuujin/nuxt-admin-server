<template>
  <div>
    <h3>
      Flight <span>({{ list.length }} レグ搭乗中)</span>
    </h3>
    <chart :chart-data="getChartDataset(list)" />
    <div class="flight">
      <card
        v-for="item in list"
        :key="item.id"
        v-if="item.page === number"
        :airline-id="item.data.airline"
        :boarding-type="`${boardingType(item.data.boardingType)}`"
        :route="`${departure(item.data.departure)} > ${arrival(item.data.arrival)}`"
        :name="item.data.registration"
        :time="timeFormat(item.data.time)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import { getAirportName, getAirlineName, getBoardingTypeName, getTimeFormat } from '~/utils/index'
import { FlightForm } from '~/types/database.types'
const Chart = () => import('./Chart.vue')
const Card = () => import('./Card.vue')

const YEARS: number[] = [
  2015,
  2016,
  2017,
  2018,
  2019
];

const LABEL_TEXT: string = 'Flights';

const COLOR_TEXT: string = '#42b883';

@Component({
  components: {
    Chart,
    Card
  },
})
export default class FlightList extends Vue {
  @Prop() list: FlightForm[];
  @Prop() number: number;

  timeFormat(t) {
    return getTimeFormat(t)
  }

  airline(id) {
    return getAirlineName(id)
  }

  departure(id) {
    return getAirportName(id)
  }

  arrival(id) {
    return getAirportName(id)
  }

  boardingType(id) {
    return getBoardingTypeName(id)
  }

  async editItem (item) {
    await this.$emit('form-data', Object.assign({}, item))
  }

  async deleteItem (item) {
    if (confirm(dayjs(item.data.time).format('YYYY年MM月DD日') + '\n' + item.data.registration + ' 削除しますか?')) {
      await this.delete(item.id)
    }
  }

  async delete(key) {
    await this.$store.dispatch('product/removeFlight', {
      'key': key,
      'data': []
    })
  }

  getChartDataset(items) {
    let dataset: number[] = []
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
</script>

<style scoped>
.flight {
  display: flex;
  flex-wrap: wrap;
}
</style>
