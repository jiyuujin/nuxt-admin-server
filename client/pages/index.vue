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
      <div
        class="px-4 py-2 flex flex-row flex-wrap justify-center item-center w-full"
      >
        <a
          v-for="issue in issues"
          :key="issue.id"
          :href="issue.url"
          target="_blank"
          rel="noopener"
          class="w-1/2 overflow-hidden flex flex-start py-4 text-xl"
        >
          <span
            class="flex justify-center item-center align-middle w-16 h-16 m-2 border-solid border-1 border-card rounded-2xl text-reaction"
          >
            {{ issue.repositoryName.slice(0, 1).toUpperCase() }}
          </span>
          <div>
            <div class="text-base font-bold overflow-hidden">
              {{ issue.title }}
            </div>
            <div class="text-date overflow-hidden flex justify-between">
              {{ dateFormat(issue.createdAt) }}
            </div>
          </div>
        </a>
      </div>
    </template>

    <template v-if="isSelected === 1">
      <div
        class="px-4 py-2 flex flex-row flex-wrap justify-center item-center w-full"
      >
        <a
          v-for="pullRequest in pullRequests"
          :key="pullRequest.id"
          :href="pullRequest.url"
          target="_blank"
          rel="noopener"
          class="w-1/2 overflow-hidden flex flex-start py-4 text-xl"
        >
          <span
            class="flex justify-center item-center align-middle w-16 h-16 m-2 border-solid border-1 border-card rounded-2xl text-reaction"
          >
            {{ pullRequest.repositoryName.slice(0, 1).toUpperCase() }}
          </span>
          <div>
            <div class="text-base font-bold overflow-hidden">
              {{ pullRequest.title }}
            </div>
            <div class="text-date overflow-hidden flex justify-between">
              {{ dateFormat(pullRequest.createdAt) }}
            </div>
          </div>
        </a>
      </div>
    </template>
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref } from '@vue/composition-api'
import dayjs from 'dayjs'

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
    const dateFormat = (d: string) => {
      return dayjs(d).format('YYYY/MM/DD HH:mm')
    }
    return { ...userModule, isSelected, select, dateFormat }
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
