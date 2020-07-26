import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'

function EnhancedTableSkeleton() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={6} md={6} lg={6}>
          <Skeleton width={'100%'} height={46} />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Skeleton width={'100%'} height={46} />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Skeleton width={'100%'} height={46} />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Skeleton width={'100%'} height={46} />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Skeleton width={'100%'} height={46} />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Skeleton width={'100%'} height={46} />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Skeleton width={'100%'} height={46} />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Skeleton width={'100%'} height={46} />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Skeleton width={'100%'} height={46} />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Skeleton width={'100%'} height={46} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default EnhancedTableSkeleton
