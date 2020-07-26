import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'

import { useFirestore } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom'

import { Navbar, SplashScreen } from '../../../components'

import styles from './../styles'

const useStyles = styles()
export default function AddProductCategory() {
  const classes = useStyles()
  const history = useHistory()

  const firestore = useFirestore()

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSaveCategory = () => {
    setLoading(true)
    firestore.collection('product-categories').add({
      name,
      timestamp: firestore.FieldValue.serverTimestamp()
    }).then(() => {
      handleClose()
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      setLoading(false)
    })
  }

  const handleClose = () => {
    if (history.length > 0) {
      history.goBack()
    } else {
      history.push('/home/product-category')
    }
  }

  return (
    <Dialog fullScreen open={true} onClose={handleClose}>
    <Navbar
      position="relative"
      title="Add Category"
      className={classes.appBar}
      rightIcon={<CloseIcon />}
      rightIconAction={handleClose}
      leftIcon="Save"
      leftIconAction={handleSaveCategory}
    />
      <DialogContent>
        <TextField
          id="product-category"
          label="Category Name"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
          autoFocus
        />
      </DialogContent>
      {loading && (
        <SplashScreen />
      )}
    </Dialog>
  )
}