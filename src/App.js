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
        url: ''
      }
      this.setUserState = this.setUserState.bind(this)
    }
    setUserState(newstate){
      this.setState(newstate)
    }
    componentWillMount(){
      axios.get('/api/tokens')
        .then((res) => {
          if (!res.data) {
            return
          }
          return this.setState(res.data)
        })
        .then(() => {
          return
        })
        .catch(err => {
          console.error(err);
        })
    }

  render() {
    const { isLoggedIn, userId, userName, url } = this.state
    return (
      <div>
        <NavBar login={isLoggedIn} url={url} name={userName} id={userId}/>
          { this.props.children
            ? React.cloneElement(this.props.children, {url, isLoggedIn, userId, userName, setUserState: this.setUserState})
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
