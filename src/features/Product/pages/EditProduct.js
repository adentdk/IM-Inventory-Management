import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CloseIcon from '@material-ui/icons/Close'

import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'

import { DropzoneDialog } from 'material-ui-dropzone'

import {
  useFirestore,
  useFirebase,
  useFirestoreConnect, 
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import { useHistory, useParams } from 'react-router-dom'

import { Navbar, SplashScreen } from '../../../components'

import styles from '../styles'
import { useSelector } from 'react-redux'
import { Snackbar } from '@material-ui/core'

const useStyles = styles()
export default function EditProduct() {
  const classes = useStyles()
  const history = useHistory()
  const {id} = useParams()

  const firebase = useFirebase()
  const firestore = useFirestore()

  useFirestoreConnect(() => [
    {
      collection: 'products',
      doc: id,
      storeAs: 'productDetail'
    }
  ])

  const product = useSelector((state) => state.firestore.data.productDetail)


  const loaded = isLoaded(product)
  const empty = isEmpty(product)

  const [open, setOpen] = useState(false)
  const [loading, setloading] = useState(true)
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(null)
  const [quantity, setQuantity] = useState(0)
  const [unit, setUnit] = useState(() => ({
    id: null,
    name: null
  }))
  const [category, setCategory] = useState(() => ({
    id: null,
    name: null
  }))

  const [references, setReferences] = useState(() => ({
    units: [],
    categories: []
  }))

  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState(false)

  const handleImageChange = files => {
    const imgUrl = URL.createObjectURL(files[0])
    setImage(files[0])
    setImageUrl(imgUrl)
    setOpen(false)
  }

  const handleSaveCategory = () => {
    setloading(true)
    const storageRef = firebase.storage().ref()
    const data = {
      name,
      quantity,
      unit,
      price,
      category
    }
    if (image) {
      const uploadTask = storageRef.child(product.image.fullPath).put(image)
      uploadTask.on('state_changed', 
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        storageRef.child(`/products/${id}`).getDownloadURL()
        .then(imageUrl => {
          data.image = {
            name: id,
            fullPath: `/products${id}`,
            url: imageUrl
          }
          return firestore.collection('products').doc(id).update(data)
        })
        .then(() => {
          setSnackbarMessage('Edit Data Success')
          setSnackbarOpen(true)
          handleClose()
        })
        .catch(error => {
          console.log(error)
          setSnackbarMessage('Edit Data Failed')
          setSnackbarOpen(true)
        })
        .finally(() => {
          setloading(false)
        })
      })
    } else {
      firestore.collection('products').doc(id).update(data)
        .then(result => {
          console.log(result)
          handleClose()
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        setloading(false)
      })
    }
  }

  const handleClose = () => {
    if (history.length > 0) {
      history.goBack()
    } else {
      history.push('/home/product')
    }
  }

  const getReferences = () => {
    const unitRef = firestore.collection('units').get()
    const categoryRef = firestore.collection('product-categories').get()

    return Promise.all([unitRef, categoryRef])
      .then(([unitSnapShot, categorySnapShoot]) => {
        const unitData = []
        const categoryData = []
        unitSnapShot.forEach(doc => {
          unitData.push({ name: doc.data().name, id: doc.id})
        })
        categorySnapShoot.forEach(doc => {
          categoryData.push({ name: doc.data().name, id: doc.id})
        })
        setReferences({
          units: unitData,
          categories: categoryData
        })
      })
  }

  useEffect(() => {
    const bootstrapAsync = () => {
      getReferences().then(() => setloading(false))
    }

    bootstrapAsync()
  }, [])

  useEffect(() => {

    if(loaded && !empty) {
      if (name === '') {
        setName(product.name)
      }
      if (quantity === 0) {
        setQuantity(product.quantity)
      }
      if (unit === null) {
        setUnit(product.unit)
      }
      if (price === null) {
        setPrice(product.price)
      }
      if (category === null) {
        setCategory(product.category)
      }
      if (imageUrl === null) {
        setImageUrl(product.image.url)
      }
    }

  }, [
    loaded,
    empty,
    name,
    quantity,
    unit,
    category,
    imageUrl,
    product,
    setName,
    setQuantity,
    setUnit,
    setCategory,
    setImage
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
      <DialogContent>
        <form noValidate autoComplete="off">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            my={1}
          >
            <Box mb={1}>
              <Avatar alt={'Product Image'} src={imageUrl} className={classes.large} />
            </Box>
            <Box>
              <Button fullWidth variant="contained" color="primary" onClick={() => setOpen(true)}>
                Add Image
              </Button>
            </Box>
            <DropzoneDialog
              acceptedFiles={['image/*']}
              cancelButtonText={'cancel'}
              submitButtonText={'submit'}
              filesLimit={1}
              maxFileSize={3000000}
              open={open}
              onClose={() => setOpen(false)}
              onSave={handleImageChange}
              showPreviews={false}
              showFileNamesInPreview={false}
            />
          </Box>
          <Box my={1}>
            <TextField
              id="product-category"
              label="Product Name"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              autoFocus
            />
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                id="product-category"
                label="Quantity"
                value={quantity}
                type="number"
                onChange={e => setQuantity(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="product-price"
                label="Price"
                value={price}
                type="number"
                onChange={e => setPrice(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel shrink>Product Unit</InputLabel>
                <Select
                  native
                  fullWidth
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
                  inputProps={{
                    name: 'product-unit',
                    id: 'age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  {references.units.map(item => (
                    <option key={item.id} value={item}>{item.name}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel shrink>Product Category</InputLabel>
                <Select
                  native
                  fullWidth
                  value={category}
                  onChange={e => setUnit(e.target.value)}
                  inputProps={{
                    name: 'product-unit',
                    id: 'age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  {references.categories.map(item => (
                    <option key={item.id} value={item}>{item.name}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <Snackbar open={snackbarOpen} setOpen={setSnackbarOpen} message={snackbarMessage} />
      {loading && (
        <SplashScreen />
      )}
    </Dialog>
  )
}