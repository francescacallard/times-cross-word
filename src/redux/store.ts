import { configureStore } from '@reduxjs/toolkit'
import {
  errors,
  loaders
} from 'redux/reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'redux/sagas'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    errors: errors.reducer,
    loaders: loaders.reducer
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)

export default store

