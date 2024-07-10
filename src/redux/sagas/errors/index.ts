import { all, put, takeEvery } from 'redux-saga/effects'
import parse from 'url-parse'
import { HANDLE_ERROR } from 'redux/actions/errors/constants'
import { consumeError } from 'redux/actions/errors'
import { PayloadAction } from '@reduxjs/toolkit'
import { HandleErrorPayload } from 'redux/actions/errors/types'
import { ApiRoutePaths, HTTPMethods } from 'api/types'

function* handleError({ payload: { response, config: { url, method } } }: PayloadAction<HandleErrorPayload>) {
  if (response && url ) {
    const { status, data } = response
    const { pathname } = parse(url)

    yield put(consumeError({
      status,
      message: data as string,
      pathname: pathname as ApiRoutePaths,
      method: method?.toUpperCase() as HTTPMethods
    }))
  }
}

export function* errors() {
  yield all([
    takeEvery(HANDLE_ERROR, handleError),
  ])
}