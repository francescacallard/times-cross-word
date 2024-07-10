import { Loaders } from 'redux/reducers/loaders/types'

export interface ToggleLoaderPayload {
  name: Loaders
}

export type PrepareActionType = (name: Loaders) => { payload: ToggleLoaderPayload }

