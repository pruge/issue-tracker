import React from 'react'
import {Badge, Button, Table} from '@radix-ui/themes'
import Link from 'next/link'
import * as api from '@/app/api'
import IssueList from '@/app/components/issues/IssueList'

const IssuesPage = async () => {
  const issues = await api.issues.getIssues()

  return (
    <div>
      <div className="mb-3 flex">
        <div className="ml-auto">
          <Button>
            <Link href="/issues/new">New Issue</Link>
          </Button>
        </div>
      </div>
      <div>
        <IssueList data={issues} />
      </div>
    </div>
  )
}

export default IssuesPage
