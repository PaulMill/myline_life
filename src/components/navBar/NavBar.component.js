import React, {Component} from 'react'
import { Link, browserHistory } from 'react-router'
import axios from 'axios'
import logo from '../../logo.svg'

export default class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: false,
      button: false,
      nameComponent: ''
    }
    this.handleRedirect = this.handleRedirect.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
  }
  handleRedirect(string){
    browserHistory.push(string)
  }
  handleLogOut(event){
    event.preventDefault()
    axios.delete('/api/tokens/')
      .then((res) => {
        browserHistory.push('/')
        window.location.reload()
      })
      .catch((err) => {
        console.error(err);
      })
  }
  render(){
    console.log(this.state.isLoggedIn);
    return (
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded sticky-top" style={{backgroundColor: "#23272A"}}>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">
            <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="logo" />
          </a>

          {this.props.login
            ? <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link to={`/${this.props.url}/photos`} className="nav-link" style={{color: "#C4CFCF", fontWeight: "600"}}>Photos <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link to={`/${this.props.url}/albums`} className="nav-link" style={{color: "#C4CFCF", fontWeight: "600"}}>Albums</Link>
                </li>
                <li className="nav-item">
                  <Link to={`/${this.props.url}/albums/new`} className="nav-link" style={{color: "#C4CFCF", fontWeight: "600"}}>Create Albums</Link>
                </li>
                <li className="nav-item">
                  <Link to={`/${this.props.url}/uploads`} className="nav-link" style={{color: "#C4CFCF", fontWeight: "600"}}>Upload Photos</Link>
                </li>
              </ul>
              <ul className="navbar-nav mr-auto">
                <li style={{color: "#C4CFCF", fontWeight: "600"}} className="nav-item" >Welcome  <span style={{color: "#B84818"}}> {this.props.name}</span></li>
              </ul>
              <button
                style={{margin: "0 1%"}}
                className="btn btn-outline-info my-2 my-sm-0"
                type="button"
                onClick={() => (this.handleRedirect(`/${this.props.url}/account`))}
                >MY ACCOUNT</button>
                <button
                  style={{margin: "0 2%"}}
                  className="btn btn-outline-primary my-2 my-sm-0"
                  type="button"
                  onClick={this.handleLogOut}
                >LOG OUT</button>
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
                  onClick={() => (this.handleRedirect('/signup'))}
                  >REGISTRATION</button>
                  <button
                    style={{margin: "0 2%"}}
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="button"
                    onClick={() => (this.handleRedirect('/login'))}
                    >LOG IN</button>
                  </div>
                }
              </nav>
            )
  }
}
