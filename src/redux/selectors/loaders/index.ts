import { RootState } from 'redux/types/store'
import { Loaders } from 'redux/reducers/loaders/types'

export const getIsLoading = (state: RootState, name: Loaders): boolean =>
  state.loaders[name]