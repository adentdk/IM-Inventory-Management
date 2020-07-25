import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Chart from './../components/Chart'
import Deposits from './../components/Deposits'
import Orders from './../components/Orders'
import { useDispatch } from 'react-redux'
import { setAppBarTitle, setScreenType } from '../../../redux/actions/global-action'

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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  React.useEffect(() => {
    function bootstrapAsync() {
      dispatch(setAppBarTitle('Dashboard'))
      dispatch(setScreenType('view'))
    }

    bootstrapAsync()
    // eslint-disable-next-line
  }, [])

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

Dashboard.propTypes = {
  title: PropTypes.string
}