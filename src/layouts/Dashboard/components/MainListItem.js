import React from 'react'
import PropsTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded'
import BallotRoundedIcon from '@material-ui/icons/BallotRounded'

function MainListItem(props) {
  const {handleDrawerClose} = props

  return (
    <React.Fragment>
      <ListItem
        button
        component={Link}
        to="/home/dashboard"
        onClick={handleDrawerClose}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/home/product"
        onClick={handleDrawerClose}
      >
        <ListItemIcon>
          <BallotRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/home/product-category"
        onClick={handleDrawerClose}
      >
        <ListItemIcon>
          <CategoryRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Product Categories" />
      </ListItem>
    </React.Fragment>
  )
}

export default withRouter(MainListItem)

MainListItem.propTypes = {
  handleDrawerClose: PropsTypes.func,
  history: PropsTypes.shape({
    push: PropsTypes.func,
    pathname: PropsTypes.string
  })
}
