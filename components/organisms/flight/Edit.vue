<template>
  <dialog
    v-if="dialog"
  >
    <div>
      <FormTemplate>
        <SingleSelectForm
          :option="airports"
          :number="editedForm.departure"
          column="出発"
          @form-data="applyDeparture"
        />
      </FormTemplate>
      <FormTemplate>
        <SingleSelectForm
          :option="airports"
          :number="editedForm.arrival"
          column="到着"
          @form-data="applyArrival"
        />
      </FormTemplate>
      <FormTemplate>
        <SingleSelectForm
          :option="airlines"
          :number="editedForm.airline"
          column="航空会社"
          @form-data="applyAirline"
        />
      </FormTemplate>
      <FormTemplate>
        <SingleSelectForm
          :option="boardingTypes"
          :number="editedForm.boardingType"
          column="搭乗機材"
          @form-data="applyBoardingType"
        />
      </FormTemplate>
      <FormTemplate>
        <InputForm
          :data="editedForm.registration"
          column="レジ"
          @form-data="applyRegistration"
        />
      </FormTemplate>
      <FormTemplate>
        <Button
          action-name="Close"
          @click="close"
        />
        <Button
          action-name="Save"
          @click="save"
        />
      </FormTemplate>
    </div>
  </dialog>
</template>

<script>
import { mapState } from 'vuex'
import FormTemplate from '~/components/templates/FormTemplate'
import Button from '~/components/atoms/Button'
import InputForm from '~/components/atoms/InputForm'
import SingleSelectForm from '~/components/atoms/SingleSelectForm'
import { AIRPORT_LIST } from '~/utils/airports'
import { AIRLINE_LIST } from '~/utils/airlines'
import { BOARDING_TYPE_LIST } from '~/utils/boardingTypes'
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
    SingleSelectForm
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
    applyDeparture (value) {
      this.editedForm.departure = value
    },
    applyArrival (value) {
      this.editedForm.arrival = value
    },
    applyAirline (value) {
      this.editedForm.airline = value
    },
    applyBoardingType (value) {
      this.editedForm.boardingType = value
    },
    applyRegistration (value) {
      this.editedForm.registration = value
    },
    async close () {
      await this.$store.dispatch('removeDialog')
    },
    async save () {
      await this.$store.dispatch('updateFlight', {
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
