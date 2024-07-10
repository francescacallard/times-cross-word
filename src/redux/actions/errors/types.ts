import { ErrorType } from 'redux/reducers/errors/types'
import { AxiosError } from 'axios'

export type ConsumeErrorPayload = ErrorType

export type HandleErrorPayload = AxiosError