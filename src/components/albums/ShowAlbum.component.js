import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { browserHistory } from 'react-router'
import SinglePictureModal from '../photos/SinglePictureModal.component'
import ShareAlbum from '../share/ShareAlbum.component'

export default class ShowAlbum extends Component {
  constructor(props){
    super(props)
    this.state = {
      albumId: 1,
      albumPhotos: [],
      ownerName: '',
      albumName: '',
      albumDate: '',
      albumDescription: '',
      albumType: '',
      isPublic: false,
      indexPhotoURL: '',
      albumLikes: 0,
      showModalPhoto: false,
      showModalShare: false,
      showModalPhotoURL: ''
    }
    this.handleState = this.handleState.bind(this)
    this.getDate = this.getDate.bind(this)
    this.handleIsPublic = this.handleIsPublic.bind(this)
    this.showPhotosSlides = this.showPhotosSlides.bind(this)
    this.handleLikes = this.handleLikes.bind(this)
    this.toggleModalPhotos = this.toggleModalPhotos.bind(this)
    this.toggleModalShare = this.toggleModalShare.bind(this)
  }
  componentWillMount(){
    const newState = {}
    let p = new Promise((resolve, reject) => {
      axios.get(`/api/albums/show/${this.props.params.id}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => (console.error(err)))
    })
    p.then((album) => {
      const albumId = album.id
      axios.get(`/api/albums/photos/${albumId}`)
        .then((res) => {
          return this.setState({
            albumDate: album.albumDate,
            ownerName: album.ownerName,
            albumName: album.name,
            albumDescription: album.description,
            indexPhotoURL: album.indexPhotoUrl,
            albumType: album.albumType,
            isPublic: album.isPublic,
            albumPhotos: res.data,
            albumId: albumId,
            albumLikes: album.likes,
            isLiked: ''
          })
        })
        .catch(err => (console.error(err)))
    })
    .catch((reject) => (console.error(reject)))
  }
  handleState(event){
    this.setState({[event.target.name]: event.target.value})
  }
  getDate(el){
    let newDate = new Date(parseInt(el))
    return moment(newDate, "YYYY-MM-DD HH:mm").format('LL')
  }
  showPhotosSlides(event){
    event.preventDefault()
    browserHistory.push(`/${this.props.url}/album/show/${this.state.albumId}`)
  }
  handleIsPublic(){
    if(this.state.isPublic){
      return 'Public view'
    }
    return 'Private view only'
  }
  toggleModalPhotos(url){
    this.setState({showModalPhoto: true, showModalPhotoURL: url})
  }
  toggleModalShare(){
    this.setState({showModalShare: true})
  }

  handleLikes(event){
    event.preventDefault()
    const p = new Promise((resolve, reject) => {
      if(!this.state.albumLikes.length){
        this.setState({albumLikes: 1, isLiked: 'disabled'})
      }
      else {
        let albumLikes = this.state.albumLikes
        albumLikes ++

        this.setState({albumLikes: albumLikes, isLiked: 'disabled'})

      }
      resolve(this.state.albumLikes)
    })
    p.then(() => {
      const request = {likes: this.state.albumLikes, id: this.state.albumId}
      axios.patch('/api/albums/patch/likes', request)
      .then((res) => {
        console.log(res.data);
      })
      .catch(err => console.error(err))
    })
  }
  render(){
    return (
      <div>
        {this.state.showModalPhoto
          ? <div><SinglePictureModal url={this.state.showModalPhotoURL} /> </div>
          : null
        }
        {this.state.showModalShare
          ? <div><ShareAlbum albumId={this.state.albumId} /> </div>
          : null
        }
        <div className="side-nav-menu" style={{marginTop: "4%"}}>
          <nav>
            <ul>
              <li>
                <a
                  href="javascript:void(0)"
                    data-toggle="modal"
                    data-target=".bd-modal-form-share"
                    onClick={this.toggleModalShare}
                  >
                  <span><i className="fa fa-share-alt"></i></span>
                  <span>SHARE</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span><i className="fa fa-cogs"></i></span>
                  <span>MODIFY</span>
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  onClick={this.handleLikes}
                  className={this.state.isLiked}
                  >
                  <span><i className="fa fa-thumbs-up"></i></span>
                  <span>LIKE </span>
                  <span className="likes-big">{this.state.albumLikes}</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span><i className="fa fa-comments"></i></span>
                  <span>COMMENTS</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="container main-content-side-nav animated fadeInRight">
          <div className="row" style={{margin: "5% 0", color: "#C4CFCF"}}>
            <div className="col-md-8 col-sm-12">
              <img src={this.state.indexPhotoURL} style={{maxHeight: "400px"}} />
            </div>
            <div className="col-md-4 col-sm-12">
              <div style={{margin: "5% 0"}}>
                <h6>Name:</h6>
                <h3><strong>{this.state.albumName}</strong></h3>
              </div>
              <div style={{margin: "5% 0"}}>
                <h6> Description:</h6>
                <h3>{this.state.albumDescription}</h3>
              </div>
              <div style={{margin: "5% 0"}}>
                <h6>Date of album:</h6>
                <h5>{this.getDate(this.state.albumDate)}</h5>
              </div>
              <div style={{margin: "5% 0"}}>
                <h6>Album is </h6>
                <h4>{this.handleIsPublic()}</h4>
              </div>
              <div style={{margin: "5% 0"}}>
                <h6>Created by </h6>
                <h4><strong>{this.state.ownerName}</strong></h4>
              </div>
                <button
                  type="button"
                  className="btn btn-success btn-lg btn-block"
                  onClick={this.showPhotosSlides}
                >SHOW PHOTOS</button>
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
                      <p className="card-title">Date: {this.getDate(el.photoDate)}</p>
                      <p className="card-text">{el.description}</p>
                    </div>
                    <div className="card-footer" style={{backgroundColor: "#313638", textAlign: "center"}}>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        style={{margin: "0 3%"}}
                        data-toggle="modal"
                        data-target=".bd-example-modal-lg"
                        onClick={() => this.toggleModalPhotos(el.urlPhotoSized)}
                      >Show single</button>
                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm"
                        style={{margin: "0 3%"}}
                        onClick={this.showPhotosSlides}
                      >Show slides
                      </button>
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
      </div>
    )
  }
}
