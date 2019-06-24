<template>
  <main-template
    v-if="flights"
    :user-status="userStatus"
  >
    <main-template :is-form="isForm">
      <story-select
        :options="yearOptions"
        v-model="selectedYaer"
        name="年"
      />
    </main-template>
    <main-template :is-form="isForm">
      <story-select
        :options="boardingTypeOptions"
        v-model="selectedBoardingType"
        name="搭乗機材"
      />
    </main-template>
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
import { BOARDING_TYPE_LIST, YEARS } from '../../utils'
const MainTemplate = () => import('../../components/layout/MainTemplate.vue')
const FlightList = () => import('../../components/flight/List.vue')
const NewFlight = () => import('../../components/flight/New.vue')
const EditFlight = () => import('../../components/flight/Edit.vue')
const Pagination = () => import('../../components/layout/Pagination.vue')
const StorySelect = () => import('../../components/atoms/Select.vue')

@Component({
  middleware: 'auth',
  components: {
    MainTemplate,
    Pagination,
    FlightList,
    NewFlight,
    EditFlight,
    StorySelect
  },
  async fetch({ store }) {
    await store.dispatch('product/fetchFlights', {
      boardingType: 0,
      year: 0
    })
  },
  computed: {
    yearOptions (this: FlightPage) {
      let array: string[] = []
      YEARS.forEach(category => {
        array.push(category.text)
      })
      return array
    },
    boardingTypeOptions (this: FlightPage) {
      let array: string[] = []
      BOARDING_TYPE_LIST.forEach(category => {
        array.push(category.text)
      })
      return array
    }
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
  isForm: boolean = true;

  get userStatus () {
    return this.$store.state.product.userStatus
  }

  get dialog () {
    return this.$store.state.product.dialog
  }

  get flights () {
    return this.$store.state.product.flights
  }

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
