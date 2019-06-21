<template>
  <div v-if="events">
    <form-template>
      <story-input
        v-model="name"
        placeholder="イベント名"
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
      <story-input
        v-model="location"
        placeholder="場所"
      />
    </form-template>
    <form-template>
      <story-select
        :options="localeOptions"
        v-model="locale"
      />
    </form-template>
    <form-template>
      <story-input
        v-model="participants"
        placeholder="参加者数"
      />
    </form-template>
    <form-template>
      <story-input
        v-model="max_participants"
        placeholder="最大参加者数"
      />
    </form-template>
    <form-template>
      <story-input
        v-model="lt"
        placeholder="登壇・LT数"
      />
    </form-template>
    <form-template>
      <story-button
        text="Hostを追加"
        @click="postHost"
      />
    </form-template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CATEGORIES, LOCALES } from '~/utils'
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
