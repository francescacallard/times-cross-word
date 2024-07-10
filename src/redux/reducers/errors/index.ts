import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReducersType } from 'redux/reducers/types'
import { ErrorsInitialState } from 'redux/reducers/errors/constants'
import { ConsumeErrorPayload } from 'redux/actions/errors/types'

export const errors = createSlice({
  name: ReducersType.Errors,
  initialState: ErrorsInitialState,
  reducers: {
    consumeError: (state, { payload: error }: PayloadAction<ConsumeErrorPayload>) => ({
      ...state,
      errors: [
        ...state.errors,
        error
      ]
    }),
    clearErrors: (state) => ({
      ...state,
      errors: ErrorsInitialState.errors
    })
  }
})
