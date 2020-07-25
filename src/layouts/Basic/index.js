import React from 'react'
import PropTypes from 'prop-types'
import { MappedRoute } from '../../routes/components'

const Basic = ({ child }) => {
  return (
    <MappedRoute routes={child} />
  )
}
export default Basic

Basic.propTypes = {
  child: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(Object)
  ])
}