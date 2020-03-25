<template>
  <main-template :user-status="userStatus">
    <template v-if="state.contacts">
      <div v-for="item in state.contacts.item" :key="item.id">
        <template v-if="item.page === state.activePage">
          <j-form :title="timeFormat(item.data.time)">
            <h3>
              <j-label
                :text="item.data.category.text"
                style="margin-right: 2px;"
              />
              {{ item.data.title }}
            </h3>
            <div style="margin-bottom: 12px;">
              {{ item.data.description }}
            </div>
          </j-form>
        </template>
      </div>
      <pagination
        :page="state.activePage"
        :max="
          state.contacts.item !== undefined
            ? Math.ceil(state.contacts.item.length / 20)
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
  onMounted,
  reactive,
  computed
} from '@vue/composition-api'
import { fetchContacts } from '~/services/contactService'
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
