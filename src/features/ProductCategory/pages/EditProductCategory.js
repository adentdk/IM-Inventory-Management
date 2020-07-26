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

import { Navbar, SplashScreen } from '../../../components'

import styles from './../styles'
import { useSelector } from 'react-redux'

const useStyles = styles()
export default function EditProductCategory() {
  const classes = useStyles()
  const history = useHistory()
  const {id} = useParams()

  const firestore = useFirestore()

  useFirestoreConnect(() => [
    {
      collection: 'product-categories',
      doc: id,
      storeAs: 'productCategoryDetail'
    }
  ])

  const productCategories = useSelector((state) => state.firestore.data.productCategoryDetail)

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSaveCategory = () => {
    setLoading(true)
    firestore.collection('product-categories').doc(id).update({name})
      .then(() => {
        handleClose()
      }) 
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
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

  const loaded = isLoaded(productCategories)
  const empty = isEmpty(productCategories)

  useEffect(() => {

    if(loaded && !empty && name === '') {
      setName(productCategories.name)
    }

  }, [
    loaded,
    empty,
    name,
    productCategories,
    setName
  ])

  return (
    <Dialog fullScreen open={true} onClose={handleClose}>
    <Navbar
      position="relative"
      title="Edit Category"
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
            label="Category Name"
            value={name}
            defaultValue={productCategories.name}
            onChange={e => setName(e.target.value)}
            fullWidth
            autoFocus
          />
        </DialogContent>
      )}
      {loading && (
        <SplashScreen />
      )}
    </Dialog>
  )
}