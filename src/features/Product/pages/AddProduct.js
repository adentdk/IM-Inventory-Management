import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'

import { useFirestore } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom'

import { Navbar } from '../../../components'

import styles from '../styles'

const useStyles = styles()
export default function AddProduct() {
  const classes = useStyles()
  const history = useHistory()

  const firestore = useFirestore()

  const [name, setName] = useState('')

  const handleSaveCategory = () => {
    console.log(history)
    firestore.collection('products').add({name}).then(() => {
      handleClose()
    }) 
  }

  const handleClose = () => {
    if (history.length > 0) {
      history.goBack()
    } else {
      history.push('/home/product')
    }
  }

  return (
    <Dialog fullScreen open={true} onClose={handleClose}>
    <Navbar
      position="relative"
      title="Add Product"
      className={classes.appBar}
      rightIcon={<CloseIcon />}
      rightIconAction={handleClose}
      leftIcon="Save"
      leftIconAction={handleSaveCategory}
    />
      <DialogContent>
        <TextField
          id="product-category"
          label="Product Name"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
          autoFocus
        />
      </DialogContent>
    </Dialog>
  )
}