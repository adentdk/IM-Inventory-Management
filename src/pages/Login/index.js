import { connect } from 'react-redux'

import Login from './login.pages'

const enhance = connect(
  // Map redux state to component props
  ({ firebase: { auth } }) => ({
    auth
  })
)

export default enhance(Login)