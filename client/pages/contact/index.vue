<template>
  <main-template :user-status="userStatus">
    <div v-for="item in state.contacts.item" :key="item.id">
      <div v-if="item.page === state.activePage">
        <div class="px-4 py-2">
          {{ titleText(item) }}
        </div>
      </div>
    </div>

    <j-pagination
      :items="state.contacts.item !== undefined ? state.contacts.item : []"
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

const MainTemplate = () => import('~/components/MainTemplate.vue')

export default defineComponent({
  components: {
    MainTemplate
  },
  middleware: 'auth',
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    const contactModule = ContactComposable(props, ctx)
    return { ...userModule, ...contactModule }
  }
})
</script>
