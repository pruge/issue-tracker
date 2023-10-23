export interface PaginationOption {
  current: number
  pageSize: number
  total: number
  totalPage: number
  limit: number
  showFirstButton: boolean
  showLastButton: boolean
  hideNextButton: boolean
  hidePrevButton: boolean
  boundaryCount: number
  siblingCount: number

  type: 'type1' | 'type2' | 'type3'

  disabled: boolean
}

export type PaginationVirtualItem = string | number

export interface PaginationItem {
  type: string
  page: number
  selected: boolean
  disabled: boolean
  'aria-selected': boolean
}
