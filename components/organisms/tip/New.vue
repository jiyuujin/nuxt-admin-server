<template>
  <v-card-text>
    <InputForm
      :data="form.title"
      column="タイトル"
      @form-data="applyTitle"
    />
    <InputForm
      :data="form.url"
      column="URL"
      @form-data="applyUrl"
    />
    <InputForm
      :data="form.description"
      column="詳細"
      @form-data="applyDescription"
    />
    <MultipleSelectForm
      :option="categories"
      :data="form.tags"
      column="タグ"
      @form-data="applyTags"
    />
    <SingleSelectForm
      :option="events"
      :number="form.event"
      column="イベント"
      @form-data="applyEvent"
    />
    <v-btn @click="postTip">
      Tipを追加
    </v-btn>
  </v-card-text>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import InputForm from '../../atoms/InputForm'
import SingleSelectForm from '../../atoms/SingleSelectForm'
import MultipleSelectForm from '../../atoms/MultipleSelectForm'
import { CATEGORIES } from '~/utils/categories'
import { EVENT_LIST } from '../../../utils/events'
import Validation from '~/utils/validation'
export default {
  components: {
    InputForm,
    SingleSelectForm,
    MultipleSelectForm
  },
  data () {
    return {
      form: {
        title: '',
        url: '',
        description: '',
        tags: [],
        event: 0
      },
      errorText: '',
      events: EVENT_LIST
    }
  },
  computed: {
    categories () {
      return CATEGORIES.map(category => {return category.name})
    },
    ...mapGetters(['tips'])
  },
  methods: {
    applyTitle (value) {
      this.form.title = value
    },
    applyUrl (value) {
      this.form.url = value
    },
    applyDescription (value) {
      this.form.description = value
    },
    applyTags (value) {
      this.form.tags = value
    },
    applyEvent (value) {
      this.form.event = value
    },
    reset () {
      this.form.title = ''
      this.form.url = ''
      this.form.description = ''
      this.form.tags = []
    },
    async postTip () {
      this.errorText = ''
      if (!Validation.isValid(this.form.title) && !Validation.isValidWithArray(this.form.tags)) {
        await this.$store.dispatch('addTip', {
          title: this.form.title,
          url: this.form.url,
          description: this.form.description,
          tags: this.form.tags,
          event: this.form.event,
          time: moment().format('')
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
