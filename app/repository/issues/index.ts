import {APIClient} from '../apiClient'
import * as IssueAPI from './api'

export const getIssues = APIClient.of(IssueAPI.GetIssues)

export const createIssue = APIClient.of(IssueAPI.CreateIssue)
