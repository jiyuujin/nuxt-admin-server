<template>
  <main-template :user-status="userStatus">
    <j-modal
      title="Flightを追加"
      :handle-cancel-click-callback="cancel"
      :handle-submit-click-callback="submit"
    >
      <div style="width: 100%; text-align: left;">
        <j-form title="搭乗時間">
          <j-range-picker
            ref="single-picker"
            :single-date-picker="datePicker.singleDatePicker"
            :show-dropdown="datePicker.showDropdown"
            :auto-apply="datePicker.autoApply"
            :linked-calendars="datePicker.linkedCalendars"
            :date-range="dateRange"
            :ranges="null"
            opens="right"
            :date-format="dateFormat"
            transition-type="slide-fade"
            @update="updateValues"
            @toggle="checkOpen"
          >
            <div slot="input" slot-scope="picker" style="min-width: 350px;">
              {{ picker.startDate }}
            </div>
          </j-range-picker>
        </j-form>
        <j-form title="出発／到着">
          <j-select
            :options="airportOptions"
            :selected-values="state.form.departure"
            @handleSelect="applyDeparture"
          />
          <j-select
            :options="airportOptions"
            :selected-values="state.form.arrival"
            @handleSelect="applyArrival"
          />
        </j-form>
        <j-form title="航空会社">
          <j-select
            :options="airlineOptions"
            :selected-values="state.form.airline"
            @handleSelect="applyAirline"
          />
        </j-form>
        <j-form title="搭乗機材／レジ">
          <j-select
            :options="boardingTypeOptions"
            :selected-values="state.form.boardingType"
            @handleSelect="applyBoardingType"
          />
          <j-input
            :text="state.form.registration"
            @handleInput="applyRegistration"
          />
        </j-form>
      </div>
    </j-modal>

    <template v-if="state.flights">
      <div v-for="item in state.flights.item" :key="item.id">
        <template v-if="item.page === state.activePage">
          <j-form :title="timeFormat(item.data.time)">
            <div>
              {{
                `${airline(item.data.airline)} : ${departure(
                  item.data.departure
                )} - ${arrival(item.data.arrival)}`
              }}
            </div>
            <div style="margin-bottom: 12px;">
              <j-label
                :text="item.data.registration"
                style="margin: 2px;"
              />
              <j-label
                :text="boardingType(item.data.boardingType)"
                style="margin: 2px;"
              />
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
  createComponent,
  SetupContext,
  reactive,
  computed,
  onMounted
} from '@vue/composition-api'
import dayjs from 'dayjs'
import { fetchFlights, addFlight } from '~/services/flightService'
import { DateRange } from '~/types/utils'
import { ItemDataList } from '~/types/database.types'
import {
  AIRLINE_LIST,
  AIRPORT_LIST,
  BOARDING_TYPE_LIST,
  getAirlineName,
  getAirportName,
  getBoardingTypeName
} from '~/utils/flight'
import { getTimeFormat } from '~/utils/date'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const Pagination = () => import('~/components/Pagination.vue')

export default createComponent({
  middleware: 'auth',
  components: {
    MainTemplate,
    Pagination
  },
  setup(props: {}, ctx: SetupContext) {
    const datePicker = reactive({
      singleDatePicker: true as boolean,
      showDropdown: true as boolean,
      autoApply: false as boolean,
      linkedCalendars: true as boolean,
      requestDate: {
        startDate: dayjs().format('YYYY/MM/DD')
      } as DateRange
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
    const dateRange = computed(() => datePicker.requestDate)

    onMounted(async () => {
      state.flights = await fetchFlights()
    })

    return {
      datePicker,
      state,
      airportOptions: AIRPORT_LIST,
      airlineOptions: AIRLINE_LIST,
      boardingTypeOptions: BOARDING_TYPE_LIST,
      userStatus,
      dateRange,
      applyPage(value) {
        state.activePage = value
      },
      updateValues(value: DateRange): void {
        datePicker.requestDate = value
        state.form.time = dayjs(value.startDate).format()
      },
      checkOpen(open: any): void {
        // console.log('event: ' + open)
      },
      dateFormat(classes: any, date: Date) {
        return classes
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
      timeFormat(t) {
        return getTimeFormat(t)
      },
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
      async submit() {
        await addFlight(state.form)
        // this.reset()
      }
    }
  }
})
</script>
