<template>
  <main-template :user-status="userStatus">
    <div :style="{ padding: '8px 0' }">
      <tag-modal :items="tags" @update="applyTags" />
    </div>
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref } from '@vue/composition-api'

import UserComposable from '~/composables/user'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const TagModal = () => import('~/components/TagModal/Index.vue')

export default defineComponent({
  components: {
    MainTemplate,
    TagModal
  },
  middleware: 'auth',
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    const tags = ref<number[]>([])
    const applyTags = (values: number[]) => {
      tags.value = [...values]
    }
    return { ...userModule, tags, applyTags }
  }
})
</script>
