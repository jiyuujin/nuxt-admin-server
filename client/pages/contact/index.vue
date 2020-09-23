<template>
  <main-template :user-status="userStatus">
    <div class="flex flex-wrap flex-row">
      <template v-for="item in state.contacts.item">
        <div
          v-if="item.page === state.activePage"
          :key="item.id"
          :class="$device.isDesktop ? 'w-2/4' : 'w-full'"
          class="rounded-lg border-gray-400 shadow-card px-4 py-2 mb-2 h-24"
        >
          <div :class="$device.isDesktop ? 'mb-2' : ''">
            <div class="font-bold">
              {{ titleText(item) }}
            </div>
            <div class="text-gray-800 font-thin">
              {{ item.data.description }}
            </div>
          </div>
        </div>
      </template>
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
  middleware: 'auth',
  components: {
    MainTemplate
  },
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    const contactModule = ContactComposable(props, ctx)
    return { ...userModule, ...contactModule }
  }
})
</script>
