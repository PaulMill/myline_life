import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import moment from 'moment'

export default class AllPhotosPublic extends Component {
  constructor(props){
    super(props)
    this.state = {
      photos: []
    }
    this.handleDatePhoto = this.handleDatePhoto.bind(this)
  }
  componentWillMount(){
    axios.get('api/photos')
      .then((photos) => {
        const newphotos = photos.data
        this.setState({photos: newphotos})
      })
      .catch(err => console.log(err))
  }
  handleDatePhoto(el){
    let newDate = new Date(parseInt(el))
    return moment(newDate, "YYYY-MM-DD HH:mm").format('LLL')
  }

  render(){
    return (
      <div className="container">
      <div className="row">
        {this.state.photos.map((el ,indx) => (
          <div className="col-sm-6 col-md-4" style={{fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize: "0.8rem", margin: '2% 0'}} key={indx}>
            <Link to={`/photos/${el.id}`} activeClassName="active">
              <div className="card card-inverse animated fadeInDown">
                  <img className="card-img-top" src={el.urlPhotoSmall} alt="Card image" style={{maxHeight: "200px"}} />
                  <div className="card-img-overlay">
                    <p className="card-text" style={{margin: "45% 0 0 0", textAlign: "center"}}>{el.description}</p>
                    <p className="card-text" style={{textAlign: "center", color: "#7db952"}}><strong>Date photo: {this.handleDatePhoto(el.photoDate)}</strong></p>
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
