<template>
  <main-template :user-status="userStatus">
    <h2>Github issue</h2>
    <div class="flex flex-wrap flex-row">
      <template v-for="issue in issues">
        <div
          :key="issue.id"
          :class="$device.isDesktop ? 'w-2/4' : 'w-full'"
          class="rounded-lg border-gray-400 shadow-card px-4 py-2 mb-2 h-24"
        >
          <a :href="issue.url" target="_blank" rel="noopener">
            {{ issue.title }}
          </a>
          <div class="text-gray-800 font-thin">
            {{ issue.repositoryName }}
          </div>
        </div>
      </template>
    </div>

    <h2>Blog contact</h2>
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
      @handlePage="applyPage"
    />
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import UserComposable from '~/composables/user'
import ContactComposable from '~/composables/contact'

const MainTemplate = () => import('~/components/MainTemplate.vue')

import { fetchRepositories } from '~/services/githubService'

export default defineComponent({
  middleware: 'auth',
  components: {
    MainTemplate
  },
  async asyncData() {
    return {
      issues: await fetchRepositories()
    }
  },
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    const contactModule = ContactComposable(props, ctx)
    return { ...userModule, ...contactModule }
  }
})
</script>
