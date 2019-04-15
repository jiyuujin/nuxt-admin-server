export interface Dictionary<T> {
  [key: string]: T
}

export interface Item {
  id: number,
  data: string[],
  page: number
}

export interface Form {
  item: Item
}

export interface TipForm {
  title: string,
  url: string,
  description: string,
  tags: number[],
  event: number,
  time: Date
}

export interface QiitaUser {
  profile_image_url: string;
  location: string;
}

export interface QiitaForm {
  title: string;
  url: string;
  updated_at: Date;
  user: QiitaUser[];
}

export interface FlightForm {
  time: Date,
  departure: number,
  arrival: number,
  airline: number,
  boardingType: number,
  registration: string
}

export interface EventForm {
  id: number;
  name: string;
  url: string;
  locale: number;
}

export interface ContactCategory {
  value: number;
  text: string;
}

export interface ContactForm {
  title: number;
  email: string;
  description: string;
  time: Date;
  category: ContactCategory;
}
