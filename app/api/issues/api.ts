import {APIClient, HTTPMethod} from '../apiClient'
import {APIRequest} from '../interfaces/apiRequest'
import {PaginationParams} from '../interfaces/paginationParams'
import * as E from './entity'

const endpoint = '/api/issues'

class CreateIssue<R extends E.CreateIssueResponse> implements APIRequest<R> {
  method = HTTPMethod.POST
  response!: R
  auth = false
  path = `${endpoint}`
  data: E.IssueForm
  constructor(data: E.IssueForm) {
    this.data = data
  }
}
export const createIssue = APIClient.of(CreateIssue)

class GetIssues<R extends E.GetIssuesResponse> implements APIRequest<R> {
  method = HTTPMethod.GET
  response!: R
  auth = false
  path = `${endpoint}`
  params: PaginationParams
  constructor(params: PaginationParams) {
    this.params = params
  }
}
export const getIssues = APIClient.of(GetIssues)
