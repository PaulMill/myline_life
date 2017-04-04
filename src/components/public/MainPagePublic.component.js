import React, { Component } from 'react';
import '../../App.css';
import NavBar from '../navBar/NavBar.component'
import axios from 'axios'

class MainPagePublic extends Component {

  render() {
    const { isLoggedIn, userId, userName, photosToShow } = this.props
    console.log(this.props.userName);
    return (
      <div>
        <NavBar login={isLoggedIn}/>
          { this.props.children
            ? React.cloneElement(this.props.children, {photosToShow, isLoggedIn, userId, userName, editParentState: this.editParentState})
            : null
          }
      </div>
    )
  }
}

export default MainPagePublic;
