import {HTTPMethod} from '../apiClient'
import {APIRequest} from '../interfaces/apiRequest'
import {PaginationParams} from '../interfaces/paginationParams'
import * as E from './entity'

const endpoint = '/api/issues'

export class CreateIssue<R extends E.CreateIssueResponse>
  implements APIRequest<R>
{
  method = HTTPMethod.POST
  response!: R
  auth = false
  path = `${endpoint}`
  constructor(data: E.IssueForm) {}
}

export class GetIssues<R extends E.GetIssuesResponse> implements APIRequest<R> {
  method = HTTPMethod.GET
  response!: R
  auth = false
  path = `${endpoint}`
  params: PaginationParams
  constructor(params: PaginationParams) {
    this.params = params
  }
}
