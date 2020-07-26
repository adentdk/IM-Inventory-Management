import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty, useFirestore, useFirebase } from 'react-redux-firebase'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

import Button from '@material-ui/core/Button'

import EnhancedTableSkeleton from './EnhancedTableSkeleton'
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import { Snackbar, SplashScreen } from '../../../../components'
import EnhancedTableBody from './EnhancedTableBody'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 200,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}))

export default function EnhancedTable() {
  const classes = useStyles()
  const firebase = useFirebase()
  const firestore = useFirestore()
  useFirestoreConnect([
    { collection: 'products', storeAs: 'products' } // or 'todos'
  ])
  const products = useSelector((state) => state.firestore.ordered.products)
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('name')
  const [selected, setSelected] = React.useState(() => [])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const [loading, setLoading] = React.useState(false)
  const [deleteDialog, setDeleteDialog] = React.useState(false)
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState(false)


  const handleClose = () => {
    setDeleteDialog(false)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleDeleteAction = row => e => {
    e.preventDefault()
    setDeleteDialog(true)
    setSelected([row])
  }

  const handleDelete = () => {
    const product = selected[0]
    setLoading(true)
    firestore.collection('products').doc(product.id).delete().then(() => {
      return firebase.deleteFile(product.image.fullPath)
    })
    .finally(() => {
      handleClose()
      setLoading(false)
      setSnackbarMessage('The products was successfully deleted')
      setSnackbarOpen(true)
      setSelected([])
    })
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  const emptyRows = isEmpty(products)

  const loadingFirestore = !isLoaded(products)

  const productCount = emptyRows ? 0 : products.length

  return (
    <div className={classes.root}>
      <React.Fragment>
        <EnhancedTableToolbar numSelected={selected.length} />
        {loadingFirestore ? <EnhancedTableSkeleton /> : (
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size="medium"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={productCount}
              />
              <EnhancedTableBody
                products={products}
                order={order}
                orderBy={orderBy}
                page={page}
                rowsPerPage={rowsPerPage}
                emptyRows={emptyRows}
                isSelected={isSelected}
                handleClick={handleClick}
                handleDeleteAction={handleDeleteAction}
              />
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={productCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </React.Fragment>
      <Dialog
        open={deleteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Delete "${selected[0]?.name}" from products ?`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No,
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} setOpen={setSnackbarOpen} message={snackbarMessage} />
      {loading && (
        <SplashScreen />
      )}
    </div>
  )
}
