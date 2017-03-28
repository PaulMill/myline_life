import React, {Component} from 'react'
import { Link, browserHistory } from 'react-router'
import SignUp from '../loginSignup/SignUp.component'
import Login from '../loginSignup/Login.component'

export default class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: false,
      button: false,
      nameComponent: ''
    }
    this.handleRegistration = this.handleRegistration.bind(this)
    this.handleAccount = this.handleAccount.bind(this)
  }
  componentWillMount(){
    this.setState({isLoggedIn: this.props.login})
  }
  handleRegistration(string){
    event.preventDefault()
    this.setState({button: true, nameComponent: string})
  }
  handleAccount(){
    browserHistory.push('/account')
  }
  render(){
    let component
    if (this.state.nameComponent === 'reg') {
      component = <SignUp />
    }
    else if (this.state.nameComponent === 'login') {
      component = <Login />
    }
    return(
      <div>
        {this.state.button
          ? component
          : <nav className="navbar navbar-toggleable-md navbar-light bg-faded sticky-top">
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <a className="navbar-brand" href="#">
                <img src="/images/logo.jpg" width="30" height="30" className="d-inline-block align-top" alt="logo" />
              </a>

              {this.state.isLoggedIn
                ? <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <Link to={'/index'} className="nav-link">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/albums'} className="nav-link" >Albums</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/albums/new'} className="nav-link" >Create Albums</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/uploads'} className="nav-link" >Upload Photos</Link>
                    </li>
                  </ul>
                  <button
                    style={{margin: "0 1%"}}
                    className="btn btn-outline-info my-2 my-sm-0"
                    type="button"
                    onClick={this.handleAccount}
                  >MY ACCOUNT</button>
                  <button style={{margin: "0 2%"}} className="btn btn-outline-primary my-2 my-sm-0" type="button">LOG OUT</button>
                </div>

                : <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                    </li>
                  </ul>
                  <button
                    style={{margin: "0 1%"}}
                    className="btn btn-outline-primary my-2 my-sm-0"
                    type="button"
                    onClick={() => (this.handleRegistration('reg'))}
                  >REGISTRATION</button>
                  <button
                    style={{margin: "0 2%"}}
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="button"
                    onClick={() => (this.handleRegistration('login'))}
                  >LOG IN</button>
                </div>
              }
            </nav>
          }
      </div>
    )
  }
}
