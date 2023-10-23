import {ReactNode} from 'react'
import {PaginationItem, PaginationOption} from '../interfaces'
import {PaginationType} from './PaginationType'
import {PageType1} from './Type1'
import {PageType2} from './Type2'
import {PageType3} from './Type3'

export class PaginationGenerator {
  private static instance: PaginationGenerator
  pagination!: PaginationType

  public static getInstance() {
    if (!PaginationGenerator.instance) {
      PaginationGenerator.instance = new PaginationGenerator()
    }
    return PaginationGenerator.instance
  }

  generate(option: Partial<PaginationOption>): PaginationItem[] {
    // let pagination: PaginationType
    switch (option.type) {
      case 'type1':
        this.pagination = PageType1.getInstance()
        break
      case 'type2':
        this.pagination = PageType2.getInstance()
        break
      case 'type3':
        this.pagination = PageType3.getInstance()
        break

      default:
        this.pagination = PageType1.getInstance()
        break
    }
    return this.pagination.generate(option)
  }

  // button(item: PaginationItem): ReactNode {
  //   return this.pagination.button(item)
  // }
}
