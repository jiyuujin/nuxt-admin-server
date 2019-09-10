<template>
    <div>
        <main-template :is-form="isForm">
            <story-input v-model="time" />
        </main-template>
        <main-template :is-form="isForm">
            <story-select
                :options="airportOptions"
                v-model="departure"
                name="出発"
            />
        </main-template>
        <main-template :is-form="isForm">
            <story-select
                :options="airportOptions"
                v-model="arrival"
                name="到着"
            />
        </main-template>
        <main-template :is-form="isForm">
            <story-select
                :options="airlineOptions"
                v-model="airline"
                name="航空会社"
            />
        </main-template>
        <main-template :is-form="isForm">
            <story-select
                :options="boardingTypeOptions"
                v-model="boardingType"
                name="搭乗機材"
            />
        </main-template>
        <main-template :is-form="isForm">
          <story-input
              v-model="registration"
              placeholder="レジ"
          />
        </main-template>
        <main-template :is-form="isForm">
            <story-button
                text="フライトを追加"
                @handleClick="postFlight"
            />
        </main-template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import { AIRPORT_LIST, AIRLINE_LIST, BOARDING_TYPE_LIST } from '~/utils/flight'
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
    isForm: boolean = true;

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
