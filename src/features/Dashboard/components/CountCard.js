import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import {Link as RLink} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import {Title} from '../../../components'

export default function CountCard(props) {
  const {title, count, linkname, to} = props
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Box flex={1}>
        <Typography component="p" variant="h4">
          {count}
        </Typography>
      </Box>
      <div>
        <Link color="primary" href="#" component={RLink} to={to}>
          {linkname}
        </Link>
      </div>
    </React.Fragment>
  )
}

CountCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  linkname: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}