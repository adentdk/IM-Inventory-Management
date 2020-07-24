import React from 'react'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createBrowserHistory } from 'history'
import { BrowserRouter, Switch } from 'react-router-dom'
import {routes} from './routes/routes'
import { MappedRoute } from './routes/components'
import './App.css'

import store from './redux/store'
import {rrfProps} from './services/firebase'

const browserHistory = createBrowserHistory()

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <Switch>
            <MappedRoute history={browserHistory} routes={routes} />
          </Switch>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

export default App
