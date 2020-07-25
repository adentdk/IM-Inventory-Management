import React from 'react'
import clsx from 'clsx'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'

import ProductTable from '../components/ProductTable'

import styles from '../styles'
import { useDispatch } from 'react-redux'
import { setAppBarTitle, setScreenType } from '../../../redux/actions/global-action'

const useStyles = styles()

export default function ProductList() {
  const classes = useStyles()
  const dispatch = useDispatch()

  React.useEffect(() => {
    function bootstrapAsync() {
      dispatch(setAppBarTitle('Product'))
      dispatch(setScreenType('view'))
    }

    bootstrapAsync()
    // eslint-disable-next-line
  }, [])

  const fixedHeightPaper = clsx(classes.paper, classes.fullHeight)
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Paper className={fixedHeightPaper}>
        <ProductTable />
      </Paper>
    </Container>
  )
}