import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { getFirebase } from 'react-redux-firebase'

import rootReducer from './reducers'

const middlewares = [
  logger,
  thunk.withExtraArgument(getFirebase)
]
const initialState = {}

const persistConfig = {
  key: 'root',
  storage: localStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  initialState,
  compose(applyMiddleware(...middlewares))
)



export const persistor = persistStore(store)