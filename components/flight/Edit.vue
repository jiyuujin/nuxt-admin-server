<template>
  <dialog v-if="dialog">
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

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import { AIRPORT_LIST, AIRLINE_LIST, BOARDING_TYPE_LIST } from '~/utils/index'
const FormTemplate = () => import('~/components/templates/FormTemplate.vue')
const StoryInput = () => import('~/components/atoms/Input.vue')
const StorySelect = () => import('~/components/atoms/Select.vue')
const StoryButton = () => import('~/components/atoms/Button.vue')

@Component({
  components: {
    FormTemplate,
    StoryInput,
    StorySelect,
    StoryButton
  },
  computed: {
    ...mapState({
      dialog: state => state.product.dialog
    })
  },
})
export default class FlightEdit extends Vue {
  @Prop() editedForm: object;
  @Prop() dataKey: string;
  airports = AIRPORT_LIST;
  airlines = AIRLINE_LIST;
  boardingTypes = BOARDING_TYPE_LIST;

  async close () {
    await this.$store.dispatch('product/removeDialog')
  }

  async save () {
    await this.$store.dispatch('product/updateFlight', {
      'key': this.dataKey,
      'data': this.editedForm
    })
    this.close()
  }
}
</script>

<style scoped>

</style>
