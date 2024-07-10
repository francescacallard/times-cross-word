import { ApiRoutePaths, HTTPMethods } from 'api/types'

export interface ErrorType {
  status: number,
  message: string,
  pathname: ApiRoutePaths,
  method: HTTPMethods
}

export interface ErrorsStateType {
  errors: ErrorType[]
}