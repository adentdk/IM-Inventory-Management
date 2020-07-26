import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import MenuItem from '@material-ui/core/MenuItem'
import CloseIcon from '@material-ui/icons/Close'

import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'

import { DropzoneDialog } from 'material-ui-dropzone'

import { useFirestore, useFirebase } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom'

import { Navbar, SplashScreen } from '../../../components'

import styles from '../styles'
import { Snackbar } from '@material-ui/core'

const useStyles = styles()
export default function AddProduct() {
  const classes = useStyles()
  const history = useHistory()

  const firebase = useFirebase()
  const firestore = useFirestore()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [unit, setUnit] = useState(() => ({
    id: null,
    name: null
  }))
  const [category, setCategory] = useState(() => ({
    id: null,
    name: null
  }))

  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState(false)

  const [references, setReferences] = useState(() => ({
    units: [],
    categories: []
  }))

  const handleImageChange = files => {
    const imgUrl = URL.createObjectURL(files[0])
    setImage(files[0])
    setImageUrl(imgUrl)
    setOpen(false)
  }

  const handleSaveCategory = () => {
    const storagePath = 'products'
    const dbPath = 'products'

    const data = {
      name,
      quantity,
      unit,
      category,
      price,
      timestamp: firestore.FieldValue.serverTimestamp()
    }

    setLoading(true)

    firestore.collection('products').add(data).then(result => {
      return firebase
        .uploadFile(storagePath, image, dbPath, {
          name: result.id,
          documentId: result.id,
          metadataFactory: async (uploadRes, firebase, metadata, downloadURL) => {
            const {
              metadata: { name, fullPath }
            } = uploadRes
            const data = {
              image: {
                name,
                fullPath,
                url: downloadURL
              }
            }
            await result.update(data)
            return data
          }
        })
    })
    .then(() => {
      setLoading(false)
      setSnackbarMessage('Add Data Success')
      setSnackbarOpen(true)
      handleClose()
    })
    .catch(() => {
      setSnackbarMessage('Add Data Failed')
      setSnackbarOpen(true)
    })
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
      getReferences().then(() => setLoading(false))
    }

    bootstrapAsync()
  }, [])

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
              <TextField
                id="product-unit"
                label="Unit"
                value={unit}
                onChange={e => setUnit(e.target.value)}
                fullWidth
                select
                helperText="Please select product unit"
              >
                {references.units.map((option) => (
                  <MenuItem key={option.id} value={option}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="product-category"
                label="Category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                fullWidth
                select
                helperText="Please select product category"
              >
                {references.categories.map((option) => (
                  <MenuItem key={option.id} value={option}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
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