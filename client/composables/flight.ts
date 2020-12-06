import { SetupContext, reactive } from '@vue/composition-api'
import dayjs from 'dayjs'

import { addFlight } from '~/services/flightService'
import { ItemDataList } from '~/types/database'
import {
  AIRLINE_LIST,
  AIRPORT_LIST,
  BOARDING_TYPE_LIST,
  getAirlineName,
  getAirportName,
  getBoardingTypeName
} from '~/utils/flight'
import { getTimeFormat } from '~/utils/date'

export default (props: {}, ctx: SetupContext) => {
  const datePicker = reactive({
    showDropdown: true as boolean,
    autoApply: false as boolean,
    linkedCalendars: true as boolean,
    requestDate: dayjs().format('YYYY/MM/DD') as string
  })

  const state = reactive({
    activePage: 1 as number,
    flights: {} as ItemDataList,
    chartData: [] as any,
    localeChartData: [] as any,
    airlineChartData: [] as any,
    boardingTypeChartData: [] as any,
    chartOptions: {
      bars: 'horizontal'
    },
    form: {
      time: '' as string,
      departure: 0 as number,
      arrival: 0 as number,
      airline: 0 as number,
      boardingType: 0 as number,
      registration: '' as string
    }
  })

  const departureText = (value: number) => {
    return getAirportName(value)
  }

  const arrivalText = (value: number) => {
    return getAirportName(value)
  }

  const airlineText = (value: number) => {
    return getAirlineName(value)
  }

  const descriptionText = (item: any) => {
    return `${item.data.registration} (${getBoardingTypeName(
      item.data.boardingType
    )})`
  }

  const applyPage = (value: number) => {
    state.activePage = value
  }

  const timeFormat = (t) => {
    return getTimeFormat(t)
  }

  const applyDeparture = (value) => {
    state.form.departure = value
  }

  const applyArrival = (value) => {
    state.form.arrival = value
  }

  const applyAirline = (value) => {
    state.form.airline = value
  }

  const applyBoardingType = (value) => {
    state.form.boardingType = value
  }

  const applyRegistration = (value) => {
    state.form.registration = value
  }

  const updateValues = (value: string): void => {
    datePicker.requestDate = value
    state.form.time = dayjs(value).format()
  }

  const checkOpen = (open: any): void => {
    // console.log('event: ' + open)
  }

  const reset = () => {
    state.form.time = dayjs().format('YYYY/MM/DD')
    state.form.departure = 0
    state.form.arrival = 0
    state.form.airline = 0
    state.form.boardingType = 0
    state.form.registration = ''
  }

  const cancel = () => {
    reset()
  }

  const postFlight = async () => {
    await addFlight(state.form)
    reset()
  }

  return {
    datePicker,
    state,
    airportOptions: AIRPORT_LIST,
    airlineOptions: AIRLINE_LIST,
    boardingTypeOptions: BOARDING_TYPE_LIST,
    departureText,
    arrivalText,
    airlineText,
    descriptionText,
    timeFormat,
    applyPage,
    applyDeparture,
    applyArrival,
    applyAirline,
    applyBoardingType,
    applyRegistration,
    updateValues,
    checkOpen,
    reset,
    cancel,
    postFlight
  }
}
