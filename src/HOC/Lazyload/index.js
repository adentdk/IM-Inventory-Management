import React from 'react'
import {SplashScreen} from './../../components'

const Lazyload = (Component, fallback = <SplashScreen />) => () => {
  return (
    <React.Suspense fallback={fallback}>
      <Component />
    </React.Suspense>
  )
}

export default Lazyload
