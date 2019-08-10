<template>
    <main-template
        v-if="flights"
        :user-status="userStatus"
    >
        <main-template :is-form="isForm">
            <story-select
                :options="yearOptions"
                v-model="selectedYaer"
                name="年"
            />
        </main-template>
        <main-template :is-form="isForm">
            <story-select
                :options="boardingTypeOptions"
                v-model="selectedBoardingType"
                name="搭乗機材"
            />
        </main-template>
        <flight-list
            :list="flights.item"
            :number="page"
        />
        <pagination
            :page="page"
            :max="Math.ceil(flights.item.length / 20)"
            @form-data="applyPage"
        />
        <new-flight />
    </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { BOARDING_TYPE_LIST, YEARS } from '../../utils'
const MainTemplate = () => import('../../components/layout/MainTemplate.vue')
const FlightList = () => import('../../components/flight/List.vue')
const NewFlight = () => import('../../components/flight/New.vue')
const Pagination = () => import('../../components/layout/Pagination.vue')
const StorySelect = () => import('../../components/atoms/Select.vue')

@Component({
    middleware: 'auth',
    components: {
        MainTemplate,
        Pagination,
        FlightList,
        NewFlight,
        StorySelect
    },
    async fetch({ store }) {
        await store.dispatch('product/fetchFlights', {
            boardingType: 0,
            year: 0
        })
    },
    computed: {
        yearOptions (this: FlightPage) {
            let array: string[] = []
            YEARS.forEach(category => {
                array.push(category.text)
            })
            return array
        },
        boardingTypeOptions (this: FlightPage) {
            let array: string[] = []
            BOARDING_TYPE_LIST.forEach(category => {
                array.push(category.text)
            })
            return array
        }
    }
})
export default class FlightPage extends Vue {
    page: number = 1;
    selectedYaer: number = 2019;
    selectedBoardingType: number = 0;
    isForm: boolean = true;

    get userStatus () {
        return this.$store.state.product.userStatus
    }

    get flights () {
        return this.$store.state.product.flights
    }

    applyPage(value) {
        this.page = value
    }
}
</script>
