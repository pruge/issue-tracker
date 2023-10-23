import {PaginationOption} from './interfaces'
import {PaginationGenerator} from './logic/PaginationGenerator'
import PaginationButton from './PaginationButton'

const Pagination = (option: Partial<PaginationOption>) => {
  const pagination = PaginationGenerator.getInstance()
  const list = pagination.generate(option)

  return (
    <>
      {list.map((item, i) => (
        <PaginationButton key={item.page} data={item} />
      ))}
    </>
  )
}

export default Pagination
