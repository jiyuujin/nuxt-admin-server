<template>
    <div>
        <main-template :is-form="isForm">
            <j-input
                placeholder="搭乗時間"
                input-type="text"
                @handleInput="applyTime"
            ></j-input>
        </main-template>
        <main-template :is-form="isForm">
            <j-select
                :options="airportOptions"
                :multiple="Boolean(false)"
                :selected-values="form.departure"
                @handleSelect="applyDeparture"
            ></j-select>
        </main-template>
        <main-template :is-form="isForm">
            <j-select
                :options="airportOptions"
                :multiple="Boolean(false)"
                :selected-values="form.arrival"
                @handleSelect="applyArrival"
            ></j-select>
        </main-template>
        <main-template :is-form="isForm">
            <j-select
                :options="airlineOptions"
                :multiple="Boolean(false)"
                :selected-values="form.airline"
                @handleSelect="applyAirline"
            ></j-select>
        </main-template>
        <main-template :is-form="isForm">
            <j-select
                :options="boardingTypeOptions"
                :multiple="Boolean(false)"
                :selected-values="form.boardingType"
                @handleSelect="applyBoardingType"
            ></j-select>
        </main-template>
        <main-template :is-form="isForm">
            <j-input
                placeholder="レジ"
                input-type="text"
                @handleInput="applyRegistration"
            ></j-input>
        </main-template>
        <main-template :is-form="isForm">
            <j-button
                text="Flightを追加"
                variant-style="text"
                @handleClick="postFlight"
            ></j-button>
        </main-template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { addFlight } from '~/services/flightService'
import { AIRPORT_LIST, AIRLINE_LIST, BOARDING_TYPE_LIST } from '~/utils/flight'

const MainTemplate = () => import('~/components/layout/MainTemplate.vue')

export default Vue.extend({
    components: {
        MainTemplate
    },
    data() {
        return {
            form: {
                time: '' as string,
                departure: 0 as number,
                arrival: 0 as number,
                airline: 0 as number,
                boardingType: 0 as number,
                registration: '' as string
            },
            isForm: true as boolean
        }
    },
    computed: {
        airportOptions() {
            return AIRPORT_LIST
        },
        airlineOptions() {
            return AIRLINE_LIST
        },
        boardingTypeOptions() {
            return BOARDING_TYPE_LIST
        },
    },
    methods: {
        applyTime(value) {
            this.form.time = value
        },
        applyDeparture(value) {
            this.form.departure = value
        },
        applyArrival(value) {
            this.form.arrival = value
        },
        applyAirline(value) {
            this.form.airline = value
        },
        applyBoardingType(value) {
            this.form.boardingType = value
        },
        applyRegistration(value) {
            this.form.registration = value
        },
        reset () {
            this.form.time =''
            this.form.departure = 0
            this.form.arrival = 0
            this.form.airline = 0
            this.form.boardingType = 0
            this.form.registration = ''
        },
        async postFlight () {
            await addFlight(this.form)
            this.reset()
        }
    }
})
</script>
