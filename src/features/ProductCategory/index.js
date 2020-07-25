import React from 'react'
import clsx from 'clsx'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import ProductCategoryTable from './components/ProductCategoryTable'

import styles from './styles'

const useStyles = styles()

export default function ProductCategory() {
  const classes = useStyles()

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper}>
            <ProductCategoryTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}