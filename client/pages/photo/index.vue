<template>
  <main-template :user-status="userStatus">
    <input type="file" @change="onFileChange" />
    <div v-if="state.content" style="margin-top: 12px">
      アップロード結果:
      <div class="preview">
        <img :src="state.content" :alt="state.name" decoding="async" />
      </div>
    </div>
    <j-button text="Photoを追加" @handleClick="postPhoto" />
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import UserComposable from '~/composables/user'
import PhotoComposable from '~/composables/photo'

const MainTemplate = () => import('~/components/MainTemplate.vue')

export default defineComponent({
  components: {
    MainTemplate
  },
  middleware: 'auth',
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    const photoModule = PhotoComposable(props, ctx)
    return { ...userModule, ...photoModule }
  }
})
</script>
