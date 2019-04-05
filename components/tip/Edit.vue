<template>
  <dialog
    v-if="events && dialog"
  >
    <div>
      <form-template>
        <story-input
          v-model="editedForm.title"
          placeholder="タイトル"
        />
      </form-template>
      <form-template>
        <story-input
          v-model="editedForm.url"
          placeholder="URL"
        />
      </form-template>
      <form-template>
        <story-input
          v-model="editedForm.description"
          placeholder="タイトル"
        />
      </form-template>
      <form-template>
        <story-select
          :options="categoryOptions"
          :multiple="Boolean(true)"
          v-model="editedForm.tags"
          name="タグ"
          @form-data="applyTags"
        />
      </form-template>
      <form-template>
        <story-select
          :options="eventOptions"
          v-model="editedForm.event"
          name="イベント"
        />
      </form-template>
      <form-template>
        <story-button
          text="削除する"
          @click="close"
        />
        <story-button
          text="保存する"
          @click="save"
        />
      </form-template>
    </div>
  </dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import FormTemplate from '~/components/templates/FormTemplate'
import { CATEGORIES } from '~/utils/index'

import StoryInput from '~/components/atoms/Input'
import StorySelect from '~/components/atoms/Select'
import StoryTextarea from '~/components/atoms/Textarea'
import StoryButton from '~/components/atoms/Button'

export default {
  props: {
    editedForm: {
      type: Object,
      required: true
    },
    dataKey: {
      type: String,
      reuired: true
    }
  },
  components: {
    FormTemplate,
    StoryInput,
    StorySelect,
    StoryTextarea,
    StoryButton
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
      this.$store.getters.events.item.forEach((item) => {
        array.push(item.text)
      })
      return array
    },
    ...mapGetters(['events']),
    ...mapState(['dialog'])
  },
  async created () {
    await this.$store.dispatch('initEvents')
  },
  methods: {
    applyTags (value) {
      this.editedForm.tags = value
    },
    async close () {
      await this.$store.dispatch('removeDialog')
    },
    async save () {
      await this.$store.dispatch('updateTip', {
        'key': this.dataKey,
        'data': this.editedForm
      })
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
