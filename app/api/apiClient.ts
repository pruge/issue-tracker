import axios, {AxiosError, AxiosResponse} from 'axios'
import {APIRequest} from './interfaces/apiRequest'
import {APIResponse} from './interfaces/apiResponse'
import {APIError} from './interfaces/apiError'

const API_URL = process.env.NEXT_PUBLIC_API_URL
const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

type Constructor<T> = new (...args: any[]) => T

// eslint-disable-next-line
type ResponseType<T> = T extends APIRequest<infer T> ? T : never

export class APIClient {
  // API Client Singleton
  static shared = new APIClient()

  static request<U extends APIResponse>(request: APIRequest<U>): Promise<U> {
    return APIClient.shared.request(request)
  }

  /** API를 받아서 호출할 수 있는 함수로 변환합니다. */
  static toCallable<
    T extends Constructor<any>,
    U extends InstanceType<T>,
    R extends ResponseType<U> & APIError,
  >(api: T) {
    return (...args: ConstructorParameters<T>) =>
      APIClient.request<R>(new api(...args))
  }

  /** API를 호출할 수 있는 함수로 변환합니다. `toCallable`의 alias */
  static of = APIClient.toCallable

  // Local Server 또는 API Endpoint
  baseURL: string = API_URL!
  // 타임 아웃
  timeout: number = 20 * 1000

  request<U extends APIResponse>(request: APIRequest<U>): Promise<U> {
    return new Promise<U>((resolve, reject) => {
      axios
        .request({
          url: request.path,
          method: request.method,
          params: request.params,
          data: (request.convertBody || this.convertBody)(request.data),
          timeout: this.timeout,
          baseURL: request.baseURL || this.baseURL,
          headers: this.createHeaders(request),
          responseType: 'json',
        })
        .then((data: AxiosResponse<U>) => {
          const response = request.parse
            ? request.parse(data)
            : this.parse<U>(data)
          resolve(response)
        })
        .catch((err) => {
          const apiError = this.normalizeError(err)
          this.errorMiddleware(apiError)
          reject(apiError)
        })
    })
  }

  private convertBody(data: any) {
    return JSON.stringify(data)
  }

  // Default parser
  private parse<U extends APIResponse>(data: AxiosResponse<U>): U {
    return data.data
  }

  private errorMiddleware(error: APIError): void {
    // 인증 오류 발생 시 로그인 페이지로 쫓아냄
    if (error.status === 401) {
      console.error('auth error')
    }
  }

  // Convert axios error into APIError
  private normalizeError(error: AxiosError): APIError {
    // @ts-ignore
    console.log(error.response?.data?.message)
    return {
      status: error.response?.status!,
      // @ts-ignore
      message: error.response?.data?.message || error.message,
      // @ts-ignore
      errors: error.response?.data?.errors,
      raw: error,
      response: error.response,
    }
  }
  /**
   * header 만들기.
   * TODO: server 와 client에서 authToken을 다르게 얻기 하기.
   * ! server에서 authToken이 필요없다. server에서 자체 db 접근함으로.
   * ! client에서는 auth 를 체크해야 한다.
   */
  private createHeaders<U extends APIResponse>(request: APIRequest<U>): any {
    const headers: Record<string, string> = {}
    const csrfToken = this.getCsrfToken()
    // const authToken = localStorage.getItem(AUTH_TOKEN_KEY!)
    const authToken = ''

    // CSRF 토큰 삽입
    if (csrfToken && request.method !== HTTPMethod.GET) {
      headers['X-CSRFToken'] = csrfToken
    }

    // 인증 토큰 삽입
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`
    }

    // json body 사용
    if (
      request.method === HTTPMethod.POST ||
      request.method === HTTPMethod.PUT
    ) {
      headers['Content-Type'] = 'application/json'
    }

    // 기타 헤더 삽입
    if (request.headers) {
      Object.assign(headers, request.headers)
    }

    return headers
  }

  /**
   * cookie에서 csrfToken 가져오기.
   * TODO: server or client에서 cookie 접근 방식을 달리하여 수정/테스트
   */
  private getCsrfToken() {
    return ''
    // const csrfTokenEntry = document.cookie
    //   .split(' ')
    //   .map((e) => e.split('='))
    //   .find(([key]) => key === 'csrftoken')

    // const csrfToken = csrfTokenEntry ? csrfTokenEntry[1] : null
    // return csrfToken
  }
}
