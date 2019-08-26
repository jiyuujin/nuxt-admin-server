/* eslint-disable */
import DocumentData = firebase.firestore.DocumentData;

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

export interface ItemDataList {
  item: ItemData[]
}

interface ItemData {
  id: string,
  data: DocumentData,
  page: number
}

// メニュー
export interface MenuList {
  title: string,
  url: string,
  src: string,
  flex: number
}

// リスト
export interface SimpleList {
  value: number,
  text: string
}

export interface CustomListWithColor {
  value: number,
  text: string,
  backgroundColor: string,
  color: string
}

export interface CustomListWithUrl {
  name: string,
  url: string
}

// 経歴
export interface WorkForm {
  allWorks: {
    id: string,
    title: string,
    description: string
  }
}

// 成果物
export interface ProductForm {
  allProducts: {
    id: string,
    title: string,
    description: string,
    url: string,
    tag: string[]
  }
}

// 活動履歴
export interface ActivityForm {
  allActivities: {
    id: string,
    title: string,
    description: string,
    url: string
  }
}

// Tip
export interface TipForm {
  title: string,
  url: string,
  description: string,
  tags: number[],
  event: number,
  time: Date
}

// フライト
export interface FlightForm {
  time: Date,
  departure: number,
  arrival: number,
  airline: number,
  boardingType: number,
  registration: string
}

// イベント
export interface EventForm {
  id: number;
  name: string;
  url: string;
  locale: number;
}

// 問い合わせ
export interface ContactForm {
  title: number;
  email: string;
  description: string;
  time: Date;
  category: ContactCategory;
}

// 写真
export interface PhotoForm {
  name: string;
  content: string;
}

interface ContactCategory {
  value: number;
  text: string;
}

// Qiita
export interface QiitaForm {
  title: string;
  url: string;
  updated_at: Date;
  user: QiitaUser[];
}

interface QiitaUser {
  profile_image_url: string;
  location: string;
}
/* eslint-enable */
