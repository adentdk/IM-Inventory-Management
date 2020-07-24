import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'

const RenderedRoute = (Component, child, isLogin) => (props) => {
  // const state = store.getState();
  // eslint-disable-next-line react/prop-types
  const { location } = props
  const { pathname } = location
  if (pathname === '/') {
    if (isLogin) {
      return <Redirect to="/dashboard" />
    }
    return <Redirect to="/login" />
  }

  if (!isLogin && pathname !== '/login') {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location }
        }}
      />
    )
  } else if (isLogin && pathname !== '/dashboard' && child.length <= 0) {
    return (<Component {...props} child={child} />)
  } else if (isLogin && pathname === '/login') {
    return (<Redirect to="/dashboard" />)
  }
  return <Component {...props} child={child} />
}

const MainRouter = ({ path, component, title, exact = false, child = [] }) => {
  const auth = useSelector(state => state.firebase.auth)
  const isLogin = isLoaded(auth) && !isEmpty(auth)
  return (
    <Route
      exact={exact}
      path={path}
      render={RenderedRoute(component, child, isLogin, title)}
    />
  )
}


export default MainRouter

MainRouter.propTypes = {
  child: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(Object)
  ]),
  component: PropTypes.instanceOf(Object).isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}