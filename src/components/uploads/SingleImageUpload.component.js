import React, { Component } from 'react'
import EXIF from 'exif-js' //for getting info from metadata of jpg file
import moment from 'moment' //for formating nice date

export default class SingleImageUpload extends Component {
  constructor(props){
    super(props)
    this.state = {
      dateOfPhoto: '',
      camera: '',
      name: '',
      description: 'Here is some of description'
    }
    this.getDate = this.getDate.bind(this)
    this.formatDate = this.formatDate.bind(this)
  }
  getDate(ele){
    let camera;
    let dateOfPhoto;
    EXIF.getData(ele, function() {
        const allMetaData = EXIF.getAllTags(this)
        camera = `${allMetaData.Make} ${allMetaData.Model}`
        const date = allMetaData.DateTime
        dateOfPhoto = date.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3')
    })
    const photoDateJS = Date.parse(dateOfPhoto)
    this.setState({dateOfPhoto, camera, name: `${photoDateJS}`})
  }
  formatDate(){
    const date = this.state.dateOfPhoto
    return moment(`${date}`, "YYYY-MM-DD HH:mm:ss").format('LLLL')
  }
  render(){
    return(
        <div className="container">
          <div className="row">
            {this.props.photos.map((el, indx) => (
              <div className="col-md-3 col-sm-6" key={indx}>
                <div className="card" style={{fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize: "0.6rem", color: "red", margin: '2% 0'}}>
                  <img ref={() => this.getDate(el)} className="card-img-top" src={el} alt="imageUploads" style={{maxHeight: "150px"}} />
                  <div className="card-block">
                    <p className="card-title">Date: <strong>{this.formatDate}</strong></p>
                    <p className="card-text">{this.state.description}</p>
                    <p className="card-text">Camera: {this.state.camera}</p>
                  </div>
                  <div className="card-footer">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      style={{margin: "0 3%"}}
                    >Delete</button>
                    <button
                      style={{margin: "0 3%"}}
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                    >Show Full Size
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    )
  }
}
