<template>
  <MainTemplate
    :loading="loading"
  >
    <Status
      :list="count"
    />
    <FlightList
      :list="flights"
      @form-data="applyEditedForm"
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
import FlightList from '~/components/organisms/flight/List'
import NewFlight from '~/components/organisms/flight/New'
import EditFlight from '~/components/organisms/flight/Edit'
import Status from '~/components/organisms/flight/Status'
export default {
  middleware: 'auth',
  components: {
    MainTemplate,
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
      dataKey: ''
    }
  },
  async mounted() {
    this.flights.length ? Promise.resolve() : this.$store.dispatch('initFlights')
  },
  computed: {
    ...mapGetters(['userStatus', 'flights', 'count']),
    ...mapState(['dialog', 'loading'])
  },
  methods: {
    async startEdited() {
      await this.$store.dispatch('addDialog')
    },
    applyEditedForm(value) {
      this.editedForm = value
      this.dataKey = value['.key']
      this.startEdited()
    }
  }
}
</script>

<style scoped>

</style>
