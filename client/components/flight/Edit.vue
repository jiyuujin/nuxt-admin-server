<template>
  <dialog v-if="dialog">
    <div>
      <main-template :is-form="isForm">
        <story-select
          :options="airports"
          v-model="editedForm.departure"
        />
      </main-template>
      <main-template :is-form="isForm">
        <story-select
          :option="airports"
          v-model="editedForm.arrival"
        />
      </main-template>
      <main-template :is-form="isForm">
        <story-select
          :options="airlines"
          v-model="editedForm.airline"
        />
      </main-template>
      <main-template :is-form="isForm">
        <story-select
          :options="boardingTypes"
          v-model="editedForm.boardingType"
        />
      </main-template>
      <main-template :is-form="isForm">
        <story-input
          v-model="editedForm.registration"
          placeholder="レジ"
        />
      </main-template>
      <main-template :is-form="isForm">
        <story-button
          text="Close"
          @click="close"
        />
        <story-button
          text="Save"
          @click="save"
        />
      </main-template>
    </div>
  </dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { AIRPORT_LIST, AIRLINE_LIST, BOARDING_TYPE_LIST } from '../../utils'
import { FlightForm } from '~/types/database.types'
const MainTemplate = () => import('~/components/layout/MainTemplate.vue')
const StoryInput = () => import('~/components/atoms/Input.vue')
const StorySelect = () => import('~/components/atoms/Select.vue')
const StoryButton = () => import('~/components/atoms/Button.vue')

@Component({
  components: {
    MainTemplate,
    StoryInput,
    StorySelect,
    StoryButton
  }
})
export default class EditFlight extends Vue {
  @Prop() editedForm: FlightForm;
  @Prop() dataKey: string;
  airports = AIRPORT_LIST;
  airlines = AIRLINE_LIST;
  boardingTypes = BOARDING_TYPE_LIST;
  isForm: boolean = true;

  get dialog () {
    return this.$store.state.product.dialog
  }

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
