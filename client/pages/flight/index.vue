<template>
    <main-template v-if="flights" :user-status="userStatus">
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
import { fetchFlights } from '~/services/flightService'

const MainTemplate = () => import('~/components/layout/MainTemplate.vue')
const FlightList = () => import('~/components/flight/List.vue')
const NewFlight = () => import('~/components/flight/New.vue')
const Pagination = () => import('~/components/layout/Pagination.vue')

@Component({
    middleware: 'auth',
    components: {
        MainTemplate,
        Pagination,
        FlightList,
        NewFlight
    },
    async mounted() {
        (this as any).flights = await fetchFlights()
    }
})
export default class FlightPage extends Vue {
    page: number = 1
    flights = null

    get userStatus () {
        return this.$store.state.product.userStatus
    }

    applyPage(value) {
        this.page = value
    }
}
</script>
