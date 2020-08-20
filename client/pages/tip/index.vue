<template>
  <main-template :user-status="userStatus">
    <div v-if="state.events">
      <div style="padding: 8px 0;">
        <j-input
          :text="state.form.title"
          placeholder="タイトル"
          @handleInput="applyTitle"
        />
      </div>
      <div style="padding: 8px 0;">
        <j-input
          :text="state.form.url"
          placeholder="URL"
          @handleInput="applyUrl"
        />
      </div>
      <div style="padding: 8px 0;">
        <j-input
          :text="state.form.description"
          placeholder="詳細"
          @handleInput="applyDescription"
        />
      </div>
      <div style="padding: 8px 0;">
        <tag-modal :items="state.form.tags" @update="applyTags" />
      </div>
      <div style="padding: 8px 0;">
        <j-select
          :options="eventOptions"
          :values="state.form.event"
          @handleSelect="applyEvent"
        />
      </div>
    </div>

    <div style="padding: 8px 0;">
      <j-button text="Tipを追加" @handleClick="postTip" />
    </div>

    <photo-upload />
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import UserComposable from '~/composables/user'
import TipComposable from '~/composables/tip'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const PhotoUpload = () => import('~/components/PhotoUpload.vue')
const TagModal = () => import('~/components/TagModal/Index.vue')

export default defineComponent({
  middleware: 'auth',
  components: {
    MainTemplate,
    PhotoUpload,
    TagModal
  },
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    const tipModule = TipComposable(props, ctx)
    return { ...userModule, ...tipModule }
  }
})
</script>
