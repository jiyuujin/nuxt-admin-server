<template>
  <dialog
    v-if="dialog"
  >
    <div>
      <form-template>
        <story-select
          :options="airports"
          v-model="editedForm.departure"
        />
      </form-template>
      <form-template>
        <story-select
          :option="airports"
          v-model="editedForm.arrival"
        />
      </form-template>
      <form-template>
        <story-select
          :options="airlines"
          v-model="editedForm.airline"
        />
      </form-template>
      <form-template>
        <story-select
          :options="boardingTypes"
          v-model="editedForm.boardingType"
        />
      </form-template>
      <form-template>
        <story-input
          v-model="editedForm.registration"
          placeholder="レジ"
        />
      </form-template>
      <form-template>
        <story-button
          text="Close"
          @click="close"
        />
        <story-button
          text="Save"
          @click="save"
        />
      </form-template>
    </div>
  </dialog>
</template>

<script>
import { mapState } from 'vuex'
import FormTemplate from '~/components/templates/FormTemplate'
import { AIRPORT_LIST, AIRLINE_LIST, BOARDING_TYPE_LIST } from '~/utils/index'

import StoryInput from '~/components/atoms/Input'
import StorySelect from '~/components/atoms/Select'
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
    StoryButton
  },
  data() {
    return {
      airports: AIRPORT_LIST,
      airlines: AIRLINE_LIST,
      boardingTypes: BOARDING_TYPE_LIST
    }
  },
  computed: {
    ...mapState(['dialog'])
  },
  methods: {
    async close () {
      await this.$store.dispatch('product/removeDialog')
    },
    async save () {
      await this.$store.dispatch('product/updateFlight', {
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
