<template>
  <MainTemplate
    v-if="flights"
    :loading="loading"
    :status="userStatus"
  >
    <SingleSelectForm
      :option="years"
      :number="params.year"
      column="年"
      @form-data="applyYear"
    />
    <SingleSelectForm
      :option="boardingTypes"
      :number="params.boardingType"
      column="搭乗機材"
      @form-data="applyBoardingType"
    />
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
    <NewFlight />
    <EditFlight
      :edited-form="editedForm"
      :data-key="dataKey"
    />
  </MainTemplate>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapState } from 'vuex'
import MainTemplate from '~/components/templates/MainTemplate';
import Pagination from '~/components/atoms/Pagination'
import SingleSelectForm from '~/components/atoms/SingleSelectForm'
import FlightList from '~/components/organisms/flight/List'
import NewFlight from '~/components/organisms/flight/New'
import EditFlight from '~/components/organisms/flight/Edit'
import { BOARDING_TYPE_LIST, YEARS } from '~/utils/index'
export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    Pagination,
    SingleSelectForm,
    FlightList,
    NewFlight,
    EditFlight
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
    },
    async applyBoardingType(value) {
      this.params.boardingType = value
      await this.$store.dispatch('initFlights', {
        boardingType: this.params.boardingType,
        year: this.params.year
      })
    },
    async applyYear(value) {
      this.params.year = value
      await this.$store.dispatch('initFlights', {
        boardingType: this.params.boardingType,
        year: this.params.year
      })
    }
  }
}
</script>

<style scoped>

</style>
