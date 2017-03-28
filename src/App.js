import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navBar/NavBar.component'
import axios from 'axios'

class App extends Component {
  constructor(props) {
      super(props)

      this.state = {
        isLoggedIn: false,
        userId: 0,
        userName: '',
        photosToShow: []
      }
      this.editParentState = this.editParentState.bind(this)
    }
    editParentState(newState) {
      this.setState(newState)
    }
    componentWillMount(){
      axios.get('/api/tokens')
        .then((res) => {
          if (!res.data) {
            return console.log(res.data);
          }
          console.log(res.data)
          this.setState(res.data)
        })
        .catch(err => {
          console.error(err);
        })
    }

  render() {
    const { isLoggedIn, userId, userName, photosToShow } = this.state
    return (
      <div>
        <NavBar login={isLoggedIn}/>
          { this.props.children
            ? React.cloneElement(this.props.children, {photosToShow, isLoggedIn, userId, userName, editParentState: this.editParentState})
            : null
          }
          {this.state.isLoggedIn
            ? <div></div>
            : <main>
                <video className="videoWelcomePage" poster="./bground/bgr.jpg" autoPlay="true" loop>
                  <source src="./bground/bgr.mp4" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
                  <source src="./bground/bgr.webm" type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.
                </video>
              </main>
          }

      </div>
    )
  }
}

export default App;
