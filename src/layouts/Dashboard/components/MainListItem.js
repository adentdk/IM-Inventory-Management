import React from 'react'
import PropsTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded'
import BallotRoundedIcon from '@material-ui/icons/BallotRounded'

function MainListItem(props) {
  const {handleDrawerClose, history} = props

  const menuClick = pathname => {
    
    if (history.pathname !== pathname) {
      history.push(pathname)
    }
    
    handleDrawerClose()
  }

  return (
    <React.Fragment>
      <ListItem button onClick={() => menuClick('/dashboard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => menuClick('/product')}>
        <ListItemIcon>
          <BallotRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItem>
      <ListItem button onClick={() => menuClick('/product-category')}>
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
