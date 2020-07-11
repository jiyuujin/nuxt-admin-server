<template>
  <main-template :user-status="userStatus">
    <div v-for="item in state.contacts.item" :key="item.id">
      <template v-if="item.page === state.activePage">
        <j-form :title="timeFormat(item.data.time)">
          <div class="font-bold">
            {{ titleText(item) }}
          </div>
          <div class="text-gray-400 font-thin">
            {{ item.data.description }}
          </div>
        </j-form>
      </template>
    </div>

    <j-pagination
      :items="state.contacts.item !== undefined ? state.contacts.item : []"
      :page="state.activePage"
      @handlePage="applyPage"
    />
  </main-template>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  onMounted,
  reactive,
  computed
} from '@vue/composition-api'
import { fetchContacts } from '~/services/contactService'
import { getTimeFormat } from '~/utils/date'

const MainTemplate = () => import('~/components/MainTemplate.vue')

export default defineComponent({
  middleware: 'auth',
  components: {
    MainTemplate
  },
  setup(props: {}, ctx: SetupContext) {
    const state = reactive({
      activePage: 1,
      contacts: {}
    })

    const userStatus = computed(() => ctx.root.$store.state.product.userStatus)

    onMounted(async () => {
      state.contacts = await fetchContacts()
    })

    return {
      state,
      userStatus,
      titleText(item: any) {
        return `${item.data.category.text} / ${item.data.title}`
      },
      applyPage(value: number) {
        state.activePage = value
      },
      timeFormat(t) {
        return getTimeFormat(t)
      }
    }
  }
})
</script>
