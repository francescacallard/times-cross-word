import { all } from 'redux-saga/effects'
import { errors } from 'redux/sagas/errors'

export default function* rootSaga () {
  yield all([
    errors()
  ])
}