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
import useOnlineStatus from '@rehooks/online-status'
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

  const onlineStatus = useOnlineStatus()

  const [categoryCount, setCategoryCount] = React.useState(0)
  const [productCount, setProductCount] = React.useState(0)

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  React.useEffect(() => {
    function bootstrapAsync() {
      dispatch(setAppBarTitle('Dashboard'))
      if (onlineStatus) {
        const data = {
          categoryCount: 0,
          productCount: 0,
        }

        Promise.all([
          firestore.collection('product-categories').orderBy('timestamp', 'desc').get(),
          firestore.collection('products').orderBy('timestamp', 'desc').get()
        ]).then(([snapShot1, snapShot2]) => {

          console.log(snapShot1.size, snapShot2.size)

          setCategoryCount(snapShot1.size)
          setProductCount(snapShot2.size)

          data.categoryCount = snapShot1.size
          data.productCount = snapShot2.size

          localStorage.setItem('dashboard', JSON.stringify(data))
        })
      } else {
        const data = JSON.parse(localStorage.getItem('dashboard'))

        setCategoryCount(data.categoryCount)
        setCategoryCount(data.productCount)
        
      }
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