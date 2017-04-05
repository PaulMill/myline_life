import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { browserHistory } from 'react-router'
import ChooseFiles from './ChooseFiles.component'
import SinglePictureModal from '../photos/SinglePictureModal.component'

export default class CreateAlbum extends Component {
  constructor(props){
    super(props)
    this.state = {
      indexPhoto: '',
      albumPhotos: [],
      albumName: '',
      albumDate: '',
      albumDescription: '',
      albumType: '',
      isPublic: false,
      indexPhotoURL: '',
      showButtonAddAlbum: false,
      showModalPhoto: false,
      showModalPhotoURL: ''
    }
    this.handleState = this.handleState.bind(this)
    this.editStateCreateAlbum = this.editStateCreateAlbum.bind(this)
    this.deletePhotoFromAlbum = this.deletePhotoFromAlbum.bind(this)
    this.handleIndexPhoto = this.handleIndexPhoto.bind(this)
    this.handleDatePhoto = this.handleDatePhoto.bind(this)
    this.handleCreateAlbum = this.handleCreateAlbum.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }
  deletePhotoFromAlbum(el, index){
    let newArray = this.state.albumPhotos
    newArray.splice(index, 1)
    this.setState({albumPhotos: newArray})
  }
  handleState(event){
    this.setState({[event.target.name]: event.target.value})
  }
  editStateCreateAlbum(newState){
    this.setState(newState)
  }
  handleIndexPhoto(el){
    this.setState({indexPhoto: el.id, indexPhotoURL: el.urlPhotoSized, showButtonAddAlbum: true})
  }
  handleDatePhoto(el){
    let newDate = new Date(parseInt(el))
    return moment(newDate, "YYYY-MM-DD HH:mm").format('LLLL')
  }
  handleCreateAlbum(event){
    event.preventDefault()
    const date = new Date(this.state.albumDate).getTime()
    const request = {
      name: this.state.albumName,
      albumDate: date,
      albumType: this.state.albumType,
      isPublic: this.state.isPublic,
      description: this.state.albumDescription,
      indexPhoto: this.state.indexPhoto,
      albumPhotos: this.state.albumPhotos
    }
    axios.post('/api/albums/new', request)
      .then((res) => {
        if(res.status === 200){
          return browserHistory.push(`/${this.props.url}/albums`)
        }
        console.log('status', res.status, 'data', res.data);
      })
      .catch(err => (console.error(err)))
  }
  toggleModal(url){
    this.setState({showModalPhoto: true, showModalPhotoURL: url})
  }
  render(){
    return (
      <div className="container">
        {this.state.showModalPhoto
          ? <div><SinglePictureModal url={this.state.showModalPhotoURL} /> </div>
          : null
        }
        <div className="row" style={{margin: "5% 0", color: "#C4CFCF"}}>
          <div className="col-md-8 col-sm-12">
            <img src={this.state.indexPhotoURL} style={{maxHeight: "400px"}} />
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="form-group">
              <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-folder-open"></i></div>
                <input
                  type="text"
                  name="albumName"
                  onChange={this.handleState}
                  value={this.state.albumName}
                  className="form-control"
                  placeholder="name of album"
                  required
                  autoFocus
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-calendar "></i></div>
                <input
                  type="date"
                  name="albumDate"
                  onChange={this.handleState}
                  value={this.state.albumDate}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-control-feedback">
                <span className="text-danger align-middle">
                  {/* <!-- Put name validation error messages here --> */}
                </span>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                <div className="input-group-addon" style={{width: "2.6rem"}}><i className="fa fa-pencil-square-o"></i></div>
                <textarea
                  type="text"
                  name="albumDescription"
                  onChange={this.handleState}
                  value={this.state.albumDescription}
                  className="form-control"
                  placeholder="Short description of album"
                  required
                />
              </div>
              <div className="form-control-feedback">
                <span className="text-danger align-middle">
                  {/* <!-- Put name validation error messages here --> */}
                </span>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check form-check-inline">
                <p>Choose type of album</p>
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="albumType"
                    value="albums"
                    onChange={this.handleState}
                  /> Photo Album
                </label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="albumType"
                    value="moments"
                    onChange={this.handleState}
                  /> Life event
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check form-check-inline">
                <p>Choose privacy:</p>
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isPublic"
                    value="false"
                    onChange={this.handleState}
                  /> Private view
                </label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isPublic"
                    value="true"
                    onChange={this.handleState} /> Public view
                </label>
              </div>
            </div>
            {this.state.showButtonAddAlbum
              ? <button
                  type="button"
                  className="btn btn-success btn-lg btn-block"
                  onClick={this.handleCreateAlbum}
                >CREATE ALBUM</button>
              : <div style={{fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize: "0.8rem", color: "red", margin: '2% 0'}}><strong>You have to fill all the fields, then select photos for the album and choose a cover photo</strong></div>
            }
          </div>
        </div>
        {this.state.albumPhotos.length
          ? <div className="row">
            {this.state.albumPhotos.map((el, indx) => (
              <div className="col-md-3 col-sm-6" key={el.id}>
                <div className="card" style={{fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize: "0.8rem", color: "red", margin: '2% 0', backgroundColor: "#53585B"}}>
                  <img
                    className="card-img-top"
                    src={el.urlPhotoSmall}
                    alt={el.name}
                    style={{maxHeight: "140px"}}
                  />
                  <div className="card-block">
                    <p className="card-title">Date: {this.handleDatePhoto(el.photoDate)}</p>
                    <p className="card-text">{el.description}</p>
                  </div>
                  <div className="card-footer" style={{backgroundColor: "#313638"}}>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => (this.deletePhotoFromAlbum(el, indx))}
                      style={{margin: "0 3%"}}
                    >Delete</button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      data-toggle="modal"
                      data-target=".bd-example-modal-lg"
                      onClick={() => this.toggleModal(el.urlPhotoSized)}
                    >Details</button>
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      onClick={() => (this.handleIndexPhoto(el))}
                      style={{margin: "0 3%"}}
                    >Cover</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          : <div className="row">
            <ChooseFiles editStateCreateAlbum={this.editStateCreateAlbum}/>
          </div>
        }
      </div>
    )
  }
}
