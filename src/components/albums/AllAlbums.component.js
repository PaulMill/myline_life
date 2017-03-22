import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

export default class AllAlbums extends Component {
  constructor(props){
    super(props)
    this.state = {
      albums: [],
      classAnimation: 'fadeInLeft'
    }
    this.handleDatePhoto = this.handleDatePhoto.bind(this)
    this.handleAnimationCards = this.handleAnimationCards.bind(this)
  }
  componentWillMount(){
    axios.get('api/albums/')
      .then((res) => {
        this.setState({albums: res.data})
      })
      .catch(err => (console.error(err)))
  }
  handleDatePhoto(el){
    let newDate = new Date(parseInt(el))
    return moment(newDate, "YYYY-MM-DD HH:mm").format('LL')
  }
  handleAnimationCards(){
    if(this.state.classAnimation === 'fadeInLeft'){
      this.setState({classAnimation: 'fadeInDown'})
    }
    else if (this.state.classAnimation === 'fadeInDown') {
      this.setState({classAnimation: 'fadeInRight'})
    }
    else if (this.state.classAnimation === 'fadeInRight') {
      this.setState({classAnimation: 'fadeInLeft'})
    }
  }
  render(){
    console.log(this.state.albums);
    return(
      <div style={{margin: "4% 0"}}>
      <div className="container m-t-md">
        <div className="row m-t-md">
          {this.state.albums.map((el, indx) => (
              <div className="col-xs-12 col-md-4" key={el.id} >
                <article className={`card card-inverse animated cardAlbumsAll ${this.state.classAnimation} text-center`}>
                  <img className="img-responsive" src={el.indexPhoto} alt="Deer in nature" style={{maxHeight: "200px"}} />
                  <div className="card-img-overlay cardAlbumsAll">
                    <h4 className="card-title">{el.name}</h4>
                    <p className="card-text">{el.description}</p>
                    <p className="card-text">Created by:{el.ownerName}</p>
                    <h6 className="card-text" style={{fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize: "0.8rem", color: "red", margin: '2% 0'}}><strong>Date: {this.handleDatePhoto(el.albumDate)}</strong></h6>
                  </div>
                </article>
              </div>
            ))}
        </div>
      </div>
      </div>
    )
  }
}
