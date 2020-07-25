import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFirestore } from 'react-redux-firebase'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/AddCircle'


import {Title} from '../../../../components'
import FormAddCategory from '../FormAddCategory'


const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}))

function EnhancedTableToolbar(props) {
  const firestore = useFirestore()
  const classes = useToolbarStyles()
  const { numSelected } = props

  const [showForm, setShowForm] = useState(false)

  const handleSaveProductCategory = data => {
    return new Promise(resolve => {
      firestore.collection('product-categories').add(data).then(() => {
        resolve(true)
      })
    })
  }

  return (
    <React.Fragment>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Title className={classes.title}>Product Categories</Title>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add category">
            <IconButton aria-label="add category" onClick={() => setShowForm(true)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <FormAddCategory open={showForm} setOpen={setShowForm} handleSave={handleSaveProductCategory} />
    </React.Fragment>
  )
}

export default EnhancedTableToolbar

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}