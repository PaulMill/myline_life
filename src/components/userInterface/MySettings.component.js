import React, { Component } from 'react'
import axios from 'axios'

export default class MySettings extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
    this.handleState = this.handleState.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleState(event){
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event, element){
    event.preventDefault()
    let request
    if(element === 'name'){
      request = {name: this.state.name}
    }
    else if(element === 'email'){
      request = {email: this.state.email}
    }
    else if (element === 'password') {
      request = {password: this.state.password}
    }
    axios.patch('api/users/updates', request)
      .then((response) => {
        console.log(response);
      })
      .catch(err => console.error(err))
  }
  formValidator(){

  }
  render(){
    return(
      <div className="container">
        <div id="accordion" role="tablist" aria-multiselectable="true">
          <div className="card">
            <div className="card-header" role="tab" id="headingOne">
              <h5 className="mb-0">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Change name {this.props.userName}
                </a>
              </h5>
            </div>

            <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
              <div className="card-block">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="sr-only" htmlFor="email">E-Mail Address</label>
                            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-user"></i></div>
                                <input
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  value={this.state.name}
                                  onChange={this.handleState}
                                  required
                                  autoFocus />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        {/* <div className="form-control-feedback">
                            <span className="text-danger align-middle">
                                <i className="fa fa-close"></i>{this.state.errorMessageName}
                            </span>
                        </div> */}
                    </div>
                </div>
                <div className="row" style={{paddingTop: "1rem"}}>
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <button
                          type="submit"
                          className="btn btn-outline-success"
                          onClick={() => this.handleSubmit(event, 'name')}
                        ><i className="fa fa-user-plus"></i> Click to change name</button>
                    </div>
                </div>
              </div>
            </div>
          </div>


          <div className="card">
            <div className="card-header" role="tab" id="headingTwo">
              <h5 className="mb-0">
                <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Change email {this.props.email}
                </a>
              </h5>
            </div>
            <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo">
              <div className="card-block">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="sr-only" htmlFor="email">E-Mail Address</label>
                            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-at"></i></div>
                                <input
                                  type="email"
                                  name="email"
                                  className="form-control"
                                  value={this.state.email}
                                  onChange={this.handleState}
                                  required
                                  autoFocus />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        {/* <div className="form-control-feedback">
                            <span className="text-danger align-middle">
                                <i className="fa fa-close"></i>{this.state.errorMessageEmail}
                            </span>
                        </div> */}
                    </div>
                </div>
                <div className="row" style={{paddingTop: "1rem"}}>
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <button
                          type="submit"
                          className="btn btn-outline-success"
                          onClick={() => this.handleSubmit(event, 'email')}
                          ><i className="fa fa-user-plus"></i> Click to change email</button>
                    </div>
                </div>
              </div>
            </div>
          </div>


          <div className="card">
            <div className="card-header" role="tab" id="headingThree">
              <h5 className="mb-0">
                <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Change password {this.props.password}
                  {/* <span style={{fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize: "0.8rem"}}>Click to change password</span> */}
                </a>
              </h5>
            </div>
            <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree">
              <div className="card-block">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="sr-only" htmlFor="email">Password</label>
                            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-key"></i></div>
                                <input
                                  type="email"
                                  name="email"
                                  className="form-control"
                                  placeholder="New Password"
                                  value={this.state.password}
                                  onChange={this.handleState}
                                  required
                                  autoFocus />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        {/* <div className="form-control-feedback">
                            <span className="text-danger align-middle">
                                <i className="fa fa-close"></i>error message
                            </span>
                        </div> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="sr-only" htmlFor="email">Confirm Password</label>
                            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-key"></i></div>
                                <input
                                  type="password"
                                  name="confirmPassword"
                                  className="form-control"
                                  placeholder="Confirm new password"
                                  value={this.state.confirmPassword}
                                  onChange={this.handleState}
                                  required
                                  autoFocus />
                            </div>
                            <span className="text-danger align-middle" style={{fontFamily: ' Copperplate,"Copperplate Gothic Light",fantasy', fontSize: "0.8rem"}}> After click change password you will redirect to login page and you have to log in with your new password</span>
                        </div>
                    </div>
                    <div className="col-md-3">
                        {/* <div className="form-control-feedback">
                            <span className="text-danger align-middle">
                                <i className="fa fa-close"></i>error message
                            </span>
                        </div> */}
                    </div>
                </div>
                <div className="row" style={{paddingTop: "1rem"}}>
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <button
                          type="submit"
                          className="btn btn-outline-success"
                          onClick={() => this.handleSubmit(event, 'password')}
                        ><i className="fa fa-user-plus"></i> Click to change password</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
