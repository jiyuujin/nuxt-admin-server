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
      <pagination
        :page="state.activePage"
        :max="
          state.tips.item !== undefined
            ? Math.ceil(state.tips.item.length / 20)
            : 1
        "
        @form-data="applyPage"
      />
    </template>
  </main-template>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  reactive,
  computed,
  onMounted
} from '@vue/composition-api'
import { fetchTips, addTip } from '~/services/tipService'
import { fetchEvents } from '~/services/eventService'
import { ItemDataList } from '~/types/database'
import { CATEGORIES } from '~/utils/tip'
import { getTimeFormat } from '~/utils/date'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const PhotoUpload = () => import('~/components/PhotoUpload.vue')
const Pagination = () => import('~/components/Pagination.vue')
const TagModal = () => import('~/components/TagModal/Index.vue')

export default defineComponent({
  middleware: 'auth',
  components: {
    MainTemplate,
    PhotoUpload,
    Pagination,
    TagModal
  },
  setup(props: {}, ctx: SetupContext) {
    const state = reactive({
      activePage: 1 as number,
      tips: {} as ItemDataList,
      events: {} as ItemDataList,
      form: {
        title: '' as string,
        url: '' as string,
        description: '' as string,
        tags: [] as number[],
        event: 0 as number
      }
    })

    const userStatus = computed(() => ctx.root.$store.state.product.userStatus)
    const eventOptions = computed(() => {
      let array: object[] = []
      if (state.events.item !== undefined) {
        state.events.item.forEach((item) => {
          array.push({
            value: item.data.id,
            text: item.data.name
          })
        })
      }
      return array
    })

    onMounted(async () => {
      Promise.all([
        (state.events = await fetchEvents()),
        (state.tips = await fetchTips())
      ])
    })

    return {
      state,
      userStatus,
      eventOptions,
      applyPage(value: number) {
        state.activePage = value
      },
      applyTitle(value: string) {
        state.form.title = value
      },
      applyUrl(value: string) {
        state.form.url = value
      },
      applyDescription(value: string) {
        state.form.description = value
      },
      applyEvent(value: number) {
        state.form.event = value
      },
      timeFormat(t) {
        return getTimeFormat(t)
      },
      titleText(item: any) {
        return item.data.title
      },
      tagText(tagId: number) {
        let result: string = ''
        CATEGORIES.map((category) => {
          if (category.value === tagId) {
            result = category.text
          }
        })
        return result
      },
      reset() {
        state.form.title = ''
        state.form.url = ''
        state.form.description = ''
        state.form.tags = [0]
        state.form.event = 0
      },
      cancel() {
        // reset()
      },
      async postTip() {
        await addTip(state.form)
        // reset()
      },
      applyTags(values: number[]) {
        state.form.tags = [...values]
      }
    }
  }
})
</script>
