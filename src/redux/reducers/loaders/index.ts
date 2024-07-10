import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReducersType } from 'redux/reducers/types'
import { ToggleLoaderPayload } from 'redux/actions/loaders/types'
import { LoadersInitialState } from 'redux/reducers/loaders/constants'

export const loaders = createSlice({
  name: ReducersType.Loaders,
  initialState: LoadersInitialState,
  reducers: {
    startLoading: (state, { payload: { name } }: PayloadAction<ToggleLoaderPayload>) => ({
      ...state,
      [name]: true
    }),
    stopLoading: (state, { payload: { name } }: PayloadAction<ToggleLoaderPayload>) => ({
      ...state,
      [name]: false
    })
  }
})
