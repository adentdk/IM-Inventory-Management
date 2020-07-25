import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'  
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import { useFirebase } from 'react-redux-firebase'

import styles from './styles'

import {Copyright} from './../../components'

const useStyles = styles()

function Login() {
  const classes = useStyles()

  const firebase = useFirebase()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleEmailChange = e => setEmail(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)

  const handleFormSubmit = e => {
    e.preventDefault()
    setLoading(true)
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      setErrorMessage('')
    })
    .catch(error => {
      setErrorMessage(error.message)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
          <TextField
            value={email}
            onChange={handleEmailChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password}
            onChange={handlePasswordChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submit}
          >
            {loading ? 'Loading' : 'Log In'}
          </Button>
          {errorMessage !== '' && (
            <Box mb={3}>
              <Alert variant="outlined" severity="error">
                {errorMessage}
              </Alert>
            </Box>
          )}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.shape({
    go: PropTypes.func.isRequired,
  }).isRequired,
  auth: PropTypes.object
}
