import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/AddCircle'


import {Title} from '../../../../components'
import { useHistory } from 'react-router-dom'


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
  const history = useHistory()
  const classes = useToolbarStyles()
  const { numSelected } = props

  const handleButtonAdd = () => {
    history.push('product/add') 
  }

  return (
    <React.Fragment>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <Title className={classes.title}>Products</Title>
        <Tooltip title="Add product">
          <IconButton aria-label="add product" onClick={handleButtonAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </React.Fragment>
  )
}

export default EnhancedTableToolbar

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}