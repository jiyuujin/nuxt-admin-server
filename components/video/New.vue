<template>
  <div
    v-if="events"
  >
    <form-template>
      <story-input
        v-model="form.title"
        placeholder="タイトル"
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
      <story-input
        v-model="form.videoPath"
        placeholder="URL"
      />
    </form-template>
    <form-template>
      <story-button
        text="Videoを追加"
        @click="postVideo"
      />
    </form-template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FormTemplate from '~/components/templates/FormTemplate'

import StoryInput from '~/components/atoms/Input'
import StorySelect from '~/components/atoms/Select'
import StoryButton from '~/components/atoms/Button'

export default {
  components: {
    FormTemplate,
    StoryInput,
    StorySelect,
    StoryButton
  },
  data () {
    return {
      form: {
        title: '',
        videoPath: '',
        event: 0
      }
    }
  },
  computed: {
    eventOptions() {
      let array = []
      this.$store.getters.events.item.forEach((item) => {
        array.push(item.text)
      })
      return array
    },
    ...mapGetters(['events'])
  },
  async created () {
    await this.$store.dispatch('initEvents')
  },
  methods: {
    reset () {
      this.form.title = ''
      this.form.event = 0
      this.form.videoPath = ''
    },
    async postVideo () {
      await this.$store.dispatch('addVideo', {
        title: this.form.title,
        event: this.form.event,
        videoPath: this.form.videoPath
      })
      this.reset()
    }
  }
}
</script>

<style scoped>

</style>
