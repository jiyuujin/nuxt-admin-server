<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
  >
    <v-card>
      <v-card-text>
        <SingleSelectNumberForm
          :option="airports"
          :data="editedForm.departure"
          column="出発"
          @form-data="applyDeparture"
        />
        <SingleSelectNumberForm
          :option="airports"
          :data="editedForm.arrival"
          column="到着"
          @form-data="applyArrival"
        />
        <SingleSelectNumberForm
          :option="airlines"
          :data="editedForm.airline"
          column="航空会社"
          @form-data="applyAirline"
        />
        <SingleSelectNumberForm
          :option="boardingTypes"
          :data="editedForm.boardingType"
          column="搭乗機材"
          @form-data="applyBoardingType"
        />
        <InputForm
          :data="editedForm.registration"
          column="レジ"
          @form-data="applyRegistration"
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
import { AIRPORT_LIST } from '../../../utils/airports'
import { AIRLINE_LIST } from '../../../utils/airlines'
import { BOARDING_TYPE_LIST } from '../../../utils/boardingTypes'
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
    SingleSelectNumberForm
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
