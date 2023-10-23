import {ReactNode} from 'react'
import {
  PaginationItem,
  PaginationOption,
  PaginationVirtualItem,
} from '../interfaces'

/**
 * 숫자 배열 생성
 */
export function range(start: number, end: number): Array<number> {
  const length = end - start + 1
  return Array.from({length}, (_, i) => start + i)
}

export abstract class PaginationType {
  abstract option: PaginationOption

  abstract generate(option: Partial<PaginationOption>): PaginationItem[]
  protected abstract create(): PaginationVirtualItem[]
  protected abstract translate(list: PaginationVirtualItem[]): PaginationItem[]

  // abstract button(item: PaginationItem): ReactNode
}
