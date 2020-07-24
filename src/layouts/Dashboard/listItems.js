import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded'
import BallotRoundedIcon from '@material-ui/icons/BallotRounded'

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BallotRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CategoryRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Product Categories" />
    </ListItem>
  </div>
)
