<template>
  <main-template :user-status="userStatus">
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
    </div>

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
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

import UserComposable from '~/composables/user'
import ContactComposable from '~/composables/contact'

import { drawChart, fetchContacts } from '~/services/contactService'

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
    const contactModule = ContactComposable(props, ctx)
    return { ...userModule, ...contactModule }
  },
  async asyncData() {
    const contacts = await fetchContacts()
    return {
      contacts: contacts,
      chartData: drawChart(contacts.item)
    }
  }
})
</script>
