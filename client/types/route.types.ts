export enum RouteNames {
  INDEX = 'index',
  LIST = 'list',
  DETAIL = 'detail'
}

type StrRecord = Record<string, any>
type Query<T extends StrRecord> = { query: T }
type Params<T extends StrRecord> = { params: T }

export type ListOption = Query<{ keyword: string }>

export type DetailOption = Params<{ id: string }>

export type RouteOption = {
  [RouteNames.INDEX]: {}
  [RouteNames.LIST]: ListOption
  [RouteNames.DETAIL]: DetailOption
}
