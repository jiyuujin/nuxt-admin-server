<template>
  <v-card-text
    v-if="events"
  >
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
      :option="events.item"
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
import InputForm from '~/components/atoms/InputForm'
import SingleSelectForm from '~/components/atoms/SingleSelectForm'
import MultipleSelectForm from '~/components/atoms/MultipleSelectForm'
import { CATEGORIES } from '~/utils/categories'
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
      }
    }
  },
  computed: {
    categories () {
      return CATEGORIES.map(category => {return category.name})
    },
    ...mapGetters(['events'])
  },
  async created () {
    await this.$store.dispatch('initEvents')
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
      this.form.event = 0
    },
    async postTip () {
      await this.$store.dispatch('addTip', {
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
