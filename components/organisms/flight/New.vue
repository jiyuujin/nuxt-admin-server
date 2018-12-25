<template>
  <div>
    <FormTemplate>
      <DateTimeForm
        :data="form.time"
        @form-data="applyDateTime"
      />
    </FormTemplate>
    <FormTemplate>
      <SingleSelectForm
        :option="airports"
        :number="form.departure"
        column="出発"
        @form-data="applyDeparture"
      />
    </FormTemplate>
    <FormTemplate>
      <SingleSelectForm
        :option="airports"
        :number="form.arrival"
        column="到着"
        @form-data="applyArrival"
      />
    </FormTemplate>
    <FormTemplate>
      <SingleSelectForm
        :option="airlines"
        :number="form.airline"
        column="航空会社"
        @form-data="applyAirline"
      />
    </FormTemplate>
    <FormTemplate>
      <SingleSelectForm
        :option="boardingTypes"
        :number="form.boardingType"
        column="搭乗機材"
        @form-data="applyBoardingType"
      />
    </FormTemplate>
    <FormTemplate>
      <InputForm
        :data="form.registration"
        column="レジ"
        @form-data="applyRegistration"
      />
    </FormTemplate>
    <FormTemplate>
      <Button
        action-name="フライトを追加"
        @click="postFlight"
      />
    </FormTemplate>
  </div>
</template>

<script>
import moment from 'moment'
import FormTemplate from '~/components/templates/FormTemplate'
import Button from '~/components/atoms/Button'
import InputForm from '~/components/atoms/InputForm'
import SingleSelectForm from '~/components/atoms/SingleSelectForm'
import DateTimeForm from '~/components/atoms/DateTimeForm'
import { AIRPORT_LIST } from '~/utils/airports'
import { AIRLINE_LIST } from '~/utils/airlines'
import { BOARDING_TYPE_LIST } from '~/utils/boardingTypes'
export default {
  components: {
    FormTemplate,
    Button,
    InputForm,
    SingleSelectForm,
    DateTimeForm
  },
  data () {
    return {
      form: {
        time: moment(),
        departure: 0,
        arrival: 0,
        airline: 0,
        boardingType: 0,
        registration: ''
      },
      airports: AIRPORT_LIST,
      airlines: AIRLINE_LIST,
      boardingTypes: BOARDING_TYPE_LIST
    }
  },
  methods: {
    applyDateTime (value) {
      this.form.time = value
    },
    applyDeparture (value) {
      this.form.departure = value
    },
    applyArrival (value) {
      this.form.arrival = value
    },
    applyAirline (value) {
      this.form.airline = value
    },
    applyBoardingType (value) {
      this.form.boardingType = value
    },
    applyRegistration (value) {
      this.form.registration = value
    },
    reset () {
      this.form.departure = 0
      this.form.arrival = 0
      this.form.airline = 0
      this.form.boardingType = 0
      this.form.registration = ''
    },
    async postFlight () {
      await this.$store.dispatch('addFlight', {
        time: moment(this.form.time).format(),
        departure: this.form.departure,
        arrival: this.form.arrival,
        airline: this.form.airline,
        boardingType: this.form.boardingType,
        registration: this.form.registration
      })
      this.reset()
    }
  }
}
</script>

<style scoped>

</style>
