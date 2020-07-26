import React from 'react'

import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import CountCard from '../components/CountCard'
import { useDispatch } from 'react-redux'
import { setAppBarTitle } from '../../../redux/actions/global-action'
import { useFirestore } from 'react-redux-firebase'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}))

export default function Dashboard() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const firestore = useFirestore()

  const [categoryCount, setCategoryCount] = React.useState(0)
  const [productCount, setProductCount] = React.useState(0)

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  React.useEffect(() => {
    function bootstrapAsync() {
      dispatch(setAppBarTitle('Dashboard'))

      firestore.collection('product-categories')
      .orderBy('timestamp', 'desc').get()
      .then(snapshot => {
        setCategoryCount(snapshot.size)
      })

      firestore.collection('products')
      .orderBy('timestamp', 'desc').get()
      .then(snapshot => {
        setProductCount(snapshot.size)
      })
    }

    bootstrapAsync()
    // eslint-disable-next-line
  }, [])

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <CountCard
              title={'Product Count'}
              count={productCount}
              linkname={'View Product List'}
              to={'/home/product'}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <CountCard
              title={'Category Count'}
              count={categoryCount}
              linkname={'View Category List'}
              to={'/home/product-category'}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

Dashboard.propTypes = {
  title: PropTypes.string
}