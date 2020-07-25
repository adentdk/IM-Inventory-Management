import React, { useState } from 'react'
import clsx from 'clsx'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

import { useFirestore } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
  setAppBarTitle,
  setScreenType,
  setScreenAction
} from '../../../redux/actions/global-action'

import styles from './../styles'
const useStyles = styles()

export default function AddProductCategory() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const firestore = useFirestore()

  const [name, setName] = useState('')

  const handleSaveCategory = () => {
    // firestore.collection('product-categories').add().then(() => {
    //   history.push('/product-category')
    // }) 
  }
  
  React.useEffect(() => {
    function bootstrapAsync() {
      dispatch(setAppBarTitle('Add Category'))
      dispatch(setScreenType('form'))
      dispatch(setScreenAction(handleSaveCategory))
    }
    
    bootstrapAsync()
  }, [])
  
  const fixedHeightPaper = clsx(classes.paper, classes.fullHeight)
  return (
    <Paper className={fixedHeightPaper}>
      <TextField
        id="product-category"
        label="Category Name"
        value={name}
        onChange={e => setName(e.target.value)}
        fullWidth
        autoFocus
      />
    </Paper>
  )
}