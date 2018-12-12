<template>
  <v-card-text
    v-if="events"
  >
    <InputForm
      :data="form.title"
      column="タイトル"
      @form-data="applyTitle"
    />
    <SingleSelectForm
      :option="events.item"
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
import { mapGetters } from 'vuex'
import InputForm from '~/components/atoms/InputForm'
import SingleSelectForm from '~/components/atoms/SingleSelectForm'
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
      }
    }
  },
  computed: {
    ...mapGetters(['events'])
  },
  async created () {
    await this.$store.dispatch('initEvents')
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
