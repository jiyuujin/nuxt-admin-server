<template>
  <div>
    <h3>
      Flight
      <span>
        {{ list.length }} レグ搭乗中
      </span>
    </h3>
    <FlightChart
      :chart-data="getChartDataset(list)"
    />
    <div
      v-for="item in list"
      :key="item.id"
      class="flight"
    >
      <ul
        v-if="item.page === number"
      >
        <li class="date">
          {{ timeFormat(item.data.time) }}
        </li>
        <li class="airline">
          <img
            :src="airline(item.data.airline)"
            :alt="item.data.airline"
          >
        </li>
        <li class="departure">
          {{ departure(item.data.departure) }}
        </li>
        <li class="arrival">
          {{ arrival(item.data.arrival) }}
        </li>
        <li class="registration">
          {{ item.data.registration }}
        </li>
        <li class="boarding-type">
          ({{ boardingType(item.data.boardingType) }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import FlightChart from './FlightChart'
import { getAirportName, getAirlineName, getBoardingTypeName, getTimeFormat } from '~/utils/index'

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
    },
    number: {
      type: Number,
      required: true
    }
  },
  components: {
    FlightChart
  },
  methods: {
    timeFormat(t) {
      return getTimeFormat(t)
    },
    airline(id) {
      return getAirlineName(id)
    },
    departure(id) {
      return getAirportName(id)
    },
    arrival(id) {
      return getAirportName(id)
    },
    boardingType(id) {
      return getBoardingTypeName(id)
    },
    editItem (item) {
      this.$emit('form-data', Object.assign({}, item))
    },
    deleteItem (item) {
      if (confirm(moment(item.data.time).format('YYYY年MM月DD日') + '\n' + item.data.registration + ' 削除しますか?')) {
        this.delete(item.id)
      }
    },
    async delete(key) {
      await this.$store.dispatch('removeFlight', {
        'key': key,
        'data': []
      })
    },
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
.flight {
  margin: 0 auto;
}

ul {
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
}

ul li {
  list-style: none;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

img {
  width: 25px;
}

.date {
  width: 20%;
}

.departure {
  width: 20%;
}

.arrival {
  width: 20%;
}

.registration {
  width: 20%;
}

.boarding-type {
  width: 20%;
}
</style>
