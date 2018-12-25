<template>
  <MainTemplate
    v-if="flights"
    :loading="loading"
    :status="userStatus"
  >
    <Status
      :list="flights.item"
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
import FlightList from '~/components/organisms/flight/List'
import NewFlight from '~/components/organisms/flight/New'
import EditFlight from '~/components/organisms/flight/Edit'
import Status from '~/components/organisms/flight/Status'
export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    Pagination,
    FlightList,
    NewFlight,
    EditFlight,
    Status
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
        page: 1
      }
    }
  },
  async mounted() {
    this.flights ? Promise.resolve() : this.$store.dispatch('initFlights')
  },
  computed: {
    ...mapGetters(['userStatus', 'flights']),
    ...mapState(['dialog', 'loading'])
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
