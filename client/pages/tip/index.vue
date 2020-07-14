<template>
  <main-template :user-status="userStatus">
    <div v-if="state.events">
      <j-form title="タイトル">
        <j-input :text="state.form.title" @handleInput="applyTitle" />
      </j-form>
      <j-form title="URL">
        <j-input :text="state.form.url" @handleInput="applyUrl" />
      </j-form>
      <j-form title="詳細">
        <j-input
          :text="state.form.description"
          @handleInput="applyDescription"
        />
      </j-form>
      <j-form title="カテゴリー">
        <tag-modal :items="state.form.tags" @update="applyTags" />
      </j-form>
      <j-form title="イベント">
        <j-select
          :options="eventOptions"
          :values="state.form.event"
          @handleSelect="applyEvent"
        />
      </j-form>
    </div>

    <photo-upload />

    <j-form title="">
      <j-button text="Tipを追加" @handleClick="postTip" />
    </j-form>

    <template v-if="state.tips">
      <div v-for="item in state.tips.item" :key="item.id">
        <template v-if="item.page === state.activePage">
          <j-form :title="timeFormat(item.data.time)">
            <a :href="item.data.url" target="_blank" rel="noopener">
              <div class="font-bold">{{ titleText(item) }}</div>
              <div class="text-gray-400 font-thin">
                {{ item.data.description }}
              </div>
              <template v-for="tag in item.data.tags">
                <j-label :key="tag" :text="tagText(tag)" style="margin: 2px;" />
              </template>
            </a>
          </j-form>
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
