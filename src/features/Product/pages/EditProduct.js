import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'

import {
  useFirestore,
  useFirestoreConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import { useHistory, useParams } from 'react-router-dom'

import { Navbar } from '../../../components'

import styles from '../styles'
import { useSelector } from 'react-redux'

const useStyles = styles()
export default function EditProduct() {
  const classes = useStyles()
  const history = useHistory()
  const {id} = useParams()

  const firestore = useFirestore()

  useFirestoreConnect(() => [
    {
      collection: 'products',
      doc: id,
      storeAs: 'productDetail'
    }
  ])

  const product = useSelector((state) => state.firestore.data.productDetail)

  const [name, setName] = useState('')

  const handleSaveCategory = () => {
    firestore.collection('products').doc(id).update({name}).then(() => {
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

  const loaded = isLoaded(product)
  const empty = isEmpty(product)

  useEffect(() => {

    if(loaded && !empty && name === '') {
      setName(product.name)
    }

  }, [
    loaded,
    empty,
    name,
    product,
    setName
  ])

  return (
    <Dialog fullScreen open={true} onClose={handleClose}>
    <Navbar
      position="relative"
      title="Edit Product"
      className={classes.appBar}
      rightIcon={<CloseIcon />}
      rightIconAction={handleClose}
      leftIcon="Save"
      leftIconAction={handleSaveCategory}
    />
      {loaded && !empty && (
        <DialogContent>
          <TextField
            id="product-category"
            label="Product Name"
            value={name}
            defaultValue={product.name}
            onChange={e => setName(e.target.value)}
            fullWidth
            autoFocus
          />
        </DialogContent>
      )}
    </Dialog>
  )
}