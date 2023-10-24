/**
 * const listItem = PageType3.create({})
 */

import {
  PaginationItem,
  PaginationOption,
  PaginationVirtualItem,
} from '../interfaces'
import {OptionType3Schema} from './OptionSchema'
import {PaginationType, range} from './PaginationType'

export class PageType3 extends PaginationType {
  private static instance: PageType3

  option!: PaginationOption

  defaultOption: Partial<PaginationOption> = {
    current: 1,
    pageSize: 10,
    limit: 5,
    // total: 500,
    showFirstButton: false,
    showLastButton: false,
    hideNextButton: false,
    hidePrevButton: false,
    boundaryCount: 1,
    siblingCount: 1,
    type: 'type3',
    disabled: false,
  }

  public static getInstance() {
    if (!PageType3.instance) {
      PageType3.instance = new PageType3()
    }
    return PageType3.instance
  }

  /**
   * 외부 호출 함수
   */
  public generate(option: PaginationOption): PaginationItem[] {
    this.option = Object.assign(this.option || {}, this.defaultOption, option)
    const validation = OptionType3Schema.safeParse(this.option)
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
      boundaryCount,
      siblingCount,
    } = this.option

    const startPages = range(1, Math.min(boundaryCount, totalPage))
    const endPages = range(
      Math.max(totalPage - boundaryCount + 1, boundaryCount + 1),
      totalPage,
    )
    const siblingsStart = Math.max(
      Math.min(
        current - siblingCount,
        totalPage - boundaryCount - siblingCount * 2 - 1,
      ),
      boundaryCount + 2,
    )
    const siblingsEnd = Math.min(
      Math.max(current + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : totalPage - 1,
    )
    // Basic list of items to render
    // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
    const itemList = [
      ...(showFirstButton ? ['first'] : []),
      ...(hidePrevButton ? [] : ['previous']),
      ...startPages,

      // start ellipse
      ...(siblingsStart > boundaryCount + 2
        ? ['ellipsis']
        : boundaryCount + 1 < totalPage - boundaryCount
        ? [boundaryCount + 1]
        : []),

      // sibling pages
      ...range(siblingsStart, siblingsEnd),

      // end ellipse
      ...(siblingsEnd < totalPage - boundaryCount - 1
        ? ['ellipsis']
        : totalPage - boundaryCount > boundaryCount
        ? [totalPage - boundaryCount]
        : []),

      ...endPages,
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
              (item.indexOf('ellipsis') === -1 &&
                (item === 'next' || item === 'last'
                  ? current >= totalPage
                  : current <= 1)),
            'aria-selected': false,
          }
    })
  }
}
