<template>
  <v-card-text>
    <InputForm
      :data="form.title"
      column="タイトル"
      @form-data="applyTitle"
    />
    <SingleSelectForm
      :option="events"
      :number="form.event"
      column="イベント"
      @form-data="applyEvent"
    />
    <InputForm
      :data="form.videoPath"
      column="URL"
      @form-data="applyVideoPath"
    />
    <v-btn @click="postVideo">
      Videoを追加
    </v-btn>
  </v-card-text>
</template>

<script>
import InputForm from '../../atoms/InputForm'
import SingleSelectForm from '../../atoms/SingleSelectForm'
import { EVENT_LIST } from '../../../utils/events'
import Validation from '~/utils/validation'
export default {
  components: {
    InputForm,
    SingleSelectForm
  },
  data () {
    return {
      form: {
        title: '',
        videoPath: '',
        event: 0
      },
      errorText: '',
      events: EVENT_LIST
    }
  },
  methods: {
    applyTitle (value) {
      this.form.title = value
    },
    applyVideoPath (value) {
      this.form.videoPath = value
    },
    applyEvent (value) {
      this.form.event = value
    },
    reset () {
      this.form.title = ''
      this.form.event = 0
      this.form.videoPath = ''
    },
    async postVideo () {
      this.errorText = ''
      if (!Validation.isValid(this.form.title)) {
        await this.$store.dispatch('addVideo', {
          title: this.form.title,
          event: this.form.event,
          videoPath: this.form.videoPath
        })
        this.reset()
      } else {
        this.errorText = '正しく入力してください'
      }
    }
  }
}
</script>

<style scoped>

</style>
