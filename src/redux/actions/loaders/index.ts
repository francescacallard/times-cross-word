import {
  START_LOADING,
  STOP_LOADING
} from 'redux/actions/loaders/constants'
import { createAction } from '@reduxjs/toolkit'
import { Loaders } from 'redux/reducers/loaders/types'
import { ToggleLoaderPayload } from 'redux/actions/loaders/types'

type PrepareActionType = (name: Loaders) => { payload: ToggleLoaderPayload }

export const startLoading = createAction<PrepareActionType>(START_LOADING,
  (name: Loaders)  => ({
    payload: { name }
  }))

export const stopLoading = createAction(STOP_LOADING,
  (name: Loaders) => ({
    payload: { name }
  }))
