import React, { Component } from 'react'
import { Route, Router, browserHistory, IndexRedirect } from 'react-router'
import App from './App'
import Login from './components/loginSignup/Login.component'
import SignUp from './components/loginSignup/SignUp.component'
import ResetPassword from './components/loginSignup/ResetPassword.component'
import PageError from './components/errorsPages/PageError.component'
// import RegUser from './components/users/RegUser.component'
// import AdminCreateUsers from './components/users/AdminCreateUsers.component'
// import Home from './components/content/Home.component'
// import Projects from './components/projects/Projects.component'


export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory} >
        <Route path='/' component={App}>
          <IndexRedirect to='/' />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/login/forgot/:url' component={ResetPassword} />
          <Route path='/oops/:code' component={PageError} />
          {/* <Route path='/index' component={Home} />
          <Route path='/newuser/:url' component={RegUser} />
          <Route path='/admin/newusers' component={AdminCreateUsers} />
          <Route path='/projects' component={Projects} /> */}
        </Route>
      </Router>
    )
  }
}
