import {z} from 'zod'
import {createIssueSchema} from './validation'

enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
}

export type Issue = {
  id: number
  title: string
  description: string
  status: Status
  createdAt: Date
  updatedAt?: Date
}

export type GetIssuesResponse = Issue[]
export type CreateIssueResponse = Issue

// export type IssueForm = z.infer<typeof createIssueSchema>
export type CreateIssueRequest = z.infer<typeof createIssueSchema>
export type IssueForm = CreateIssueRequest
