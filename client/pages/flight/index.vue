<template>
    <main-template v-if="flights" :user-status="userStatus">
        <j-modal
            title="Flightを追加"
            :handle-cancel-click-callback="cancel"
            :handle-submit-click-callback="submit"
        >
            <div style="width: 100%;">
                <j-form title="搭乗時間">
                    <j-range-picker
                        ref="single-picker"
                        :single-date-picker="singleDatePicker"
                        :show-dropdown="showDropdown"
                        :auto-apply="autoApply"
                        :linked-calendars="linkedCalendars"
                        :date-range="dateRange"
                        :ranges="null"
                        opens="right"
                        :date-format="dateFormat"
                        transition-type="slide-fade"
                        @update="updateValues"
                        @toggle="checkOpen"
                    >
                        <div slot="input" slot-scope="picker" style="min-width: 350px;">
                            {{ picker.startDate }}
                        </div>
                    </j-range-picker>
                </j-form>
                <j-form title="出発／到着">
                    <j-select
                        :options="airportOptions"
                        :selected-values="form.departure"
                        @handleSelect="applyDeparture"
                    />
                    <j-select
                        :options="airportOptions"
                        :selected-values="form.arrival"
                        @handleSelect="applyArrival"
                    />
                </j-form>
                <j-form title="航空会社">
                    <j-select
                        :options="airlineOptions"
                        :selected-values="form.airline"
                        @handleSelect="applyAirline"
                    />
                </j-form>
                <j-form title="搭乗機材／レジ">
                    <j-select
                        :options="boardingTypeOptions"
                        :selected-values="form.boardingType"
                        @handleSelect="applyBoardingType"
                    />
                    <j-input @handleInput="applyRegistration" />
                </j-form>
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
import dayjs from 'dayjs'
import { fetchFlights, addFlight } from '~/services/flightService'
import { AIRLINE_LIST, AIRPORT_LIST, BOARDING_TYPE_LIST } from '~/utils/flight'
import { DateRange } from '~/types/utils'

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
        dateRange: {
            get(): DateRange {
                return (this as any).requestDate
            },
            set(values: DateRange): void {
                (this as any).requestDate = { ...values }
            }
        },
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
    singleDatePicker: boolean = true
    showDropdown: boolean = true
    autoApply: boolean = false
    linkedCalendars: boolean = true
    requestDate: DateRange = {
        startDate: dayjs().format('YYYY/MM/DD')
    }
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

    updateValues(value: DateRange): void {
        this.requestDate = value
        this.form.time = dayjs(value.startDate).format()
    }

    checkOpen(open: any): void {
        // console.log('event: ' + open)
    }

    dateFormat(classes: any, date: Date) {
        return classes
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
