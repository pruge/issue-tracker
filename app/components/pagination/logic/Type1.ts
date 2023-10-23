/**
 * const listItem = PageType1.create({})
 */

import {
  PaginationItem,
  PaginationOption,
  PaginationVirtualItem,
} from '../interfaces'
import {OptionType1Schema} from './OptionSchema'
import {PaginationType, range} from './PaginationType'

export class PageType1 extends PaginationType {
  private static instance: PageType1

  option!: PaginationOption

  defaultOption: Partial<PaginationOption> = {
    // current: 1,
    pageSize: 10,
    limit: 5,
    // total: 500,
    showFirstButton: false,
    showLastButton: false,
    hideNextButton: false,
    hidePrevButton: false,
    disabled: false,
  }

  public static getInstance() {
    if (!PageType1.instance) {
      PageType1.instance = new PageType1()
    }
    return PageType1.instance
  }

  /**
   * 외부 호출 함수
   */
  public generate(option: PaginationOption): PaginationItem[] {
    this.option = Object.assign(this.option || {}, this.defaultOption, option)
    const validation = OptionType1Schema.safeParse(this.option)
    if (!validation.success) {
      const err = validation.error.errors[0]
      console.warn(`PaginationOption requires [${err.path.join('/')}].`)
      return []
    }

    this.option.totalPage = Math.round(this.option.total / this.option.pageSize)
    this.option.current = Math.min(this.option.current, this.option.totalPage)
    this.option.current = Math.max(this.option.current, 1)

    const list = this.create()
    return this.translate(list)
  }

  // public button(item: PaginationItem): ReactNode {
  //   return <Button key={item.page}>{item.page}</Button>
  // }

  /**
   * pagination virtual 배열 생성.
   */
  protected create(): PaginationVirtualItem[] {
    const {
      current,
      limit: _limit,
      totalPage,
      showFirstButton,
      showLastButton,
      hideNextButton,
      hidePrevButton,
    } = this.option
    const startPage = parseInt('' + (current - 1) / _limit) * _limit + 1
    const leftedPage = totalPage - startPage + 1
    const limit = Math.min(_limit, leftedPage)

    // Basic list of items to render
    // e.g. itemList = ['first', 'previous', 1, 2, 3, 4, 5, 6, 'next', 'last']
    const itemList = [
      ...(showFirstButton ? ['first'] : []),
      ...(hidePrevButton ? [] : ['previous']),

      ...range(startPage, startPage + limit - 1),

      ...(hideNextButton ? [] : ['next']),
      ...(showLastButton ? ['last'] : []),
    ]

    return itemList
  }

  /**
   * generate에서 생성된 배열을 PaginationItem 배열로 변환.
   */
  protected translate(list: PaginationVirtualItem[]): PaginationItem[] {
    const {current, limit, totalPage, disabled} = this.option
    const startPage = parseInt('' + (current - 1) / limit) * limit + 1
    // Map the button type to its page number
    const buttonPage = (type: string) => {
      switch (type) {
        case 'first':
          return 1
        case 'previous':
          return current - 1
        case 'next':
          return current + 1
        case 'last':
          return totalPage
        default:
          // not reached
          return 1
      }
    }
    return list.map((item) => {
      return typeof item === 'number'
        ? {
            type: 'page',
            page: item,
            selected: item === current,
            disabled: disabled,
            'aria-selected': item === current ? true : false,
          }
        : {
            type: item,
            page: buttonPage(item),
            selected: false,
            disabled:
              disabled ||
              (item === 'next' || item === 'last'
                ? current >= totalPage
                : current <= 1),
            'aria-selected': false,
          }
    })
  }
}
