import { applyMiddleware, compose, createStore } from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { getFirebase } from 'react-redux-firebase'

import rootReducer from './reducers'

const middlewares = [
  logger,
  thunk.withExtraArgument(getFirebase)
]

const initialState = {}
const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middlewares))
)

export default store