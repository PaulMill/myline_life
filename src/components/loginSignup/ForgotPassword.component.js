import React, { Component } from 'react'
import superagent from 'superagent'

export default class ForgotPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: ''
    }
    this.handleState = this.handleState.bind(this)
    this.handleSendRequest = this.handleSendRequest.bind(this)
  }
  handleState(event){
    this.setState({email: event.target.value})
  }
  handleSendRequest(){
    event.preventDefault()
    superagent.post('/api/users/forgot')
    .set('Content-Type', 'application/json')
    .send(this.state)
    .on('progress', event => {
      console.log(event);
    })
    .end((err, res) => {
      if(err){
        console.log(err)
      }
      console.log(res)
    })
  }
  render(){
    return(
      <div className="row justify-content-md-center" style={{marginTop: "10%"}}>
        <div className="col-md-6 col-sm-12">
          <div className="card">
            <div className="card-block">
              <div className="form-header" style={{textAlign: "center"}}>
                <h5 ><i className="fa fa-lock"></i> Forgot password? Not a problem:</h5>
              </div>
              <div className="md-form">
                <i className="fa fa-envelope prefix"></i>
                <input
                  className="form-control"
                  type="email"
                  onChange={this.handleState}
                  value={this.state.email}
                />
                <label>Enter your email and we will send you a link to set a password</label>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-outline-success"
                  onClick={this.handleSendRequest}
                  type="button"
                >
                    Send request for password
                  </button>
              </div>
            </div>
            <div className="modal-footer">
              <div className="options">
                <p>Don't have an access to email <a href="#">Send request</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
