<template>
  <div
    v-if="events"
  >
    <FormTemplate>
      <InputForm
        :data="form.title"
        column="タイトル"
        @form-data="applyTitle"
      />
    </FormTemplate>
    <FormTemplate>
      <InputForm
        :data="form.url"
        column="URL"
        @form-data="applyUrl"
      />
    </FormTemplate>
    <FormTemplate>
      <InputForm
        :data="form.description"
        column="詳細"
        @form-data="applyDescription"
      />
    </FormTemplate>
    <FormTemplate>
      <MultipleSelectForm
        :option="categories"
        :data="form.tags"
        column="タグ"
        @form-data="applyTags"
      />
    </FormTemplate>
    <FormTemplate>
      <SingleSelectForm
        :option="events.item"
        :number="form.event"
        column="イベント"
        @form-data="applyEvent"
      />
    </FormTemplate>
    <FormTemplate>
      <Button
        action-name="Tipを追加"
        @click="postTip"
      />
    </FormTemplate>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import FormTemplate from '~/components/templates/FormTemplate'
import Button from '~/components/atoms/Button'
import InputForm from '~/components/atoms/InputForm'
import SingleSelectForm from '~/components/atoms/SingleSelectForm'
import MultipleSelectForm from '~/components/atoms/MultipleSelectForm'
import { CATEGORIES } from '~/utils/index'
export default {
  components: {
    FormTemplate,
    Button,
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
      return CATEGORIES
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
