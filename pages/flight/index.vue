<template>
  <main-template
    v-if="flights"
    :loading="loading"
    :status="userStatus"
  >
    <form-template>
      <story-select
        :options="yearOptions"
        v-model="params.year"
        name="年"
      />
    </form-template>
    <form-template>
      <story-select
        :options="boardingTypeOptions"
        v-model="params.boardingType"
        name="搭乗機材"
      />
    </form-template>
    <FlightList
      :list="flights.item"
      :number="params.page"
      @form-data="applyEditedForm"
    />
    <Pagination
      :page="params.page"
      :max="Math.ceil(flights.item.length / 20)"
      @form-data="applyPage"
    />
    <new-flight />
    <edit-flight
      :edited-form="editedForm"
      :data-key="dataKey"
    />
  </main-template>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapState } from 'vuex'
import { BOARDING_TYPE_LIST, YEARS } from '~/utils/index'

import MainTemplate from '~/components/templates/MainTemplate'
import FormTemplate from '~/components/templates/FormTemplate'

import FlightList from '~/components/flight/List'
import NewFlight from '~/components/flight/New'
import EditFlight from '~/components/flight/Edit'
import Pagination from '~/components/layout/Pagination'

import StorySelect from '~/components/atoms/Select'

export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    FormTemplate,
    Pagination,
    FlightList,
    NewFlight,
    EditFlight,
    StorySelect
  },
  data() {
    return {
      editedForm: {
        time: moment(),
        departure: -1,
        arrival: -1,
        airline: -1,
        boardingType: -1,
        registration: ''
      },
      dataKey: '',
      params: {
        page: 1,
        year: 0,
        boardingType: 0
      },
      boardingTypes: BOARDING_TYPE_LIST,
      years: YEARS
    }
  },
  async mounted() {
    await this.$store.dispatch('initFlights', {
      boardingType: this.params.boardingType,
      year: this.params.year
    })
  },
  computed: {
    yearOptions () {
      let array = []
      YEARS.forEach(category => {
        array.push(category.text)
      })
      return array
    },
    boardingTypeOptions () {
      let array = []
      BOARDING_TYPE_LIST.forEach(category => {
        array.push(category.text)
      })
      return array
    },
    ...mapGetters(['flights']),
    ...mapState(['userStatus', 'dialog', 'loading'])
  },
  methods: {
    async startEdited() {
      await this.$store.dispatch('addDialog')
    },
    applyEditedForm(value) {
      this.editedForm = value.data
      this.dataKey = value.id
      this.startEdited()
    },
    applyPage(value) {
      this.params.page = value
    }
  }
}
</script>

<style scoped>

</style>
