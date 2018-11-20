export const AIRLINE_LIST = [
  {value: 1, text: 'JAL'},
  {value: 2, text: 'ANA'},
  {value: 3, text: 'Skymark'},
  {value: 4, text: 'Starflyer'},
  {value: 5, text: 'SolaseedAir'},
  {value: 6, text: 'AirDo'},
  {value: 7, text: 'Peach'},
  {value: 8, text: 'JetstarJapan'},
  {value: 9, text: 'ValillaAir'},
  {value: 10, text: 'SpringJapan'},
  {value: 11, text: 'AirasiaJapan'},
  {value: 12, text: 'AmakusaAirline'}  
]

export function getAirlineName(id) {
  return './' + AIRLINE_LIST.find(airline => {
    if (airline.value === id) {
      return airline.text
    }
  }).text.toLowerCase() + '.png'
}

export default {}
