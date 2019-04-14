<template>
  <div>
    <form-template>
      <flat-pickr
        v-model="form.time"
        :config="config"
        name="搭乗日"
        placeholder="搭乗日"
      />
    </form-template>
    <form-template>
      <story-select
        :options="airportOptions"
        v-model="form.departure"
        name="出発"
      />
    </form-template>
    <form-template>
      <story-select
        :options="airportOptions"
        v-model="form.arrival"
        name="到着"
      />
    </form-template>
    <form-template>
      <story-select
        :options="airlineOptions"
        v-model="form.airline"
        name="航空会社"
      />
    </form-template>
    <form-template>
      <story-select
        :options="boardingTypeOptions"
        v-model="form.boardingType"
        name="搭乗機材"
      />
    </form-template>
    <form-template>
      <story-input
        v-model="form.registration"
        placeholder="レジ"
      />
    </form-template>
    <form-template>
      <story-button
        text="フライトを追加"
        @click="postFlight"
      />
    </form-template>
  </div>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component'
import { Japanese } from 'flatpickr/dist/l10n/ja'
import 'flatpickr/dist/flatpickr.css'
import moment from 'moment'
import FormTemplate from '~/components/templates/FormTemplate'
import { AIRPORT_LIST, AIRLINE_LIST, BOARDING_TYPE_LIST } from '~/utils/index'

import StoryInput from '~/components/atoms/Input'
import StorySelect from '~/components/atoms/Select'
import StoryButton from '~/components/atoms/Button'

export default {
  components: {
    FlatPickr,
    FormTemplate,
    StoryInput,
    StorySelect,
    StoryButton
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
      config: {
        locale: Japanese,
        static: true,
        altInput: true,
        altFormat: 'n/j(D)',
        minDate: moment().subtract(2, 'years').format('YYYY-MM-DD'),
        maxDate: 'today'
      },
      airports: AIRPORT_LIST,
      airlines: AIRLINE_LIST,
      boardingTypes: BOARDING_TYPE_LIST
    }
  },
  computed: {
    'form.time': {
      get () {
        return this.form.time || null
      },
      set (value) {
        // console.log(value)
      }
    },
    airportOptions () {
      let array = []
      AIRPORT_LIST.forEach(category => {
        array.push(category.text)
      })
      return array
    },
    airlineOptions () {
      let array = []
      AIRLINE_LIST.forEach(category => {
        array.push(category.text)
      })
      return array
    },
    boardingTypeOptions () {
      let array = []
      BOARDING_TYPE_LIST.forEach(category => {
        array.push(category.text)
      })
      return array
    },
  },
  methods: {
    reset () {
      this.form.departure = 0
      this.form.arrival = 0
      this.form.airline = 0
      this.form.boardingType = 0
      this.form.registration = ''
    },
    async postFlight () {
      await this.$store.dispatch('product/addFlight', {
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
