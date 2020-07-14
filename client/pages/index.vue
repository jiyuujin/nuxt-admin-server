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
