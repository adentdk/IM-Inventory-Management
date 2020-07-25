import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function FullScreenDialog({open, setOpen, handleSave}) {
  const classes = useStyles()

  const [categoryName, setCategoryName] = useState('')

  const handleClose = () => {
    setOpen(false)
  }

  const handleButtonSave = e => {
    e.preventDefault()
    handleSave({name: categoryName}).finally(() => {
      setOpen(false)
    })
  }

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add New Product Category
            </Typography>
            <Button autoFocus color="inherit" onClick={handleButtonSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TextField
            label="Category Name"
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
            autoFocus
            fullWidth
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

FullScreenDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
}