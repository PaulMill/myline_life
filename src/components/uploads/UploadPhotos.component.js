import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'


export default class UploadPhotos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ownerID: 1,
      ownerName: 'PAUL M',
      name: "Photo",
      dateOfPhoto: '',
      camera: '',
      files: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onOpenClick = this.onOpenClick.bind(this)
    this.deletePhotoFromUpload = this.deletePhotoFromUpload.bind(this)
  }

  handleSubmit(event){
    event.preventDefault()
      const p = new Promise((resolve, reject) => {
        const formData = new FormData()
        for (const file of this.state.files) {
          if (!file.type.match('image.*')) {
            continue
          }
          formData.append('photos[]', file)
        }
        resolve(formData)
      })
      p.then((formData) => {
        axios.post('/api/upload/photos', formData)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
      })
      .catch(err =>(console.error(err)))
    }

  deletePhotoFromUpload(el, index){
    let newArray = this.state.files
    newArray.splice(index, 1)
    this.setState({files: newArray})
  }

  onDrop(files) {
      this.setState({files: files});
    }
    onOpenClick() {
      this.refs.dropzone.open();
    }

  render() {
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
                <button type="button" className="btn btn-outline-success btn-lg btn-block" style={{margin: "5% 0"}} onClick={this.handleSubmit}>Upload {this.state.files.length} pictures</button>
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
                            onClick={() => (this.deletePhotoFromUpload(file, indx))}
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
