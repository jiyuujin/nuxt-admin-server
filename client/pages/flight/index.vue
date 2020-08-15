<template>
  <main-template :user-status="userStatus">
    <div style="width: 100%; text-align: left;">
      <div style="padding: 8px 0;">
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
      </div>
      <div style="padding: 8px 0;">
        <j-select
          :options="airportOptions"
          :values="state.form.departure"
          @handleSelect="applyDeparture"
        />
      </div>
      <div style="padding: 8px 0;">
        <j-select
          :options="airportOptions"
          :values="state.form.arrival"
          @handleSelect="applyArrival"
        />
      </div>
      <div style="padding: 8px 0;">
        <j-select
          :options="airlineOptions"
          :values="state.form.airline"
          @handleSelect="applyAirline"
        />
      </div>
      <div style="padding: 8px 0;">
        <j-select
          :options="boardingTypeOptions"
          :values="state.form.boardingType"
          @handleSelect="applyBoardingType"
        />
      </div>
      <div style="padding: 8px 0;">
        <j-input
          :text="state.form.registration"
          placeholder="レジ"
          @handleInput="applyRegistration"
        />
      </div>
    </div>

    <div style="padding: 8px 0;">
      <j-button text="Flightを追加" @handleClick="postFlight" />
    </div>

    <template v-if="state.flights">
      <!--
      <bar
        chart-id="flight-bar-chart"
        :chart-data="state.flights.item !== undefined ? state.flights.item : []"
        :options="chartOptions"
        :height="240"
      />
      -->
      <google-chart
        chart-type="ColumnChart"
        :chart-data="state.chartData"
        :chart-options="state.chartOptions"
      />
      <div v-for="item in state.flights.item" :key="item.id">
        <template v-if="item.page === state.activePage">
          <div class="flex space-around">
            <div class="w-4/5 text-left">
              <div class="font-bold">
                {{ timeFormat(item.data.time) }}
              </div>
              <div class="font-bold">
                {{ titleText(item) }}
              </div>
              <div class="text-gray-600 font-thin">
                {{ descriptionText(item) }}
              </div>
            </div>
            <div class="w-1/5 text-right">
              <div class="font-bold">
                {{ airlineText(item.data.airline) }}
              </div>
            </div>
          </div>
        </template>
      </div>
      <j-pagination
        :items="state.flights.item !== undefined ? state.flights.item : []"
        :current-page="state.activePage"
        @handlePage="applyPage"
      />
    </template>
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import UserComposable from '~/composables/user'
import FlightComposable from '~/composables/flight'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const GoogleChart = () => import('~/components/GoogleChart.vue')

export default defineComponent({
  middleware: 'auth',
  components: {
    MainTemplate,
    GoogleChart
  },
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    const flightModule = FlightComposable(props, ctx)
    return { ...userModule, ...flightModule }
  }
})
</script>
