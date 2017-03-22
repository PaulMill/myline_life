import React, {Component} from 'react'
import { Link } from 'react-router'

export default class NavBar extends Component {

  render(){
    return(
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded sticky-top">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">
          <img src="/images/logo.jpg" width="30" height="30" className="d-inline-block align-top" alt="" />
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <button style={{margin: "0 2%"}} className="btn btn-outline-info my-2 my-sm-0" type="button">My Account</button>
            <button style={{margin: "0 2%"}} className="btn btn-outline-primary my-2 my-sm-0" type="button">LOG OUT</button>
            <button style={{margin: "0 2%"}} className="btn btn-outline-primary my-2 my-sm-0" type="button">Registration</button>
            <button style={{margin: "0 2%"}} className="btn btn-outline-success my-2 my-sm-0" type="button">LOG IN</button>
          </form>
        </div>
      </nav>
    )
  }
}