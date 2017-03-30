import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { browserHistory } from 'react-router'
import ChooseFiles from './ChooseFiles.component'

export default class ShowAlbum extends Component {
  constructor(props){
    super(props)
    this.state = {
      indexPhoto: '',
      albumPhotos: [],
      userId: 1,
      albumName: '',
      albumDate: '',
      albumDescription: '',
      albumType: '',
      isPublic: false,
      indexPhotoURL: '',
      showButtonAddAlbum: false
    }
    this.handleState = this.handleState.bind(this)
    this.getDate = this.getDate.bind(this)
    this.handleShowPhotos = this.handleShowPhotos.bind(this)
  }
  handleState(event){
    this.setState({[event.target.name]: event.target.value})
  }
  getDate(el){
    let newDate = new Date(parseInt(el))
    return moment(newDate, "YYYY-MM-DD HH:mm").format('LLLL')
  }
  handleShowPhotos(event){
    event.preventDefault()

  }
  render(){
    return (
      <div className="container">
        <div className="row" style={{margin: "5% 0", color: "#C4CFCF"}}>
          <div className="col-md-8 col-sm-12">
            <img src={this.state.indexPhotoURL} style={{maxHeight: "400px"}} />
          </div>
          <div className="col-md-4 col-sm-12" style={{textAlign: "center"}}>
            <div style={{margin: "5% 0"}}>
              <h3> Name of Album:</h3>
              <h5><strong>{this.state.name}</strong></h5>
            </div>
            <div style={{margin: "5% 0"}}>
              <h4> Description:</h4>
              <h5>{this.state.description}</h5>
            </div>
            <div style={{margin: "5% 0"}}>
              <h4>Date of album:</h4>
              <h5>{this.getDate(this.state.albumDate)}</h5>
            </div>
            <div style={{margin: "5% 0"}}>
              <h4>Album is {this.state.isPublic}</h4>
            </div>
            <div style={{margin: "5% 0"}}>
              <h4>Created by {this.state.userName}</h4>
            </div>
              <button
                type="button"
                className="btn btn-success btn-lg btn-block"
                onClick={this.handleCreateAlbum}
              >SHOW PHOTOS</button>
          </div>
        </div>
        {this.state.albumPhotos.length
          ? <div className="row">
            {this.state.albumPhotos.map((el, indx) => (
              <div className="col-md-3 col-sm-6" key={el.id}>
                <div className="card" style={{fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize: "0.5rem", color: "red", margin: '2% 0'}}>
                  <img
                    className="card-img-top"
                    src={el.urlPhotoSmall}
                    alt={el.name}
                    style={{maxHeight: "170px"}}
                  />
                  <div className="card-block">
                    <p className="card-title">Date: <strong>{this.getDate(el.photoDate)}</strong></p>
                    <p className="card-text">{el.description}</p>
                  </div>
                  <div className="card-footer">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                    >Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          : <div className="row" style={{color: "#C4CFCF"}}>
            <h4>This album doesn't have any of photo</h4>
            <h4>To add photos to album click button on the side bar "Modify"</h4>
          </div>
        }
      </div>
    )
  }
}
