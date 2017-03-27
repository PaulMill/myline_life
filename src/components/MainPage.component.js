import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import ShowPhotos from './photos/ShowPhotos.component'

export default class MainPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      photos: []
    }
    this.handleLink = this.handleLink.bind(this)
  }
  componentWillMount(){
    axios.get('api/photos')
      .then((photos) => {
        const newphotos = photos.data
        this.setState({photos: newphotos})
      })
      .catch(err => console.log(err))
  }
  handleLink(indx){
    let newArr = []
    for (let i = indx; i < 51 || i < this.state.photos.length; i++) {
      newArr.push(this.state.photos[i])
    }

    this.props.editParentState({photosToShow: newArr})
  }

  render(){
    return (
      <div className="container">
      <div className="row">
        {this.state.photos.map((el ,indx) => (
          <div className="col-sm-6 col-md-4" style={{fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize: "0.8rem", margin: '2% 0'}} key={indx}>
            <Link to={`/photos/${indx}`} activeClassName="active" onClick={() => { return this.handleLink(indx)}}>
              <div className="card card-inverse">
                  <img className="card-img-top" src={el.urlPhotoSmall} alt="Card image" style={{maxHeight: "200px"}} />
                  <div className="card-img-overlay">
                    <p className="card-text">{el.description}</p>
                    <p className="card-text">Photo was took: {el.photoDate}</p>
                    <p className="card-text">Added by: {el.userId}</p>
                    <p className="card-text"><small className="text-muted">Uploaded by: {el.createdAt}</small></p>
                  </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      </div>

    )
  }
}
