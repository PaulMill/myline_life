import React, { Component } from 'react'
import { Route, Router, browserHistory, IndexRedirect } from 'react-router'
import App from './App'
import UploadPhotos from './components/uploads/UploadPhotos.component'
import Login from './components/loginSignup/Login.component'
import SignUp from './components/loginSignup/SignUp.component'
import ResetPassword from './components/loginSignup/ResetPassword.component'
import PageError from './components/errorsPages/PageError.component'




export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory} >
        <Route path='/' component={App}>
          <IndexRedirect to='/index' />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/login/forgot/:url' component={ResetPassword} />
          <Route path='/oops/:code' component={PageError} />
          <Route path='/uploads' component={UploadPhotos} />
        </Route>
      </Router>
    )
  }
}
