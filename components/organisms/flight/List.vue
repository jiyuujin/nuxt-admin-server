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
          {{ date.getTimeFormat(item.data.time) }}
        </li>
        <li class="airline">
          <img
            :src="airline(item.data.airline)"
            :alt="item.data.airline"
          >
        </li>
        <li class="airline__detail">
          <p>
            {{ departure(item.data.departure) }} to {{ arrival(item.data.arrival) }}
          </p>
          <p>
            {{ item.data.registration }} ({{ boardingType(item.data.boardingType) }})
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Date from '~/utils/date'
import { getAirportName } from '~/utils/airports'
import { getAirlineName } from '~/utils/airlines'
import { getBoardingTypeName } from '~/utils/boardingTypes'
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
  data () {
    return {
      date: Date
    }
  },
  methods: {
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
  font-size: 14px;
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

.airline {
  width: 20%;
}

.airline__detail {
  width: 60%;
}
</style>
