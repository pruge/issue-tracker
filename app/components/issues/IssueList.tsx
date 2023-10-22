import {Badge, Table} from '@radix-ui/themes'
import React from 'react'
import * as E from '@/app/api/issues/entity'

interface IssueListParams {
  data: E.GetIssuesResponse
}

const IssueList = ({data}: IssueListParams) => {
  return (
    <Table.Root variant="surface" className="table-fixed">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell className="w-7/12">
            Issue
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data?.map((issue) => (
          <>
            <Table.Row>
              <Table.Cell>{issue.title}</Table.Cell>
              <Table.Cell>
                <Badge color="red">{issue.status}</Badge>
              </Table.Cell>
              <Table.Cell>
                {new Date(issue.createdAt).toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          </>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default IssueList
