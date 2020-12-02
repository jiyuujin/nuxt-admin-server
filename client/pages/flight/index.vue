<template>
  <main-template :user-status="userStatus">
    <j-modal title="フライトを追加する" @confirm="postFlight" @cancel="cancel">
      <div :style="{ padding: '8px' }">
        <div :style="{ padding: '8px 0' }">
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
            <div slot="input" slot-scope="picker" style="min-width: 350px">
              {{ picker }}
            </div>
          </v-single-picker>
        </div>
        <div :style="{ padding: '8px 0' }">
          <j-select
            :options="airportOptions"
            :values="state.form.departure"
            @handleSelect="applyDeparture"
          />
        </div>
        <div :style="{ padding: '8px 0' }">
          <j-select
            :options="airportOptions"
            :values="state.form.arrival"
            @handleSelect="applyArrival"
          />
        </div>
        <div :style="{ padding: '8px 0' }">
          <j-select
            :options="airlineOptions"
            :values="state.form.airline"
            @handleSelect="applyAirline"
          />
        </div>
        <div :style="{ padding: '8px 0' }">
          <j-select
            :options="boardingTypeOptions"
            :values="state.form.boardingType"
            @handleSelect="applyBoardingType"
          />
        </div>
        <div :style="{ padding: '8px 0' }">
          <j-input
            :text="state.form.registration"
            placeholder="レジ"
            @handleInput="applyRegistration"
          />
        </div>
      </div>
    </j-modal>

    <template v-if="flights">
      <div :style="{ display: 'flex', flexWrap: 'wrap', width: '100%' }">
        <google-chart
          chart-type="ColumnChart"
          :chart-data="chartData"
          :chart-options="{
            width: 450,
            height: 300,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' }
          }"
          style="width: 50%"
        />
        <google-chart
          chart-type="ColumnChart"
          :chart-data="localeChartData"
          :chart-options="{
            width: 450,
            height: 300,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: true
          }"
          style="width: 50%"
        />
        <google-chart
          chart-type="ColumnChart"
          :chart-data="airlineChartData"
          :chart-options="{
            width: 450,
            height: 300,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: true
          }"
          style="width: 50%"
        />
        <google-chart
          chart-type="ColumnChart"
          :chart-data="boardingTypeChartData"
          :chart-options="{
            width: 450,
            height: 300,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: true
          }"
          style="width: 50%"
        />
      </div>
    </template>
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

import UserComposable from '~/composables/user'
import FlightComposable from '~/composables/flight'

import {
  drawAirlineChart,
  drawBoardingTypeChart,
  drawChart,
  drawLocaleChart,
  fetchFlights
} from '~/services/flightService'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const GoogleChart = () => import('~/components/GoogleChart.vue')

export default defineComponent({
  components: {
    MainTemplate,
    GoogleChart
  },
  middleware: 'auth',
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    const flightModule = FlightComposable(props, ctx)
    return { ...userModule, ...flightModule }
  },
  async asyncData() {
    const flights = await fetchFlights()
    return {
      flights: flights,
      chartData: drawChart(flights.item),
      localeChartData: drawLocaleChart(flights.item),
      airlineChartData: drawAirlineChart(flights.item),
      boardingTypeChartData: drawBoardingTypeChart(flights.item)
    }
  }
})
</script>
