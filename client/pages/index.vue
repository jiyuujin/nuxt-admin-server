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
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import UserComposable from '~/composables/user'

const MainTemplate = () => import('~/components/MainTemplate.vue')

import { fetchRepositories } from '~/services/githubService'

export default defineComponent({
  components: {
    MainTemplate
  },
  middleware: 'auth',
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    return { ...userModule }
  },
  async asyncData() {
    return {
      issues: await fetchRepositories()
    }
  }
})
</script>
