import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase'
import { createBrowserHistory } from 'history'
import { BrowserRouter, Switch } from 'react-router-dom'
import {routes} from './routes/routes'
import { MappedRoute } from './routes/components'
import './App.css'

import {store} from './redux/store'
import {rrfProps} from './services/firebase'

const browserHistory = createBrowserHistory()

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>splash screen...</div>
  return children
}

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <AuthIsLoaded>
            <Switch>
              <MappedRoute history={browserHistory} routes={routes} />
            </Switch>
          </AuthIsLoaded>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

export default App
