<template>
  <main-template :user-status="userStatus">
    <modal title="問い合わせを確認する" @cancel="cancel">
      <div :style="{ padding: '8px', height: '400px', overflowY: 'scroll' }">
        <div v-for="item in contacts.item" :key="item.id">
          <div v-if="item.page === state.activePage">
            <div class="px-4 py-2">
              {{ titleText(item) }}
            </div>
          </div>
        </div>

        <j-pagination
          :items="contacts.item !== undefined ? contacts.item : []"
          :page="state.activePage"
          :per-page="state.perPage"
          @handlePage="applyPage"
        />
      </div>
    </modal>

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
        :chart-data="chartDataByVue"
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
        :chart-data="chartDataByTypeScript"
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
        :chart-data="chartDataByFJUGMeetup"
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
        :chart-data="chartDataByFJUGHandson"
        :chart-options="{
          width: 450,
          height: 300,
          legend: { position: 'top', maxLines: 3 },
          bar: { groupWidth: '75%' }
        }"
        style="width: 50%"
      />
    </div>
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

import UserComposable from '~/composables/user'
import ContactComposable from '~/composables/contact'

import {
  drawChart as drawContactChart,
  fetchContacts
} from '~/services/contactService'
import {
  drawChart as drawMeetupChart,
  fetchMeetups
} from '~/services/meetupService'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const GoogleChart = () => import('~/components/GoogleChart.vue')
const Modal = () => import('~/components/Modal.vue')

export default defineComponent({
  components: {
    MainTemplate,
    GoogleChart,
    Modal
  },
  middleware: 'auth',
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    const contactModule = ContactComposable(props, ctx)
    return { ...userModule, ...contactModule }
  },
  async asyncData() {
    const contacts = await fetchContacts()
    const meetups = await fetchMeetups()
    return {
      contacts: contacts,
      chartData: drawContactChart(contacts.item),
      meetups: meetups,
      chartDataByVue: drawMeetupChart(meetups, 'meetup', 'v-kansai'),
      chartDataByTypeScript: drawMeetupChart(meetups, 'meetup', 'kansai.ts'),
      chartDataByFJUGMeetup: drawMeetupChart(
        meetups,
        'meetup',
        'Flutter Osaka'
      ),
      chartDataByFJUGHandson: drawMeetupChart(
        meetups,
        'handson',
        'Flutter Osaka'
      )
    }
  }
})
</script>
