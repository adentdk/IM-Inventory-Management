import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import Menu from './../Menu'
const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  }
}))

function Navbar({ rightIcon, rightIconAction, title, leftIcon, leftIconAction, className, position }) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <AppBar position={position || 'absolute'} className={className || classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={rightIconAction}
            className={clsx(classes.menuButton)}
          >
            <>{rightIcon}</>
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {title}
          </Typography>
          {typeof leftIcon !== 'undefined' ? (
            <Button autoFocus color="inherit" onClick={leftIconAction}>
              {leftIcon}
            </Button>
          ) : (
            <Menu />
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Navbar

Navbar.propTypes = {
  className: PropTypes.string,
  position: PropTypes.string,
  rightIcon: PropTypes.node,
  rightIconAction: PropTypes.func,
  leftIcon: PropTypes.string,
  leftIconAction: PropTypes.func,
  title: PropTypes.string
}

