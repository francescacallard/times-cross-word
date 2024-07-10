import { LoadersStateType } from 'redux/reducers/loaders/types'
import { ErrorsStateType } from 'redux/reducers/errors/types'

export interface RootState {
  loaders: LoadersStateType
  errors: ErrorsStateType
}