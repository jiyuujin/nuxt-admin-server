<template>
    <main-template v-if="flights" :user-status="userStatus">
        <j-modal
            title="Flightを追加"
            :handle-cancel-click-callback="cancel"
            :handle-submit-click-callback="submit"
        >
            <div style="text-align: left;">
                <j-input
                    placeholder="搭乗時間"
                    style="width: 160px; margin-right: 8px; margin-bottom: 4px;"
                    @handleInput="applyTime"
                />
                <j-select
                    :options="airportOptions"
                    :selected-values="form.departure"
                    style="width: 160px; margin-right: 8px; margin-bottom: 4px;"
                    @handleSelect="applyDeparture"
                />
                <j-select
                    :options="airportOptions"
                    :selected-values="form.arrival"
                    style="width: 160px; margin-right: 8px; margin-bottom: 4px;"
                    @handleSelect="applyArrival"
                />
                <j-select
                    :options="airlineOptions"
                    :selected-values="form.airline"
                    style="width: 160px; margin-right: 8px; margin-bottom: 4px;"
                    @handleSelect="applyAirline"
                />
                <j-select
                    :options="boardingTypeOptions"
                    :selected-values="form.boardingType"
                    style="width: 160px; margin-right: 8px; margin-bottom: 4px;"
                    @handleSelect="applyBoardingType"
                />
                <j-input
                    placeholder="レジ"
                    style="width: 160px; margin-right: 8px; margin-bottom: 4px;"
                    @handleInput="applyRegistration"
                />
            </div>
        </j-modal>

        <flight-list
            :list="flights.item"
            :number="page"
        />
        <pagination
            :page="page"
            :max="Math.ceil(flights.item.length / 20)"
            @form-data="applyPage"
        />
    </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { fetchFlights, addFlight } from '~/services/flightService'
import { AIRLINE_LIST, AIRPORT_LIST, BOARDING_TYPE_LIST } from '~/utils/flight'

const MainTemplate = () => import('~/components/layout/MainTemplate.vue')
const FlightList = () => import('~/components/flight/List.vue')
const Pagination = () => import('~/components/layout/Pagination.vue')

@Component({
    middleware: 'auth',
    components: {
        MainTemplate,
        Pagination,
        FlightList
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
        }
    },
    async mounted() {
        (this as any).flights = await fetchFlights()
    }
})
export default class FlightPage extends Vue {
    page: number = 1
    flights = null
    form = {
        time: '' as string,
        departure: 0 as number,
        arrival: 0 as number,
        airline: 0 as number,
        boardingType: 0 as number,
        registration: '' as string
    }

    get userStatus () {
        return this.$store.state.product.userStatus
    }

    applyPage(value) {
        this.page = value
    }

    applyTime(value) {
        this.form.time = value
    }

    applyDeparture(value) {
        this.form.departure = value
    }

    applyArrival(value) {
        this.form.arrival = value
    }

    applyAirline(value) {
        this.form.airline = value
    }

    applyBoardingType(value) {
        this.form.boardingType = value
    }

    applyRegistration(value) {
        this.form.registration = value
    }

    reset () {
        this.form.time =''
        this.form.departure = 0
        this.form.arrival = 0
        this.form.airline = 0
        this.form.boardingType = 0
        this.form.registration = ''
    }

    cancel() {
        this.reset()
    }

    async submit() {
        await addFlight(this.form)
        this.reset()
    }
}
</script>
