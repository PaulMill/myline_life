import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import axios from 'axios'

export default class ResetPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      password: '',
      confirm_password: ''
    }
    this.handleState = this.handleState.bind(this)
    this.formValidation = this.formValidation.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }
  componentWillMount(){
    axios.get(`/api/users/checkuser/${this.props.params.url}`)
      .then((res) => {
        console.log(res);
        if(!res.data)
        console.log(res.data);
          browserHistory.push('/oops/400')
      })
      .catch(err => console.error('something wrong with server', err))
  }
  handleState(event){
    this.setState({[event.target.name]: event.target.value})
  }
  formValidation(event){
    event.preventDefault()
  }
  handleReset(event){
    event.preventDefault()

    axios.patch('/api/users/newpassword', {
      password: this.state.confirm_password,
      url: `${this.props.params.url}`,
      is_registred: true
    })
    .then((data) => {
      console.log(data);
    })
    .catch(err => console.error(err))
  }
  render(){
    return(
      <div className="row justify-content-md-center" style={{marginTop: "10%", backgroundColor: "#23272A", color: "#C4CFCF"}}>
        <div className="col-md-4 col-sm-6">
          <div className="card">
            <div className="card-block">
              <div className="form-header" style={{textAlign: "center"}}>
                <h5 ><i className="fa fa-lock"></i>Enter your new password: </h5>
              </div>
              <div className="md-form">
                <i className="fa fa-key prefix">New password <span style={{color: "red"}}>(should contains at least 8 characters)</span></i>
                <input
                  className="form-control"
                  type="password"
                  name='password'
                  onChange={this.handleState}
                  value={this.state.password}
                />
                <label></label>
              </div>
              <div className="md-form">
                <i className="fa fa-repeat prefix">Confirm your New Password</i>
                <input
                  className="form-control"
                  type="password"
                  name="confirm_password"
                  onChange={this.handleState}
                  value={this.state.confirm_password}
                />
                <label></label>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-outline-success"
                  type="button"
                  onClick={this.formValidation}
                >
                    Reset my password
                  </button>
              </div>
              <div className="modal-footer">
                <div className="options">
                  <p>After reset password you can login with your new password</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
