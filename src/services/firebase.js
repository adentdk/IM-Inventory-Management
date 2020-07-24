
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { createFirestoreInstance } from 'redux-firestore'

import store from './../redux/store'
import config from '../config'

const firebaseConfig = config.firebase

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

// Initialize other services on firebase instance
firebase.firestore()

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}