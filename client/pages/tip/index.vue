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

    <template v-if="state.tips">
      <div v-for="item in state.tips.item" :key="item.id">
        <template v-if="item.page === state.activePage">
          <a :href="item.data.url" target="_blank" rel="noopener">
            <div class="font-bold">{{ timeFormat(item.data.time) }}</div>
            <div class="font-bold">{{ titleText(item) }}</div>
            <div class="text-gray-600 font-thin">
              {{ item.data.description }}
            </div>
            <template v-for="tag in item.data.tags">
              <j-label :key="tag" :text="tagText(tag)" style="margin: 2px;" />
            </template>
          </a>
        </template>
      </div>
      <j-pagination
        :items="state.tips.item !== undefined ? state.tips.item : []"
        :current-page="state.activePage"
        @handlePage="applyPage"
      />
    </template>
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
