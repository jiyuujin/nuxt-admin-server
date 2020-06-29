<template>
  <main-template :user-status="userStatus">
    <div style="width: 100%; text-align: left;">
      <j-form title="搭乗時間">
        <v-single-picker
          ref="single-picker"
          :show-dropdown="datePicker.showDropdown"
          :auto-apply="datePicker.autoApply"
          :linked-calendars="datePicker.linkedCalendars"
          :date="datePicker.requestDate"
          opens="right"
          @update="updateValues"
          @toggle="checkOpen"
        >
          <div slot="input" slot-scope="picker" style="min-width: 350px;">
            {{ picker }}
          </div>
        </v-single-picker>
      </j-form>
      <j-form title="出発／到着">
        <div class="flex">
          <j-select
            :options="airportOptions"
            :values="state.form.departure"
            @handleSelect="applyDeparture"
          />
          <j-select
            :options="airportOptions"
            :values="state.form.arrival"
            @handleSelect="applyArrival"
          />
        </div>
      </j-form>
      <j-form title="航空会社">
        <j-select
          :options="airlineOptions"
          :values="state.form.airline"
          @handleSelect="applyAirline"
        />
      </j-form>
      <j-form title="搭乗機材">
        <j-select
          :options="boardingTypeOptions"
          :values="state.form.boardingType"
          @handleSelect="applyBoardingType"
        />
      </j-form>
      <j-form title="レジ">
        <j-input
          :text="state.form.registration"
          @handleInput="applyRegistration"
        />
      </j-form>
    </div>

    <j-form title="">
      <j-button text="Flightを追加" @handleClick="postFlight" />
    </j-form>

    <template v-if="state.flights">
      <bar
        chart-id="flight-bar-chart"
        :chart-data="flightItems"
        :options="chartOptions"
        :height="240"
      />
      <div v-for="item in state.flights.item" :key="item.id">
        <template v-if="item.page === state.activePage">
          <j-form :title="timeFormat(item.data.time)">
            <div class="font-bold">
              {{ titleText(item) }}
            </div>
            <div class="text-gray-400 font-thin">
              {{ descriptionText(item) }}
            </div>
          </j-form>
        </template>
      </div>
      <pagination
        :page="state.page"
        :max="
          state.flights.item !== undefined
            ? Math.ceil(state.flights.item.length / 20)
            : 1
        "
        @form-data="applyPage"
      />
    </template>
  </main-template>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  reactive,
  computed,
  onMounted
} from '@vue/composition-api'
import dayjs from 'dayjs'
import { fetchFlights, addFlight } from '~/services/flightService'
import { ItemDataList } from '~/types/database'
import {
  AIRLINE_LIST,
  AIRPORT_LIST,
  BOARDING_TYPE_LIST,
  getAirlineName,
  getAirportName,
  getBoardingTypeName
} from '~/utils/flight'
import { getTimeFormat } from '~/utils/date'
import { CHART_OPTIONS } from '~/utils/flight'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const Pagination = () => import('~/components/Pagination.vue')

export default defineComponent({
  middleware: 'auth',
  components: {
    MainTemplate,
    Pagination
  },
  setup(props: {}, ctx: SetupContext) {
    const datePicker = reactive({
      showDropdown: true as boolean,
      autoApply: false as boolean,
      linkedCalendars: true as boolean,
      requestDate: dayjs().format('YYYY/MM/DD') as string
    })

    const state = reactive({
      activePage: 1 as number,
      flights: {} as ItemDataList,
      form: {
        time: '' as string,
        departure: 0 as number,
        arrival: 0 as number,
        airline: 0 as number,
        boardingType: 0 as number,
        registration: '' as string
      }
    })

    const userStatus = computed(() => ctx.root.$store.state.product.userStatus)
    const flightItems = computed(() => state.flights.item)

    onMounted(async () => {
      state.flights = await fetchFlights()
    })

    return {
      datePicker,
      state,
      airportOptions: AIRPORT_LIST,
      airlineOptions: AIRLINE_LIST,
      boardingTypeOptions: BOARDING_TYPE_LIST,
      chartOptions: CHART_OPTIONS,
      userStatus,
      flightItems,
      applyPage(value) {
        state.activePage = value
      },
      updateValues(value: string): void {
        datePicker.requestDate = value
        state.form.time = dayjs(value).format()
      },
      checkOpen(open: any): void {
        // console.log('event: ' + open)
      },
      applyDeparture(value) {
        state.form.departure = value
      },
      applyArrival(value) {
        state.form.arrival = value
      },
      applyAirline(value) {
        state.form.airline = value
      },
      applyBoardingType(value) {
        state.form.boardingType = value
      },
      applyRegistration(value) {
        state.form.registration = value
      },
      titleText(item: any) {
        return `${getAirlineName(item.data.airline)} : ${getAirportName(
          item.data.departure
        )} - ${getAirportName(item.data.arrival)}`
      },
      descriptionText(item: any) {
        return `${item.data.registration} (${getBoardingTypeName(
          item.data.boardingType
        )})`
      },
      timeFormat(t) {
        return getTimeFormat(t)
      },
      reset() {
        state.form.time = ''
        state.form.departure = 0
        state.form.arrival = 0
        state.form.airline = 0
        state.form.boardingType = 0
        state.form.registration = ''
      },
      cancel() {
        // this.reset()
      },
      async postFlight() {
        await addFlight(state.form)
        // this.reset()
      }
    }
  }
})
</script>
