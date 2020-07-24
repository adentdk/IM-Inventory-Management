import React, { useState } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import PersonOutlined from '@material-ui/icons/PersonOutlined'
import { useFirebase } from 'react-redux-firebase'

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const firebase = useFirebase()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    firebase.auth().signOut()
  }

  return (
    <div>
      <IconButton color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <PersonOutlined />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}