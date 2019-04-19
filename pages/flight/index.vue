<template>
  <main-template
    v-if="flights"
    :loading="loading"
    :user-status="userStatus"
  >
    <form-template>
      <story-select
        :options="yearOptions"
        v-model="selectedYaer"
        name="年"
      />
    </form-template>
    <form-template>
      <story-select
        :options="boardingTypeOptions"
        v-model="selectedBoardingType"
        name="搭乗機材"
      />
    </form-template>
    <flight-list
      :list="flights.item"
      :number="page"
      @form-data="applyEditedForm"
    />
    <pagination
      :page="page"
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

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import { BOARDING_TYPE_LIST, YEARS } from '~/utils/index'
const MainTemplate = () => import('~/components/templates/MainTemplate.vue')
const FormTemplate = () => import('~/components/templates/FormTemplate.vue')
const FlightList = () => import('~/components/flight/List.vue')
const NewFlight = () => import('~/components/flight/New.vue')
const EditFlight = () => import('~/components/flight/Edit.vue')
const Pagination = () => import('~/components/layout/Pagination.vue')
const StorySelect = () => import('~/components/atoms/Select.vue')

@Component({
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
  async fetch({ store }) {
    await store.dispatch('product/initFlights', {
      boardingType: 0,
      year: 0
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
    ...mapState({
      userStatus: state => state.product.userStatus,
      loading: state => state.product.loading,
      dialog: state => state.product.dialog,
      flights: state => state.product.flights
    })
  },
})
export default class FlightPage extends Vue {
  editedForm = {
    departure: 0,
    arrival: 0,
    airline: 0,
    boardingType: 0,
    registration: '',
    time: ''
  };
  dataKey: string = '';
  page: number = 1;
  selectedYaer: number = 2019;
  selectedBoardingType: number = 0;

  async startEdited() {
    await this.$store.dispatch('product/addDialog')
  }

  applyEditedForm(value) {
    this.editedForm = value.data
    this.dataKey = value.id
    this.startEdited()
  }

  applyPage(value) {
    this.page = value
  }
}
</script>

<style scoped>

</style>
