<template>
  <div v-if="events">
    <main-template :is-form="isForm">
      <story-input
        v-model="name"
        placeholder="イベント名"
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
      <story-input
        v-model="location"
        placeholder="場所"
      />
    </main-template>
    <main-template :is-form="isForm">
      <story-select
        :options="localeOptions"
        v-model="locale"
      />
    </main-template>
    <main-template :is-form="isForm">
      <story-input
        v-model="participants"
        placeholder="参加者数"
      />
    </main-template>
    <main-template :is-form="isForm">
      <story-input
        v-model="max_participants"
        placeholder="最大参加者数"
      />
    </main-template>
    <main-template :is-form="isForm">
      <story-input
        v-model="lt"
        placeholder="登壇・LT数"
      />
    </main-template>
    <main-template :is-form="isForm">
      <story-button
        text="Hostを追加"
        @click="postHost"
      />
    </main-template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CATEGORIES, LOCALES } from '~/utils'
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
    categoryOptions (this: NewHost) {
      let array: string[] = []
      CATEGORIES.forEach(category => {
        array.push(category.text)
      })
      return array
    },
    localeOptions () {
      let array: string[] = []
      LOCALES.forEach(locale => {
        array.push(locale.text)
      })
      return array
    },
    eventOptions (this: NewHost) {
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
export default class NewHost extends Vue {
  name: string = '';
  event: number = 0;
  location: string = '';
  locale: number = 0;
  participants: number = 0;
  max_participants: number = 0;
  lt: number = 0;
  isForm: boolean = true;

  get events () {
    return this.$store.state.product.events
  }

  reset () {
    this.name = ''
    this.event = 0
    this.location = ''
    this.locale = 0
    this.participants = 0
    this.max_participants = 0
    this.lt = 0
  }

  async postHost () {
    await this.$store.dispatch('product/addHost', {
      name: this.name,
      event: this.event,
      location: this.location,
      locale: this.locale,
      participants: this.participants,
      max_participants: this.max_participants,
      lt: this.lt
    })
    this.reset()
  }
}
</script>

<style scoped>

</style>
