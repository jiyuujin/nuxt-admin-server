<template>
  <main-template :user-status="userStatus">
    <ul class="flex border-b">
      <li
        v-for="(menu, index) in ['Issue', 'PullRequest']"
        :key="menu"
        class="mr-1"
      >
        <a
          :class="
            isSelected === index
              ? 'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold'
              : 'bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold'
          "
          @click="select(index)"
        >
          {{ menu }}
        </a>
      </li>
    </ul>

    <template v-if="isSelected === 0">
      <div v-for="issue in issues" :key="issue.id">
        <div class="px-4 py-2">
          <a :href="issue.url" target="_blank" rel="noopener">
            {{ issue.title }}
          </a>
        </div>
      </div>
    </template>

    <template v-if="isSelected === 1">
      <div v-for="pullRequest in pullRequests" :key="pullRequest.id">
        <div class="px-4 py-2">
          <a :href="pullRequest.url" target="_blank" rel="noopener">
            {{ pullRequest.title }}
          </a>
        </div>
      </div>
    </template>
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref } from '@vue/composition-api'

import UserComposable from '~/composables/user'

import { fetchRepositories } from '~/services/githubService'

const MainTemplate = () => import('~/components/MainTemplate.vue')

export default defineComponent({
  components: {
    MainTemplate
  },
  middleware: 'auth',
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    const isSelected = ref<number>(0)
    const select = (val: number) => {
      isSelected.value = val
    }
    return { ...userModule, isSelected, select }
  },
  async asyncData() {
    const { issues, pullRequests } = await fetchRepositories()
    return {
      issues: issues,
      pullRequests: pullRequests
    }
  }
})
</script>
