import React, { Component } from 'react'

export default class SinglePictureModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      name: '',
      isRead: true,
      isWrite: false,
      isRegistred: ''
    }
    this.handleState = this.handleState.bind(this)
    this.handleStateRadio = this.handleStateRadio.bind(this)
  }
  handleState(event){
    this.setState({[event.target.name]: event.target.value})
  }
  handleStateRadio(event){
    if(event.target.name === 'isRead'){
      this.setState({isRead: true, isWrite: false})
    }
    else if (event.target.name === 'isWrite') {
      this.setState({isRead: false, isWrite: true})
    }
  }
  handleSendLink(){
    console.log('Thank you for sending link')
  }
  render(){
    return(
      <div className="modal fade bd-modal-form-share" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel0101" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabels0101">Share your album to: </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container">
                <form>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleState}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleState}
                      />
                    </div>
                  </div>
                  <fieldset className="form-group row">
                    <legend className="col-form-legend col-sm-2">Permissions</legend>
                    <div className="col-sm-10">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="isRead"
                            onChange={this.handleStateRadio}
                            checked={this.state.isRead}
                          />
                          VIEW ONLY
                        </label>
                      </div>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="isWrite"
                            onChange={this.handleStateRadio}
                            checked={this.state.isWrite}
                          />
                          VIEW AND MODIFY
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Send share link</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
