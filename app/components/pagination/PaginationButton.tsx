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

interface PaginationButtonProps {
  data: PaginationItem
}

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
  console.log('data', data)

  if (type === 'start-ellipsis' || type === 'end-ellipsis') {
    return <div>...</div>
  } else if (type === 'page') {
    return (
      <Button {...item} asChild>
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
      <Button {...item} asChild>
        <Link href={`/issues?page=${page}`}>{ICONS[type]}</Link>
      </Button>
    )
  } else if (type === 'ellipsis') {
    return <Button className="bg-red-600">{ICONS[type]}</Button>
  }
}

export default PaginationButton
