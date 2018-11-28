<template>
  <v-card-text>
    <DateTimeForm
      :data="form.time"
      @form-data="applyDateTime"
    />
    <SingleSelectNumberForm
      :option="airports"
      :data="form.departure"
      column="出発"
      @form-data="applyDeparture"
    />
    <SingleSelectNumberForm
      :option="airports"
      :data="form.arrival"
      column="到着"
      @form-data="applyArrival"
    />
    <SingleSelectNumberForm
      :option="airlines"
      :data="form.airline"
      column="航空会社"
      @form-data="applyAirline"
    />
    <SingleSelectNumberForm
      :option="boardingTypes"
      :data="form.boardingType"
      column="搭乗機材"
      @form-data="applyBoardingType"
    />
    <InputForm
      :data="form.registration"
      column="レジ"
      @form-data="applyRegistration"
    />
    <v-btn @click="postFlight">
      フライトを追加
    </v-btn>
  </v-card-text>
</template>

<script>
import moment from 'moment'
import InputForm from '../../atoms/InputForm'
import SingleSelectNumberForm from '../../atoms/SingleSelectNumberForm'
import DateTimeForm from '../../atoms/DateTimeForm'
import Validation from '~/utils/validation'
import { AIRPORT_LIST } from '../../../utils/airports'
import { AIRLINE_LIST } from '../../../utils/airlines'
import { BOARDING_TYPE_LIST } from '../../../utils/boardingTypes'
export default {
  components: {
    InputForm,
    SingleSelectNumberForm,
    DateTimeForm
  },
  data () {
    return {
      form: {
        time: moment(),
        departure: -1,
        arrival: -1,
        airline: -1,
        boardingType: -1,
        registration: ''
      },
      errorText: '',
      airports: AIRPORT_LIST,
      airlines: AIRLINE_LIST,
      boardingTypes: BOARDING_TYPE_LIST,
      dateFormatted: null,
      menu: false
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
      this.form.departure = -1
      this.form.arrival = -1
      this.form.airline = -1
      this.form.boardingType = -1
      this.form.registration = ''
    },
    async postFlight () {
      this.errorText = ''
      if (!Validation.isValid(this.form.departure) && !Validation.isValid(this.form.arrival) && !Validation.isValid(this.form.airline) && !Validation.isValid(this.form.boardingType) && !Validation.isValid(this.form.registration)) {
        await this.$store.dispatch('addFlight', {
          time: moment(this.form.time).format(''),
          departure: this.form.departure,
          arrival: this.form.arrival,
          airline: this.form.airline,
          boardingType: this.form.boardingType,
          registration: this.form.registration
        })
        this.reset()
      } else {
        this.errorText = '正しく入力してください'
      }
    }
  }
}
</script>

<style scoped>

</style>
