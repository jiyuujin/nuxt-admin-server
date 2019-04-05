<template>
  <div>
    <form-template>
      <story-input
        v-model="form.name"
        placeholder="名前"
      />
    </form-template>
    <form-template>
      <story-input
        v-model="form.url"
        placeholder="URL"
      />
    </form-template>
    <form-template>
      <story-select
        :options="localeOptions"
        v-model="form.locale"
      />
    </form-template>
    <form-template>
      <story-button
        text="Eventを追加"
        @click="postEvent"
      />
    </form-template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FormTemplate from '~/components/templates/FormTemplate'
import { LOCALES } from '~/utils/index'

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
      locales: LOCALES,
      form: {
        name: '',
        url: '',
        locale: 0
      }
    }
  },
  computed: {
    localeOptions () {
      let array = []
      LOCALES.forEach(category => {
        array.push(category.text)
      })
      return array
    },
    ...mapGetters(['events'])
  },
  methods: {
    reset () {
      this.form.name = ''
      this.form.url = ''
      this.form.locale = 0
    },
    async postEvent () {
      await this.$store.dispatch('addEvent', {
        name: this.form.name,
        url: this.form.url,
        locale: this.form.locale
      })
      this.reset()
    }
  }
}
</script>

<style scoped>

</style>
