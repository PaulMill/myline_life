import React, { Component } from 'react'
import axios from 'axios'
import EXIF from 'exif-js'
import Request from 'superagent'
import SingleImageUpload from './SingleImageUpload.component'

export default class UploadPhotos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      imagesIsLoaded: false,
      ownerID: 1,
      ownerName: 'PAUL M',
      name: "Photo",
      dateOfPhoto: '',
      camera: '',
      formData: {}
    }
    this.handleLoadImages = this.handleLoadImages.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStateUpload = this.handleStateUpload.bind(this)
  }

  handleLoadImages(event) {
    const uploadedPictures = []
    const obj = event.target.files
    let formData = new FormData();

    for (const el in obj) {
      if (!isNaN(el)){
        const reader = new FileReader()
        reader.onload = function(data) {
          let image = data.target.result
          uploadedPictures.push(image) // Your function to send to s3
          // console.log(obj[el]);
          if (obj.hasOwnProperty(el) && obj[el] instanceof File) {
            formData.append(el, obj[el])
          }
        }
      reader.readAsDataURL(obj[el]);
      }
    }
    setTimeout(() => {
      this.setState({files: uploadedPictures, imagesIsLoaded: true, formData: formData})
    }, 1000)
  }
  handleStateUpload(newState){

  }
  handleSubmit(event){
    event.preventDefault()
    Request.post('api/upload/photos')
      // .type('image/jpeg')
      // .set("Content-Type", "application/octet-stream")
      // .set('Content-Type', 'multipart/form-data')
      // .set('Boundary', this.state.files[0])
      .attach('photo', this.state.files[0])
      .end((err, res) => {
        if (err || !res.ok) {
         console.log('Oh no! error');
       } else {
         console.log('yay got ' + res.body);
       }
      })
  }
  render() {
    const isLoaded = this.state.imagesIsLoaded
    return (
      <div>
        <form>
          <input type="file" accept="image/*" encType='multipart/form-data' name="upl_files" onChange={this.handleLoadImages} multiple />
          <input type="submit" value="submit" onClick={this.handleSubmit}/>
        </form>
        {isLoaded
          ? <div>{this.state.files.map(el => {
                return <SingleImageUpload key={this.state.files.indexOf(el)} index={this.state.files.indexOf(el)} image={el}/>
                })
              }
            </div>
          : null
        }
      </div>
    );
  }
}
