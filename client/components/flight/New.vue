<template>
    <div>
        <main-template :is-form="isForm">
            <j-input
                placeholder="搭乗時間"
                input-type="text"
                width="80%"
                @handleInput="applyTime"
            ></j-input>
        </main-template>
        <main-template :is-form="isForm">
            <j-select
                :options="airportOptions"
                :multiple="Boolean(false)"
                :selected-values="departure"
                width="80%"
                @handleSelect="applyDeparture"
            ></j-select>
        </main-template>
        <main-template :is-form="isForm">
            <j-select
                :options="airportOptions"
                :multiple="Boolean(false)"
                :selected-values="arrival"
                width="80%"
                @handleSelect="applyArrival"
            ></j-select>
        </main-template>
        <main-template :is-form="isForm">
            <j-select
                :options="airlineOptions"
                :multiple="Boolean(false)"
                :selected-values="airline"
                width="80%"
                @handleSelect="applyAirline"
            ></j-select>
        </main-template>
        <main-template :is-form="isForm">
            <j-select
                :options="boardingTypeOptions"
                :multiple="Boolean(false)"
                :selected-values="boardingType"
                width="80%"
                @handleSelect="applyBoardingType"
            ></j-select>
        </main-template>
        <main-template :is-form="isForm">
            <j-input
                placeholder="レジ"
                input-type="text"
                width="80%"
                @handleInput="applyRegistration"
            ></j-input>
        </main-template>
        <main-template :is-form="isForm">
            <j-button
                text="フライトを追加"
                width="128px"
                variant-style="text"
                @handleClick="postFlight"
            ></j-button>
        </main-template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import { AIRPORT_LIST, AIRLINE_LIST, BOARDING_TYPE_LIST } from '~/utils/flight'
const MainTemplate = () => import('~/components/layout/MainTemplate.vue')

@Component({
    components: {
        MainTemplate
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

    applyTime(value) {
        this.time = value
    }

    applyDeparture(value) {
        this.departure = value
    }

    applyArrival(value) {
        this.arrival = value
    }

    applyAirline(value) {
        this.airline = value
    }

    applyBoardingType(value) {
        this.boardingType = value
    }

    applyRegistration(value) {
        this.registration = value
    }

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
