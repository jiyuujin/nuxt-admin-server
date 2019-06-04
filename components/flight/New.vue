<template>
  <div>
    <form-template>
      <story-input
        v-model="time"
      />
    </form-template>
    <form-template>
      <story-select
        :options="airportOptions"
        v-model="departure"
        name="出発"
      />
    </form-template>
    <form-template>
      <story-select
        :options="airportOptions"
        v-model="arrival"
        name="到着"
      />
    </form-template>
    <form-template>
      <story-select
        :options="airlineOptions"
        v-model="airline"
        name="航空会社"
      />
    </form-template>
    <form-template>
      <story-select
        :options="boardingTypeOptions"
        v-model="boardingType"
        name="搭乗機材"
      />
    </form-template>
    <form-template>
      <story-input
        v-model="registration"
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

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
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
    airportOptions (this: NewFlight) {
      let array: string[] = []
      AIRPORT_LIST.forEach(category => {
        array.push(category.text)
      })
      return array
    },
    airlineOptions (this: NewFlight) {
      let array: string[] = []
      AIRLINE_LIST.forEach(category => {
        array.push(category.text)
      })
      return array
    },
    boardingTypeOptions (this: NewFlight) {
      let array: string[] = []
      BOARDING_TYPE_LIST.forEach(category => {
        array.push(category.text)
      })
      return array
    },
  },
})
export default class NewFlight extends Vue {
  time: string = dayjs().format();
  departure: number = 0;
  arrival: number = 0;
  airline: number = 0;
  boardingType: number = 0;
  registration: string = '';

  reset () {
    this.time = dayjs().format()
    this.departure = 0
    this.arrival = 0
    this.airline = 0
    this.boardingType = 0
    this.registration = ''
  }

  async postFlight () {
    await this.$store.dispatch('product/addFlight', {
      time: dayjs(this.time).format(),
      departure: this.departure,
      arrival: this.arrival,
      airline: this.airline,
      boardingType: this.boardingType,
      registration: this.registration
    })
    this.reset()
  }
}
</script>

<style scoped>

</style>
