import React, { Component } from 'react'
import { browserHistory } from 'react-router'

export default class SignUp extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      userUrl: '',
      password: '',
      email: '',
      birthday: ''
    }
    this.handleState = this.handleState.bind(this)
  }
handleState(event){
  this.setState({[event.target.name]: event.target.value})
}
render(){
  return(
    <div className="container" style={{marginTop: "10%"}}>
      <form className="form-horizontal" role="form" method="POST" action="/register">
          <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6" style={{textAlign: "center"}}>
                <h2>Register New User</h2>
                <hr />
              </div>
          </div>
          <div className="row">
              <div className="col-md-3 field-label-responsive" style={{textAlign: "right"}}>
                  <label htmlFor="name">Name</label>
              </div>
              <div className="col-md-6">
                  <div className="form-group">
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-user"></i></div>
                          <input type="text" name="name" className="form-control" id="name"
                                 placeholder="John Doe" required autoFocus />
                      </div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="form-control-feedback">
                          <span className="text-danger align-middle">
                              {/* <!-- Put name validation error messages here --> */}
                          </span>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-3 field-label-responsive" style={{textAlign: "right"}}>
                  <label htmlFor="email">E-Mail Address</label>
              </div>
              <div className="col-md-6">
                  <div className="form-group">
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-at"></i></div>
                          <input type="text" name="email" className="form-control" id="email"
                                 placeholder="you@example.com" required autoFocus />
                      </div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="form-control-feedback">
                          <span className="text-danger align-middle">
                              {/* <!-- Put e-mail validation error messages here --> */}
                          </span>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-3 field-label-responsive" style={{textAlign: "right"}}>
                  <label htmlFor="email">Choose personal web url</label>
              </div>
              <div className="col-md-6">
                  <div className="form-group">
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-laptop"></i></div> <strong style={{margin: "0 5% 0 5%"}}>www.</strong>
                          <input type="text" name="email" className="form-control" id="email"
                                 placeholder="personal-url" required autoFocus />
                                 <strong style={{margin: "0 15% 0 2%"}}>.myline.life</strong>
                      </div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="form-control-feedback">
                          <span className="text-danger align-middle">
                              {/* <!-- Put e-mail validation error messages here --> */}
                          </span>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-3 field-label-responsive" style={{textAlign: "right"}}>
                  <label htmlFor="password">Password</label>
              </div>
              <div className="col-md-6">
                  <div className="form-group has-danger">
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-key"></i></div>
                          <input type="password" name="password" className="form-control" id="password"
                                 placeholder="Password" required />
                      </div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="form-control-feedback">
                          <span className="text-danger align-middle">
                              <i className="fa fa-close"> Error Message</i>
                          </span>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-3 field-label-responsive" style={{textAlign: "right"}}>
                  <label htmlFor="password">Confirm Password</label>
              </div>
              <div className="col-md-6">
                  <div className="form-group">
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: "2.6rem"}}>
                              <i className="fa fa-repeat"></i>
                          </div>
                          <input type="password" name="password-confirmation" className="form-control"
                                 id="password-confirm" placeholder="Password" required />
                      </div>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-3"></div>
              <button type="button" className="btn btn-outline-secondary" onClick={() => browserHistory.push('/login')}><i className="fa fa-sign-in"></i> Back to LogIn</button>
              <div className="col-md-6" style={{textAlign: "center"}}>
                  <button type="button" className="btn btn-success btn-lg"><i className="fa fa-user-plus"></i> Register</button>
              </div>
          </div>
      </form>
    </div>
  )
}
}
