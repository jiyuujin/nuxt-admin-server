<template>
  <div>
    <form-template>
      <story-picker
        v-model="form.time"
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
import moment from 'moment'
import FormTemplate from '~/components/templates/FormTemplate'
import { AIRPORT_LIST, AIRLINE_LIST, BOARDING_TYPE_LIST } from '~/utils/index'

import StoryInput from '~/components/atoms/Input'
import StorySelect from '~/components/atoms/Select'
import StoryButton from '~/components/atoms/Button'
import StoryPicker from '~/components/atoms/Picker'

export default {
  components: {
    FormTemplate,
    StoryInput,
    StorySelect,
    StoryButton,
    StoryPicker
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
  computed: {
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
    applyDateTime (value) {
      this.form.time = value
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
