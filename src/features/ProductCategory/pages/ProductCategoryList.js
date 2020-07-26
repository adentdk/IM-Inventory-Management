import React from 'react'
import clsx from 'clsx'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'

import ProductCategoryTable from './../components/ProductCategoryTable'

import styles from './../styles'
import { useDispatch } from 'react-redux'
import { setAppBarTitle } from '../../../redux/actions/global-action'

const useStyles = styles()

export default function ProductCategoryList() {
  const classes = useStyles()
  const dispatch = useDispatch()

  React.useEffect(() => {
    function bootstrapAsync() {
      dispatch(setAppBarTitle('Product Category'))
    }

    bootstrapAsync()
    // eslint-disable-next-line
  }, [])

  const fixedHeightPaper = clsx(classes.paper, classes.fullHeight)
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Paper className={fixedHeightPaper}>
        <ProductCategoryTable />
      </Paper>
    </Container>
  )
}