<template>
  <div v-if="events">
    <main-template :is-form="isForm">
      <story-input
        v-model="title"
        placeholder="タイトル"
      />
    </main-template>
    <main-template :is-form="isForm">
      <story-input
        v-model="url"
        placeholder="URL"
      />
    </main-template>
    <main-template :is-form="isForm">
      <story-input
        v-model="description"
        placeholder="詳細"
      />
    </main-template>
    <main-template :is-form="isForm">
      <story-select
        :options="categoryOptions"
        v-model="tags"
        name="タグ"
      />
    </main-template>
    <main-template :is-form="isForm">
      <story-select
        :options="eventOptions"
        v-model="event"
        name="イベント"
      />
    </main-template>
    <main-template :is-form="isForm">
      <story-button
        text="Tipを追加"
        @click="postTip"
      />
    </main-template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import { CATEGORIES } from '~/utils'
const MainTemplate = () => import('~/components/layout/MainTemplate.vue')
const StoryInput = () => import('~/components/atoms/Input.vue')
const StorySelect = () => import('~/components/atoms/Select.vue')
const StoryButton = () => import('~/components/atoms/Button.vue')

@Component({
  components: {
    MainTemplate,
    StoryInput,
    StorySelect,
    StoryButton
  },
  computed: {
    categoryOptions (this: NewTip) {
      let array: string[] = []
      CATEGORIES.forEach((item) => {
        array.push(item.text)
      })
      return array
    },
    eventOptions (this: NewTip) {
      let array: string[] = []
      this.$store.state.product.events.item.forEach((item) => {
        array.push(item.data.name)
      })
      return array
    }
  },
  async created () {
    await this.$store.dispatch('product/fetchEvents')
  },
})
export default class NewTip extends Vue {
  title: string = '';
  url: string = '';
  description: string = '';
  tags: number[] = [];
  event: number = 0;
  isForm: boolean = true;

  get events () {
    return this.$store.state.product.events
  }

  applyTags (value) {
    this.tags = value
  }

  reset () {
    this.title = ''
    this.url = ''
    this.description = ''
    this.tags = []
    this.event = 0
  }

  async postTip () {
    await this.$store.dispatch('product/addTip', {
      title: this.title,
      url: this.url,
      description: this.description,
      tags: [this.tags],
      event: this.event,
      time: dayjs().format('')
    })
    this.reset()
  }
}
</script>

<style scoped>

</style>
