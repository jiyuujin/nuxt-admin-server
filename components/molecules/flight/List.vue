<template>
  <v-data-table
    :headers="header"
    :items="list"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>
        {{ date.getTimeFormat(props.item.time) }}
      </td>
      <td>
        <img
          :src="airline(props.item.airline)"
          :alt="props.item.airline"
          width="50px"
        >
      </td>
      <td>
        {{ departure(props.item.departure) }} to {{ arrival(props.item.arrival) }}
      </td>
      <td>
        {{ props.item.registration }} ({{ boardingType(props.item.boardingType) }})
      </td>
      <td>
        <v-icon
          small
          class="mr-2"
          @click="editItem(props.item)"
        >
          edit
        </v-icon>
        <v-icon
          small
          @click="deleteItem(props.item)"
        >
          delete
        </v-icon>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment'
import Date from '~/utils/date'
import { FLIGHT_HEADER_LIST } from '../../../utils/menu'
import { getAirportName } from '../../../utils/airports'
import { getAirlineName } from '../../../utils/airlines'
import { getBoardingTypeName } from '../../../utils/boardingTypes'
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      header: FLIGHT_HEADER_LIST,
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
      if (confirm(moment(item.time).format('YYYY年MM月DD日') + '\n' + item.registration + ' 削除しますか?')) {
        this.delete(item['.key'])
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

</style>
