import React, { useState } from 'react'
import clsx from 'clsx'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

import styles from '../styles'
import { setAppBarTitle, setScreenType } from '../../../redux/actions/global-action'
import { useDispatch } from 'react-redux'

const useStyles = styles()
export default function AddProductCategory() {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [name, setName] = useState('')

  React.useEffect(() => {
    function bootstrapAsync() {
      dispatch(setAppBarTitle('Edit Category'))
      dispatch(setScreenType('form'))
    }

    bootstrapAsync()
  }, [])

  const handleNameChange = e => setName(e.target.value)

  const fixedHeightPaper = clsx(classes.paper, classes.fullHeight)

  return (
    <Paper className={fixedHeightPaper}>
      <TextField
        id="product-category"
        label="Category Name"
        value={name}
        onChange={handleNameChange}
        fullWidth
        autoFocus
      />
    </Paper>
  )
}