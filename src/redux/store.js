import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { getFirebase } from 'react-redux-firebase'

import rootReducer from './reducers'

const middlewares = [
  thunk.withExtraArgument(getFirebase)
]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

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