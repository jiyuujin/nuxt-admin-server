import DocumentData = firebase.firestore.DocumentData

export interface ItemDataList {
  item: Array<{
    id: string
    data: DocumentData
    page: number
  }>
}

export interface TipForm {
  title: string
  url: string
  description: string
  tags: number[]
  event: number
  time: Date
}

export interface FlightForm {
  time: Date
  departure: number
  arrival: number
  airline: number
  boardingType: number
  registration: string
}

export interface EventForm {
  id: number
  name: string
  url: string
  locale: number
}

export interface ContactForm {
  title: number
  email: string
  description: string
  time: Date
  category: {
    value: number
    text: string
  }
}

export interface PhotoForm {
  name: string
  content: string
}

export interface WorkForm {
  allWorks: {
    id: string
    title: string
    description: string
  }
}

export interface ProductForm {
  allProducts: {
    id: string
    title: string
    description: string
    url: string
    tag: string[]
  }
}

export interface ActivityForm {
  allActivities: {
    id: string
    title: string
    description: string
    url: string
  }
}
