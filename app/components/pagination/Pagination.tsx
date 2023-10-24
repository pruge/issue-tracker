import {PaginationOption} from './interfaces'
import {PaginationGenerator} from './logic/PaginationGenerator'
import PaginationButton from './PaginationButton'

const Pagination = (option: Partial<PaginationOption>) => {
  const pagination = PaginationGenerator.getInstance()
  const list = pagination.generate(option)

  return (
    <div className="flex justify-center space-x-1 py-3">
      {list.map((item, i) => (
        <PaginationButton key={item.page} data={item} />
      ))}
    </div>
  )
}

export default Pagination
