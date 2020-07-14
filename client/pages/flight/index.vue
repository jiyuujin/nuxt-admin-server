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
      <!--
      <bar
        chart-id="flight-bar-chart"
        :chart-data="state.flights.item !== undefined ? state.flights.item : []"
        :options="chartOptions"
        :height="240"
      />
      -->
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

export default defineComponent({
  middleware: 'auth',
  components: {
    MainTemplate
  },
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    const flightModule = FlightComposable(props, ctx)
    return { ...userModule, ...flightModule }
  }
})
</script>
