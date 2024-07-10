import { createAction } from '@reduxjs/toolkit'
import {
  CONSUME_ERROR,
  CLEAR_ERRORS,
  HANDLE_ERROR
} from 'redux/actions/errors/constants'
import { ConsumeErrorPayload, HandleErrorPayload } from 'redux/actions/errors/types'

export const handleError = createAction<HandleErrorPayload>(HANDLE_ERROR)

export const consumeError = createAction<ConsumeErrorPayload>(CONSUME_ERROR)

export const clearErrors = createAction(CLEAR_ERRORS)

