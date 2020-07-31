export interface Menu {
  value: number
  text: string
  url: string
  src: string
  flex: number
}

export interface List {
  value: number
  text: string
  backgroundColor?: string
  color?: string
}

export interface DateRange {
  startDate: string
  endDate?: string
}

export interface Item {
  itemId: number
  itemName: string
  backgroundColor: string
  color: string
}

export interface ItemClass {
  itemClassItemName: string
  items: Item[]
}

export interface AccordionItemClass {
  itemClassName: string
  itemClassItems: ItemClass[]
}
