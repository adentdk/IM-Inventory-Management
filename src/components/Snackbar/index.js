import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

function SlideTransition(props) {
  return <Slide {...props} direction="up" />
}

export default function TransitionsSnackbar({open, setOpen, message}) {
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        message={message}
        key={'a'}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  )
}

TransitionsSnackbar.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  message: PropTypes.string
}