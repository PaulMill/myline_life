import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import ForgotPassword from './ForgotPassword.component'

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      forgot: false
    }
    this.handleState = this.handleState.bind(this)

  }
  handleState(event){
    this.setState({[event.target.name]: event.target.value})
  }
  handleSignup(){
    browserHistory.push('/signup')
  }
  render(){
    return(
      <div className="container">
        {this.state.forgot
          ? <ForgotPassword />

          : <form className="form-horizontal" role="form" method="POST" action="/login">
              <div className="row" style={{marginTop: "10%", textAlign: "center"}}>
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                      <h2>Please Login</h2>
                      <hr />
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                      <div className="form-group has-danger">
                          <label className="sr-only" htmlFor="email">E-Mail Address</label>
                          <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                              <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-at"></i></div>
                              <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.handleState}
                                required
                                autoFocus />
                          </div>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="form-control-feedback">
                          <span className="text-danger align-middle">
                              <i className="fa fa-close"></i>error message
                          </span>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                      <div className="form-group">
                          <label className="sr-only" htmlFor="password">Password</label>
                          <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                              <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-key"></i></div>
                              <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleState} 
                                required
                              />
                          </div>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="form-control-feedback">
                          <span className="text-danger align-middle">
                          {/* <!-- Put password error message here --> */}
                          </span>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6" style={{paddingTop: ".35rem"}}>
                      <div className="form-check mb-2 mr-sm-2 mb-sm-0">
                          <label className="form-check-label">
                              <input className="form-check-input" name="remember"
                                     type="checkbox" />
                              <span style={{paddingBottom: ".15rem"}}>Remember me</span>
                          </label>
                      </div>
                  </div>
              </div>
              <div className="row" style={{paddingTop: "1rem"}}>
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                      <button type="submit" className="btn btn-outline-success"><i className="fa fa-sign-in"></i> Login</button>
                      <button type="button" name="forgot" className="btn btn-link" value="true" style={{margin: "0 4%"}} onClick={this.handleState}>Forgot your password?</button>
                      <button type="button" className="btn btn-outline-primary" onClick={() => browserHistory.push('/signup')}><i className="fa fa-user-plus"></i> Sign Up</button>
                  </div>
              </div>
          </form>
        }
    </div>
    )
  }
}
