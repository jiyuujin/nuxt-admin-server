<template>
    <div>
        <h3>Flight <span>({{ list.length }} レグ搭乗中)</span></h3>
        <chart :chart-data="datasets(list)" />
        <div class="flights">
            <div v-for="item in list" :key="item.id">
                <div v-if="item.page === number" class="flight-card">
                    <div class="flight-card-text">
                        <div class="title">
                            {{ `${departure(item.data.departure)} > ${arrival(item.data.arrival)}` }}
                        </div>
                        <div class="route">
                            {{ item.data.registration }}({{ boardingType(item.data.boardingType) }})
                        </div>
                    </div>
                    <div class="flight-card-time">
                        {{ timeFormat(item.data.time) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { FlightForm } from '~/types/database.types'
import { getTimeFormat } from '~/utils'
import { getAirportName, getAirlineName, getBoardingTypeName, filledChartData } from '~/utils/flight'
const Chart = () => import('./Chart.vue')

@Component({
    components: {
        Chart
    }
})
export default class FlightList extends Vue {
    @Prop() list: FlightForm[];
    @Prop() number: number;

    timeFormat(t) {
        return getTimeFormat(t)
    }

    airline(id) {
        return getAirlineName(id)
    }

    departure(id) {
        return getAirportName(id)
    }

    arrival(id) {
        return getAirportName(id)
    }

    boardingType(id) {
        return getBoardingTypeName(id)
    }

    datasets(allData: any) {
        return filledChartData(allData)
    }
}
</script>

<style scoped>
.flights {
    display: flex;
    flex-wrap: wrap;
}

.flight-card {
    margin: 30px auto;
    width: 240px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px #ccc;
}

.flight-card-text {
    padding: 20px;
}

.flight-card-text .title {
    font-size: 20px;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
    overflow: hidden;
    height: 5.4em;
    line-height: 1.8;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    vertical-align: center;
    -webkit-justify-content: center;
    justify-content: center;
}

.flight-card-text .route {
    color: #777;
    font-size: 14px;
    line-height: 1.5;
}

.flight-card-time {
    text-align: center;
    border-top: 1px solid #eee;
    padding: 20px;
}
</style>
