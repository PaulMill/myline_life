import React, { Component } from 'react'
import { Route, Router, browserHistory } from 'react-router'
import App from './App'
import UploadPhotos from './components/uploads/UploadPhotos.component'
import Login from './components/loginSignup/Login.component'
import SignUp from './components/loginSignup/SignUp.component'
import ResetPassword from './components/loginSignup/ResetPassword.component'
import PageError from './components/errorsPages/PageError.component'
import UserInterface from './components/userInterface/UserInterface.component'
import MainPage from './components/MainPage.component'
import CreateAlbum from './components/albums/CreateAlbum.component'
import AllAlbums from './components/albums/AllAlbums.component'
import ShowPhotos from './components/photos/ShowPhotos.component'


export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory} >
        <Route path='/' component={App}>
          <Route path='/photos' component={MainPage} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/login/forgot/:url' component={ResetPassword} />
          <Route path='/oops/:code' component={PageError} />
          <Route path='/uploads' component={UploadPhotos} />
          <Route path='/account' component={UserInterface} />
          <Route path='/albums/new' component={CreateAlbum} />
          <Route path='/albums' component={AllAlbums} />
          <Route path='/photos/:id' component={ShowPhotos} />
        </Route>
      </Router>
    )
  }
}
