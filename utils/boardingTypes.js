export const BOARDING_TYPE_LIST = [
  {value: 1, text: 'Boeing787-9'},
  {value: 2, text: 'Boeing787-8'},
  {value: 3, text: 'Boeing777-3'},
  {value: 4, text: 'Boeing777-2'},
  {value: 5, text: 'Boeing767-3'},
  {value: 6, text: 'Boeing737-8'},
  {value: 7, text: 'Boeing737-7'},
  {value: 8, text: 'Boeing737-5'},
  {value: 9, text: 'Boeing737-4'},
  {value: 10, text: 'Embraer190'},
  {value: 11, text: 'Embraer170'},
  {value: 12, text: 'Bombardier DHC8-Q400'},
  {value: 13, text: 'ATR42-6'},
  {value: 14, text: 'Boeing787-10'},
  {value: 15, text: 'AirbusA350-9'},
  {value: 16, text: 'AirbusA320'},
  {value: 17, text: 'AirbusA321'}
]

export function getBoardingTypeName(id) {
  return BOARDING_TYPE_LIST.find((boardingType) => {
    if (boardingType.value === id) {
      return boardingType.text
    }
  }).text
}

export default {}
