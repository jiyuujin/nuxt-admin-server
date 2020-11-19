<template>
  <main-template :user-status="userStatus">
    <photo-upload />
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import UserComposable from '~/composables/user'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const PhotoUpload = () => import('~/components/PhotoUpload.vue')

export default defineComponent({
  components: {
    MainTemplate,
    PhotoUpload
  },
  middleware: 'auth',
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    return { ...userModule }
  }
})
</script>
