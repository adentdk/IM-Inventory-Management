import { connect } from 'react-redux'

import Login from './login.pages'

const enhance = connect(
  // Map redux state to component props
  ({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })
)

export default enhance(Login)