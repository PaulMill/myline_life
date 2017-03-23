import React, { Component } from 'react'
import axios from 'axios'
import EXIF from 'exif-js'
import superagent from 'superagent'
import Dropzone from 'react-dropzone'
import SingleImageUpload from './SingleImageUpload.component'

export default class UploadPhotos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: new FormData(),
      imagesIsLoaded: false,
      ownerID: 1,
      ownerName: 'PAUL M',
      name: "Photo",
      dateOfPhoto: '',
      camera: '',
      photos: [],
      files: []
    }
    this.handleLoadImages = this.handleLoadImages.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStateUpload = this.handleStateUpload.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onOpenClick = this.onOpenClick.bind(this)
  }

  handleLoadImages(event) {
    let uploadedPictures = []
    const files = event.target.files
    const formData = new FormData()
    for (const file of files) {
      if (!file.type.match('image.*')) {
        continue
      }
      formData.append('photos[]', file)
  // function to show photos before submit
      const reader = new FileReader()
        reader.onload = function(data) {
          let imageData = data.target.result
          uploadedPictures.push(imageData)
          console.log(uploadedPictures);
        }
      reader.readAsDataURL(file)
    }
    this.setState({photos: uploadedPictures, imagesIsLoaded: true, formData: formData})
  }

  onDrop(files) {
      this.setState({photos: files});
    }
    onOpenClick() {
      this.refs.dropzone.open();
    }

  handleSubmit(event){
    event.preventDefault()
    superagent.post('/api/upload/photos')
      .send(this.state.formData)
      .end((err, res) => {
        if (err || !res.ok) {
         console.log('Oh no! error');
        } else {
         console.log('yay got ' + res.data);
        }

        this.setState({ formData: new FormData() })
      }
    )
  }
  render() {
    const isLoaded = this.state.imagesIsLoaded
    console.log(this.state.photos);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <Dropzone ref="dropzone" onDrop={this.onDrop} accept="image/*" style={{
              borderWidth: "2px",
              borderColor: "black",
              borderStyle: "dashed",
              borderRadius: "4px",
              margin: "5% 0",
              padding: "30px",
              width: "250px",
              transition: "all 0.5s"
              }}
            >
              <div>Drag and drop here pictures what you want to upload or click button below to choose pictures</div>
          </Dropzone>
          <button type="button" className="btn btn-outline-primary" style={{margin: "5% 0"}} onClick={this.onOpenClick}>Choose files to upload</button>
          </div>
        </div>
          {this.state.files.length
            ? <div>
                <button type="button" className="btn btn-outline-success btn-lg btn-block" style={{margin: "5% 0"}}>Upload {this.state.files.length} pictures</button>
                <div className="row">{this.state.files.map((file, indx) => {
                  return (
                    <div className="col-md-3 col-sm-6" key={indx}>
                      <div className="card" style={{fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize: "0.6rem", color: "red", margin: '2% 0'}}>
                        <img className="card-img-top" src={file.preview} alt="imageUploads" style={{maxHeight: "160px"}} />
                        <div className="card-block">
                          <p className="card-title">Date: <strong></strong></p>
                          {/* <p className="card-text">{this.state.description}</p>
                          <p className="card-text">Camera: {this.state.camera}</p> */}
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
                  )})}</div>
              </div>
          : null}
        </div>
    )
  }
}
