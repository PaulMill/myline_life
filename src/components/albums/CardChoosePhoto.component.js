import React, { Component } from 'react'
import moment from 'moment'
import SinglePictureModal from '../photos/SinglePictureModal.component'

export default class CardChoosePhoto extends Component {
  constructor(props){
    super(props)
    this.state = {
      newClassNameCard: '',
      isAdded: false
    }
    this.handleDatePhoto = this.handleDatePhoto.bind(this)
    this.toggleButtonAddToAlbum = this.toggleButtonAddToAlbum.bind(this)
  }
  handleDatePhoto(el){
    let newDate = new Date(parseInt(el))
    return moment(newDate, "YYYY-MM-DD HH:mm").format('LLLL')
  }
  toggleButtonAddToAlbum(el, index){
    let albumPhotos = this.props.choosedArr
    albumPhotos.push(el)
    this.setState({newClassNameCard: 'fadeCardBgr', isAdded: true})
    this.props.editStateChooseFiles({choosedArr: albumPhotos})
  }
  render(){
    const {el, indx} = this.props
    return(
        <div className="col-md-3 col-sm-6">
          <div className={`card ${this.state.newClassNameCard}`} style={{fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize: "0.8rem", color: "red", margin: '2% 0'}}>
            <img className="card-img-top" src={el.urlPhotoSmall} alt={el.name} style={{maxHeight: "140px"}}/>
            <div className="card-block">
              <p className="card-title">Date: {this.handleDatePhoto(el.photoDate)}</p>
              <p className="card-text">{el.description}</p>
              <p className="card-text"><small className="text-muted">Camera: {el.cameraModel}</small></p>
            </div>
            <div className="card-footer" style={{textAlign: "center", backgroundColor: "#313638"}}>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => (this.toggleButtonAddToAlbum(el, indx))}
                disabled={this.state.isAdded}
                style={{margin: "0 3%"}}
              >Add Photo</button>
            </div>
          </div>
        </div>
    )
  }
}
