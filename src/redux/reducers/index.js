
import { combineReducers } from 'redux'
import {
  firebaseReducer
} from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore' 

import globalReducer from './global-reducer'


const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  global: globalReducer
})

export default rootReducer
