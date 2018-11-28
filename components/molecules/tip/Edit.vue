<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
  >
    <v-card>
      <v-card-text>
        <InputForm
          :data="editedForm.title"
          column="タイトル"
          @form-data="applyTitle"
        />
        <InputForm
          :data="editedForm.url"
          column="URL"
          @form-data="appluUrl"
        />
        <InputForm
          :data="editedForm.description"
          column="タイトル"
          @form-data="applyDescription"
        />
        <MultipleSelectForm
          :option="categories"
          :data="editedForm.tags"
          column="タグ"
          @form-data="applyTags"
        />
        <SingleSelectNumberForm
          :option="events"
          :data="editedForm.event"
          column="イベント"
          @form-data="applyEvent"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          flat
          color="blue darken-1"
          @click.native="close"
        >
          <v-icon dark left>
            remove_circle
          </v-icon>
        </v-btn>
        <v-btn
          flat
          color="blue darken-1"
          @click.native="save"
        >
          <v-icon dark right>
            check_circle
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import InputForm from '../../atoms/InputForm'
import SingleSelectNumberForm from '../../atoms/SingleSelectNumberForm'
import MultipleSelectForm from '../../atoms/MultipleSelectForm'
import { CATEGORIES } from '~/utils/categories'
import { EVENT_LIST } from '../../../utils/events'
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
    InputForm,
    SingleSelectNumberForm,
    MultipleSelectForm
  },
  data() {
    return {
      events: EVENT_LIST
    }
  },
  computed: {
    categories () {
      return CATEGORIES.map((category) => {return category.name})
    },
    ...mapState(['dialog'])
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
