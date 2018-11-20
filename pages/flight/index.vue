<template>
  <div>
    <LeftMenu />
    <v-container
      class="site"
    >
      <StatusList
        :list="flights"
      />
      <Loading />
      <FlightList
        :list="flights"
        @form-data="applyEditedForm"
      />
      <NewFlight />
      <EditFlight
        :edited-form="editedForm"
        :data-key="dataKey"
      />
    </v-container>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapState } from 'vuex'
import FlightList from '~/components/molecules/flight/List'
import NewFlight from '~/components/molecules/flight/New'
import EditFlight from '~/components/molecules/flight/Edit'
import StatusList from '~/components/molecules/flight/StatusList'
import LeftMenu from '~/components/molecules/layout/LeftMenu'
import Loading from '~/components/organisms/Loading'
export default {
  middleware: 'auth',
  components: {
    FlightList,
    NewFlight,
    EditFlight,
    StatusList,
    LeftMenu,
    Loading
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
    ...mapGetters(['userStatus', 'flights']),
    ...mapState(['dialog'])
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
.site {
  width: 95%;
}
</style>
