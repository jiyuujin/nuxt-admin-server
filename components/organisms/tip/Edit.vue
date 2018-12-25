<template>
  <dialog
    v-if="events && dialog"
  >
    <div>
      <FormTemplate>
        <InputForm
          :data="editedForm.title"
          column="タイトル"
          @form-data="applyTitle"
        />
      </FormTemplate>
      <FormTemplate>
        <InputForm
          :data="editedForm.url"
          column="URL"
          @form-data="appluUrl"
        />
      </FormTemplate>
      <FormTemplate>
        <InputForm
          :data="editedForm.description"
          column="タイトル"
          @form-data="applyDescription"
        />
      </FormTemplate>
      <FormTemplate>
        <MultipleSelectForm
          :option="categories"
          :data="editedForm.tags"
          column="タグ"
          @form-data="applyTags"
        />
      </FormTemplate>
      <FormTemplate>
        <SingleSelectForm
          :option="events.item"
          :number="editedForm.event"
          column="イベント"
          @form-data="applyEvent"
        />
      </FormTemplate>
      <FormTemplate>
        <Button
          action-name="削除する"
          @click="close"
        />
        <Button
          action-name="保存する"
          @click="save"
        />
      </FormTemplate>
    </div>
  </dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import FormTemplate from '~/components/templates/FormTemplate'
import Button from '~/components/atoms/Button'
import InputForm from '~/components/atoms/InputForm'
import SingleSelectForm from '~/components/atoms/SingleSelectForm'
import MultipleSelectForm from '~/components/atoms/MultipleSelectForm'
import { CATEGORIES } from '~/utils/categories'
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
    Button,
    InputForm,
    SingleSelectForm,
    MultipleSelectForm
  },
  computed: {
    categories () {
      return CATEGORIES.map((category) => {return category.name})
    },
    ...mapGetters(['events']),
    ...mapState(['dialog'])
  },
  async created () {
    await this.$store.dispatch('initEvents')
  },
  methods: {
    applyTitle (value) {
      this.editedForm.title = value
    },
    applyDescription (value) {
      this.editedForm.description = value
    },
    appluUrl (value) {
      this.editedForm.url = value
    },
    applyTags (value) {
      this.editedForm.tags = value
    },
    applyEvent (value) {
      this.editedForm.event = value
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
