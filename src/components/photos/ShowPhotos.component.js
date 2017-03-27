import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'
import './carousel.css'

export default class ShowPhotos extends Component{
  constructor(props){
    super(props)
    this.state = {
      photosToShow: []
    }
  }
  componentWillMount(){
    this.setState({photosToShow: this.props.photosToShow})
  }
  render(){
    return(
      <div className="container">
      <Carousel
        axis="horizontal"
        showThumbs={true}
        showArrows={true}
        width={1100}
        useKeyboardArrows={true}
        autoPlay={true}
        stopOnHover={true}
        dynamicHeight={true}
        emulateTouch={true}>
        {this.state.photosToShow.map((el) => {
          return (
            <div>
              <img src={el.urlPhotoSized} />
              <p className="legend">Date: {el.photoDate}</p>
            </div>
          )
        })}
          {/* <div>
              <img src="assets/2.jpeg" />
              <p className="legend">Legend 2</p>
          </div>
          <div>
              <img src="assets/3.jpeg" />
              <p className="legend">Legend 3</p>
          </div> */}
      </Carousel>
      </div>

    )
  }
}
