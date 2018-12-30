<template>
  <div>
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
import { getAirportName, getAirlineName, getBoardingTypeName, getTimeFormat } from '~/utils/index'
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
