import {HTTPMethod} from '../apiClient'
import {APIRequest} from '../interfaces/apiRequest'
import * as E from './entity'

const endpoint = '/api/issues'

export class CreateIssue<R extends E.CreateIssueResponse>
  implements APIRequest<R>
{
  method = HTTPMethod.POST
  response!: R
  auth = false
  path = `${endpoint}`
  constructor(public data: E.IssueForm) {}
}

export class GetIssues<R extends E.GetIssuesResponse> implements APIRequest<R> {
  method = HTTPMethod.GET
  response!: R
  auth = false
  path = `${endpoint}`
}
