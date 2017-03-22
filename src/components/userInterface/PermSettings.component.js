import React, { Component } from 'react'
import axios from 'axios'

export default class PermSettings extends Component {
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
  render(){
    return(
      <div className="container">
        <div id="accordion" role="tablist" aria-multiselectable="true">
          <div className="card">
            <div className="card-header" role="tab" id="headingOnePerm">
              <h5 className="mb-0">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOnePerm" aria-expanded="true" aria-controls="collapseOnePerm">
                  My Shared Photos <span style={{fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize: "0.8rem"}}>Check your permissions to photos</span>
                </a>
              </h5>
            </div>

            <div id="collapseOnePerm" className="collapse show" role="tabpanel" aria-labelledby="headingOnePerm">
              <div className="card-block">
                Here is photo access
              </div>
            </div>
          </div>


          <div className="card">
            <div className="card-header" role="tab" id="headingTwoPerm">
              <h5 className="mb-0">
                <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwoPerm" aria-expanded="false" aria-controls="collapseTwoPerm">
                  My Shared Albums  <span style={{fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize: "0.8rem"}}>Check your permissions to albums</span>
                </a>
              </h5>
            </div>
            <div id="collapseTwoPerm" className="collapse" role="tabpanel" aria-labelledby="headingTwoPerm">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="card">
                      <img className="card-img-top" src="..." alt="Card image cap" />
                      <div className="card-block">
                        <h5 className="card-title">Special title treatment</h5>

                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>


          <div className="card">
            <div className="card-header" role="tab" id="headingThreePerm">
              <h5 className="mb-0">
                <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThreePerm" aria-expanded="false" aria-controls="collapseThreePerm">
                  My public access  <span style={{fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize: "0.8rem"}}>Click to change public access</span>
                </a>
              </h5>
            </div>
            <div id="collapseThreePerm" className="collapse" role="tabpanel" aria-labelledby="headingThreePerm">
              <div className="card-block">
                Here is public Access
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
