import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navBar/NavBar.component'
import axios from 'axios'
import logo from './logo.svg'
// import { browserHistory } from 'react-router'

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
    const styleTextH1 = {textAlign: 'center', color: '#919999', fontSize: '4rem', fontWeight: 'bold', fontFamily: 'Oswald'}
    const styleTextH0 = {textAlign: 'center', color: '#b84818', fontSize: '6rem', fontWeight: 'bold', fontFamily: 'Oswald', marginTop: "6%"}
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
              <div className="container" style={{marginTop: '5%'}}>
                <div className="row justify-content-md-center">
                  <div className="col-md-8 col-sm-12">
                    <div style={{textAlign: "center"}}>
                      <img src={logo} className="App-logo" alt="logo" style={{marginBottom: "4%", fill: "#b84818"}} />
                    </div>
                    <h1 style={styleTextH1}></h1>
                    <h1 style={styleTextH1}></h1>
                    <h1 style={styleTextH0}>{`{ thebook.photos }`}</h1>
                    <div style={{marginTop: "8%"}}>
                      <h3 style={{fontStyle: 'italic', textAlign: 'center', color: "#C4CFCF", fontWeight: 'bold'}}>Organize, Share, & Manage</h3>
                      <h3 style={{fontStyle: 'italic', textAlign: 'center', color: "#C4CFCF", fontWeight: 'bold'}}>All of Your Photos in One Place</h3><br />
                    </div>
                  </div>
                </div>
              </div>
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
