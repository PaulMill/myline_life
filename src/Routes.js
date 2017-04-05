import React, { Component } from 'react'
import { Route, Router, browserHistory} from 'react-router'
import App from './App'
import UploadPhotos from './components/uploads/UploadPhotos.component'
import Login from './components/loginSignup/Login.component'
import SignUp from './components/loginSignup/SignUp.component'
import ResetPassword from './components/loginSignup/ResetPassword.component'
import PageError from './components/errorsPages/PageError.component'
import UserInterface from './components/userInterface/UserInterface.component'
import AllPhotos from './components/photos/AllPhotos.component'
import CreateAlbum from './components/albums/CreateAlbum.component'
import AllAlbums from './components/albums/AllAlbums.component'
import ShowPhotos from './components/photos/ShowPhotos.component'
import ShowAlbum from './components/albums/ShowAlbum.component'
import ShowPhotosFromAlbum from './components/photos/ShowPhotosFromAlbum.component'
import ModifyAlbum from './components/albums/ModifyAlbum.component'
import AllPhotosPublic from './components/public/AllPhotosPublic.component'
import MainPagePublic from './components/public/MainPagePublic.component'
import AllAlbumsPublic from './components/public/AllAlbumsPublic.component'
import ShowAlbumPublic from './components/public/ShowAlbumPublic.component'
import MainUserComponent from './components/MainUserComponent'


export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory} >
        <Route path='/' component={App}>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/login/forgot/:url' component={ResetPassword} />
          <Route path='/oops/:code' component={PageError} />
          <Route path='/:userurl' component={MainUserComponent}>
            <Route path='/:userurl/photos' component={AllPhotos} />
            <Route path='/:userurl/uploads' component={UploadPhotos} />
            <Route path='/:userurl/account' component={UserInterface} />
            <Route path='/:userurl/albums/new' component={CreateAlbum} />
            <Route path='/:userurl/albums' component={AllAlbums} />
            <Route path='/:userurl/photos/:id' component={ShowPhotos} />
            <Route path='/:userurl/album/:id' component={ShowAlbum} />
            <Route path='/:userurl/album/show/:id' component={ShowPhotosFromAlbum} />
            <Route path='/:userurl/album/modify/:id' component={ModifyAlbum} />
            <Route path='/:userurl/public' component={MainPagePublic}>
              <Route path='/:userurl/public/photos' component={AllPhotosPublic} />
              <Route path='/:userurl/public/albums' component={AllAlbumsPublic} />
              <Route path='/:userurl/public/album/show/:id' component={ShowAlbumPublic} />
            </Route>
          </Route>
        </Route>
      </Router>
    )
  }
}
