import React, {ReactNode} from 'react'
import {PaginationItem} from './interfaces'
import {Button} from '@radix-ui/themes'
import Link from 'next/link'
import {
  MdChevronLeft,
  MdChevronRight,
  MdFirstPage,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdLastPage,
  MdMoreHoriz,
} from 'react-icons/md'
import clsx from 'clsx'

interface PaginationButtonProps {
  data: PaginationItem
}

/**
 * ! Object의 key를 string으로 상요할 수 없는 문제인가
 * 1. Record<string, ..>를 사용하거나,
 * 2. key를 enum으로 지정하여 사용한다.
 * 3. key를 as const로 수정할 수 없음을 말할 수도 있다.
 */
const ICONS: Record<string, ReactNode> = {
  last: <MdLastPage />,
  first: <MdFirstPage />,
  next: <MdChevronRight />,
  'next-limit': <MdKeyboardDoubleArrowRight />,
  previous: <MdChevronLeft />,
  'previous-limit': <MdKeyboardDoubleArrowLeft />,
  ellipsis: <MdMoreHoriz />,
}

const PaginationButton = ({data}: PaginationButtonProps) => {
  const {page, type, selected, ...item} = data

  if (type === 'ellipsis') {
    return (
      <Button variant="outline" className="px-[10px]">
        {ICONS[type]}
      </Button>
    )
  } else if (type === 'page') {
    const variant = clsx({solid: selected, outline: !selected}) as
      | 'solid'
      | 'outline'
    return (
      <Button {...item} asChild variant={variant}>
        <Link href={`/issues?page=${page}`}>{page}</Link>
      </Button>
    )
  } else if (
    type === 'first' ||
    type === 'previous' ||
    type === 'next' ||
    type === 'previous-limit' ||
    type === 'next-limit' ||
    type === 'last'
  ) {
    return (
      <Button {...item} asChild variant="outline" className="px-[10px]">
        <Link href={`/issues?page=${page}`}>{ICONS[type]}</Link>
      </Button>
    )
  }
}

export default PaginationButton
