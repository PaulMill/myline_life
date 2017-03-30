import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router'


export default class AllAlbums extends Component {
  constructor(props){
    super(props)
    this.state = {
      albums: [],
      classAnimation: 'fadeInLeft'
    }
    this.handleDatePhoto = this.handleDatePhoto.bind(this)
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
  render(){
    let left = 'fadeInLeft'
    let down = ''
    const handleAnimationCards = () => {
      return left
      ? ('fadeInLeft', left = '')
      : down
        ? ('fadeInDown', down = '')
        : ('fadeInRight', left = 'fadeInLeft')
    }
    return(
      <div style={{margin: "4% 0"}}>
      <div className="container m-t-md">
        <div className="row m-t-md">
          {this.state.albums.map((el, indx) => (
              <div className="col-xs-12 col-md-4" style={{margin: '1% 0'}} key={el.id} >
                <Link to={`/album/${el.id}`} activeClassName="active">
                <article className={`card card-inverse animated cardAlbumsAll ${handleAnimationCards()} text-center`}>
                  <img className="img-responsive" src={el.indexPhoto} alt="Deer in nature" style={{maxHeight: "200px"}} />
                  <div className="card-img-overlay cardAlbumsAll">
                    <h4 className="card-title">{el.name}</h4>
                    <p className="card-text">{el.description}</p>
                    <p className="card-text">Created by:{el.ownerName}</p>
                    <h6 className="card-text" style={{fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize: "0.8rem", color: "red", margin: '2% 0'}}><strong>Date: {this.handleDatePhoto(el.albumDate)}</strong></h6>
                  </div>
                </article>
              </Link>
              </div>
            ))}
        </div>
      </div>
      </div>
    )
  }
}
