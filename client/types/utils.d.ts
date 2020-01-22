export interface Menu {
    title: string,
    url: string,
    src: string,
    flex: number
}

export interface List {
    value: number,
    text: string,
    backgroundColor?: string,
    color?: string
}

export interface DateRange {
    startDate: string,
    endDate?: string
}
