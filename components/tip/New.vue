<template>
  <div v-if="events">
    <form-template>
      <story-input
        v-model="form.title"
        placeholder="タイトル"
      />
    </form-template>
    <form-template>
      <story-input
        v-model="form.url"
        placeholder="URL"
      />
    </form-template>
    <form-template>
      <story-textarea
        v-model="form.description"
        placeholder="詳細"
      />
    </form-template>
    <form-template>
      <story-select
        :options="categoryOptions"
        :multiple="Boolean(true)"
        v-model="form.tags"
        name="タグ"
      />
    </form-template>
    <form-template>
      <story-select
        :options="eventOptions"
        v-model="form.event"
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

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import FormTemplate from '~/components/templates/FormTemplate'
import { CATEGORIES } from '~/utils/index'

import StoryInput from '~/components/atoms/Input'
import StorySelect from '~/components/atoms/Select'
import StoryTextarea from '~/components/atoms/Textarea'
import StoryButton from '~/components/atoms/Button'

export default {
  components: {
    FormTemplate,
    StoryInput,
    StorySelect,
    StoryTextarea,
    StoryButton
  },
  data () {
    return {
      form: {
        title: '',
        url: '',
        description: '',
        tags: [],
        event: 0
      }
    }
  },
  computed: {
    categoryOptions() {
      let array = []
      CATEGORIES.forEach((item) => {
        array.push(item.text)
      })
      return array
    },
    eventOptions() {
      let array = []
      this.$store.state.product.events.item.forEach((item) => {
        array.push(item.text)
      })
      return array
    },
    ...mapState({
      events: state => state.product.events
    })
  },
  async created () {
    await this.$store.dispatch('product/initEvents')
  },
  methods: {
    applyTags (value) {
      this.form.tags = value
    },
    reset () {
      this.form.title = ''
      this.form.url = ''
      this.form.description = ''
      this.form.tags = []
      this.form.event = 0
    },
    async postTip () {
      await this.$store.dispatch('product/addTip', {
        title: this.form.title,
        url: this.form.url,
        description: this.form.description,
        tags: this.form.tags,
        event: this.form.event,
        time: moment().format('')
      })
      this.reset()
    }
  }
}
</script>

<style scoped>

</style>
