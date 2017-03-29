import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'
import './carousel.css'
import moment from 'moment'
import axios from 'axios'

export default class ShowPhotos extends Component{
  constructor(props){
    super(props)
    this.state = {
      photosToShow: []
    }
    this.handleDatePhoto = this.handleDatePhoto.bind(this)
  }
  componentWillMount(){
    axios.get(`/api/photos/show/${this.props.params.id}`)
      .then((res) => {
        console.log('res.data', res.data);
        this.setState({photosToShow: res.data})
      })
      .catch((err) => (console.error(err)))
  }
  handleDatePhoto(el){
    let newDate = new Date(parseInt(el))
    return moment(newDate, "YYYY-MM-DD HH:mm").format('LLLL')
  }
  render(){
    console.log(this.state.photosToShow)
    return(
      <div className="container">
      <Carousel
        axis="horizontal"
        showThumbs={true}
        showArrows={true}
        width="1100"
        useKeyboardArrows={true}
        autoPlay={true}
        stopOnHover={true}
        dynamicHeight={true}
        emulateTouch={true}>
        {this.state.photosToShow.map((el, indx) => {
          return (
            <div key={indx} style={{fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize: "1rem", color: "red", margin: '2% 0'}}>
              <img src={el.urlPhotoSized} />
              <p className="legend"><strong>Date: {this.handleDatePhoto(el.photoDate)}</strong> Camera: {el.cameraModel}</p>
            </div>
          )
        })}
      </Carousel>
      </div>

    )
  }
}
