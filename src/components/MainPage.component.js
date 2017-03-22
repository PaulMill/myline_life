import React, { Component } from 'react'
import axios from 'axios'

export default class MainPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      photos: []
    }
  }
  componentWillMount(){
    axios.get('api/photos')
      .then((photos) => {
        const newphotos = photos.data
        this.setState({photos: newphotos})
      })
      .catch(err => console.log(err))
  }
  render(){
    console.log(this.state.photos);
    return (
      <div className="container">
      <div className="row">
        {this.state.photos.map((el) => (
          <div className="col-sm-4" style={{fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize: "0.8rem", margin: '2% 0'}}>
            <div className="card card-inverse">
                <img className="card-img-top" src={el.urlPhotoSmall} alt="Card image" style={{maxHeight: "200px"}} />
                <div className="card-img-overlay">
                  <p className="card-text">{el.description}</p>
                  <p className="card-text">Photo was took: {el.photoDate}</p>
                  <p className="card-text">Added by: {el.userId}</p>
                  <p className="card-text"><small className="text-muted">Uploaded by: {el.createdAt}</small></p>
                </div>
              {/* <div className="card-block">
                <h5 className="card-title">{el.name}</h5>
                <p className="card-text">{el.description}</p>
                <p className="card-text">Created by: {el.user_id}</p>
                <p className="card-text">Likes: {el.likes}</p>
                <p className="card-text">Date picture was took: {el.photoDate}</p>
                <p className="card-text">Camera: {el.cameraModel}</p>
              </div> */}
            </div>
          </div>
        ))}
      </div>
      </div>

    )
  }
}
