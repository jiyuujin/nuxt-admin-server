<template>
  <div v-if="events">
    <form-template>
      <story-input
        v-model="title"
        placeholder="タイトル"
      />
    </form-template>
    <form-template>
      <story-input
        v-model="url"
        placeholder="URL"
      />
    </form-template>
    <form-template>
      <story-input
        v-model="description"
        placeholder="詳細"
      />
    </form-template>
    <form-template>
      <story-select
        :options="categoryOptions"
        v-model="tags"
        name="タグ"
      />
    </form-template>
    <form-template>
      <story-select
        :options="eventOptions"
        v-model="event"
        name="イベント"
      />
    </form-template>
    <form-template>
      <story-button
        text="Tipを追加"
        @click="postTip"
      />
    </form-template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import { CATEGORIES } from '~/utils'
const FormTemplate = () => import('~/components/templates/FormTemplate.vue')
const StoryInput = () => import('~/components/atoms/Input.vue')
const StorySelect = () => import('~/components/atoms/Select.vue')
const StoryButton = () => import('~/components/atoms/Button.vue')

@Component({
  components: {
    FormTemplate,
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
