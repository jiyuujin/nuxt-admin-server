<template>
  <v-card-text>
    <InputForm
      :data="form.name"
      column="名前"
      @form-data="applyName"
    />
    <InputForm
      :data="form.url"
      column="URL"
      @form-data="applyUrl"
    />
    <SingleSelectForm
      :option="locales"
      :number="form.locale"
      column="地域"
      @form-data="applyLocale"
    />
    <v-btn @click="postEvent">
      Eventを追加
    </v-btn>
  </v-card-text>
</template>

<script>
import { mapGetters } from 'vuex'
import InputForm from '~/components/atoms/InputForm'
import SingleSelectForm from '~/components/atoms/SingleSelectForm'
const LOCALES = [
  {
    value: 0,
    text: '指定無し'
  },
  {
    value: 1,
    text: '東京'
  },
  {
    value: 2,
    text: '大阪'
  },
  {
    value: 3,
    text: 'その他'
  }
]
export default {
  components: {
    InputForm,
    SingleSelectForm
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
    ...mapGetters(['events'])
  },
  methods: {
    applyName (value) {
      this.form.name = value
    },
    applyUrl (value) {
      this.form.url = value
    },
    applyLocale (value) {
      this.form.locale = value
    },
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
