import {Button} from '@radix-ui/themes'
import Link from 'next/link'
import * as api from '@/app/api'
import IssueList from '@/app/components/issues/IssueList'
import Pagination from '@/app/components/pagination/Pagination'

// issue list page size
const PAGE_SIZE = 2

/**
 * server component get searchParams
 * https://nextjs.org/docs/app/api-reference/file-conventions/page
 */
const IssuesPage = async ({
  searchParams,
}: {
  searchParams: {[key: string]: string | undefined}
}) => {
  const page = parseInt(searchParams?.page || '1')
  const skip = (page - 1) * PAGE_SIZE

  const issues = await api.issues.getIssues({skip, take: PAGE_SIZE})

  return (
    <div>
      <div className="mb-3 flex">
        <div className="ml-auto">
          <Button>
            <Link href="/issues/new">New Issue</Link>
          </Button>
        </div>
      </div>
      <IssueList data={issues.data} />
      <Pagination
        type="type3"
        total={issues.total}
        showFirstButton
        showLastButton
        pageSize={PAGE_SIZE}
        current={page}
      />
    </div>
  )
}

export default IssuesPage
