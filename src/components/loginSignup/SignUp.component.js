import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import axios from 'axios'

export default class SignUp extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      url: '',
      password: '',
      passwordConfirm: '',
      email: '',
      birthday: ''
    }
    this.handleState = this.handleState.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.formValidation = this.formValidation.bind(this)
  }
handleState(event){
  this.setState({[event.target.name]: event.target.value})
}
handleSubmit(event){
  event.preventDefault()
  const {name, email, birthday, password} = this.state
  const request = {name, email, birthday, password}
  axios.post('api/users/newuser', request)
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.error(err)
    })
}
formValidation(event){

}
render(){
  return(
    <div className="container" style={{marginTop: "10%"}}>
      <form className="form-horizontal" role="form" method="POST" action="/register">
          <div className="row">
              <div className="col-md-3 col-sm-0"></div>
              <div className="col-md-6 col-sm-12" style={{textAlign: "center"}}>
                <h2>Register New User</h2>
                <hr />
              </div>
          </div>
          <div className="row">
              <div className="col-md-3 col-sm-2 field-label-responsive" style={{textAlign: "right"}}>
                  <label htmlFor="name">Name</label>
              </div>
              <div className="col-md-6 col-sm-8">
                  <div className="form-group">
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-user"></i></div>
                          <input
                            type="text"
                            name="name"
                            onChange={this.handleState}
                            value={this.state.name}
                            className="form-control"
                            placeholder="John Doe"
                            required
                            autoFocus
                          />
                      </div>
                  </div>
              </div>
              <div className="col-md-3 col-sm-2">
                  <div className="form-control-feedback">
                          <span className="text-danger align-middle">
                              {/* <!-- Put name validation error messages here --> */}
                          </span>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-3 col-sm-2field-label-responsive" style={{textAlign: "right"}}>
                  <label htmlFor="email">E-Mail Address</label>
              </div>
              <div className="col-md-6 col-sm-8">
                  <div className="form-group">
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-at"></i></div>
                          <input
                            type="email"
                            name="email"
                            onChange={this.handleState}
                            value={this.state.email}
                            className="form-control"
                            placeholder="you@example.com"
                            required
                            autoFocus
                          />
                      </div>
                  </div>
              </div>
              <div className="col-md-3 col-sm-2">
                  <div className="form-control-feedback">
                          <span className="text-danger align-middle">
                              {/* <!-- Put e-mail validation error messages here --> */}
                          </span>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-3 col-sm-2 field-label-responsive" style={{textAlign: "right"}}>
                  <label htmlFor="email">Choose personal web url</label>
              </div>
              <div className="col-md-6 col-sm-8">
                  <div className="form-group">
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-laptop"></i></div> <strong style={{margin: "0 5% 0 5%"}}>www.</strong>
                          <input
                            type="text"
                            name="url"
                            className="form-control"
                            placeholder="personal-url"
                            value={this.state.url}
                            onChange={this.handleState}
                            required
                            autoFocus />
                                 <strong style={{margin: "0 15% 0 2%"}}>.myline.life</strong>
                      </div>
                  </div>
              </div>
              <div className="col-md-3 col-sm-2">
                  <div className="form-control-feedback">
                          <span className="text-danger align-middle">
                              {/* <!-- Put e-mail validation error messages here --> */}
                          </span>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-3 col-sm-2 field-label-responsive" style={{textAlign: "right"}}>
                  <label htmlFor="password">Password</label>
              </div>
              <div className="col-md-6 col-sm-8">
                  <div className="form-group has-success">
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-key"></i></div>
                          <input
                            type="password"
                            name="password"
                            onChange={this.handleState}
                            value={this.state.password}
                            className="form-control"
                            placeholder="Password"
                            required
                          />
                      </div>
                  </div>
              </div>
              <div className="col-md-3 col-sm-2">
                  <div className="form-control-feedback">
                          <span className="text-danger align-middle">
                              <i className="fa fa-close"> Error Message</i>
                          </span>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-3 col-sm-2 field-label-responsive" style={{textAlign: "right"}}>
                  <label htmlFor="password">Confirm Password</label>
              </div>
              <div className="col-md-6 col-sm-2">
                  <div className="form-group">
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: "2.6rem"}}>
                              <i className="fa fa-repeat"></i>
                          </div>
                          <input
                            type="password"
                            name="passwordConfirm"
                            onChange={this.handleState}
                            value={this.state.passwordConfirm}
                            className="form-control"
                            placeholder="Password"
                            required
                          />
                      </div>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-lg-3 col-md-2 col-sm-1"></div>
              <div className="col-lg-3 col-md-1 col-sm-1" style={{textAlign: "center"}}>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => browserHistory.push('/login')}
              >
                <i className="fa fa-sign-in"></i> Back to LogIn</button>
            </div>
              <div className="col-lg-3 col-md-1 col-sm-1" style={{textAlign: "center"}}>
                  <button
                    type="button"
                    className="btn btn-success btn-lg"
                    onClick={this.handleSubmit}
                  ><i className="fa fa-user-plus"></i> Registration </button>
              </div>
          </div>
      </form>
    </div>
  )
}
}
