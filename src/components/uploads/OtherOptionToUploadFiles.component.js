import React, { Component } from 'react'
import axios from 'axios'
import EXIF from 'exif-js'
import superagent from 'superagent'
import moment from 'moment' //for formating nice date
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
      photos: [],
      dateOfPhoto: '',
      camera: '',
      description: 'Here is some of description'
    }
    this.handleLoadImages = this.handleLoadImages.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStateUpload = this.handleStateUpload.bind(this)
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
    if(files.length < 5){
      setTimeout(() => {
        this.setState({photos: uploadedPictures, imagesIsLoaded: true, formData: formData})
      }, 1000)
    }
    else if (files.length > 5) {
      setTimeout(() => {
        this.setState({photos: uploadedPictures, imagesIsLoaded: true, formData: formData})
      }, 3000)
    }
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
      <div>
        <label className="custom-file">
          <input
            type="file"
            id="file"
            className="custom-file-input"
            accept="image/*"
            encType='multipart/form-data'
            name="upl_files"
            onChange={this.handleLoadImages}
            multiple
          />
          <span className="custom-file-control"></span>
        </label>
        {isLoaded
          ? <div className="container">
            <div className="row">
              {this.state.photos.map((el, indx) => (
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
          : null
        }
      </div>
    )
  }
}

// <============== Back side on ExpressJS+NodeJS  ==================>

// 'use strict'
// 
// const boom = require('boom')
// const express = require('express')
// const AWS = require('aws-sdk')
// const multer = require('multer')
// const multerS3 = require('multer-s3')
//
// const router = express.Router()
//
// const s3 = new AWS.S3()
//
// //setup bucket name for AWS S3
// const myBucket = 'myline.life'
//
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: myBucket,
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     }
//   })
// })
//
//
// router.post('/photos', upload.array('photos[]'), function(req, res) {
//
//   console.log(req.files);
//   res.send('Successfully uploaded ' + req.files.length + ' files!')
//
// })
//
// module.exports = router;
