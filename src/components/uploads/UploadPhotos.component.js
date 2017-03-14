import React, { Component } from 'react'
import axios from 'axios'
import EXIF from 'exif-js'
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
      camera: ''
    }
    this.handleLoadImages = this.handleLoadImages.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleLoadImages(event) {
    const uploadedPictures = []
    const obj = event.target.files
    for (const el in obj) {
      if (!isNaN(el)){
        const reader = new FileReader()
        reader.onload = function(data) {
          let image = data.target.result
          uploadedPictures.push(image) // Your function to send to s3
        }
      reader.readAsDataURL(obj[el]);
      }
    }
    setTimeout(() => {
      const file = uploadedPictures[0];
      this.setState({files: uploadedPictures, imagesIsLoaded: true})
    }, 1000)
}
  handleSubmit(event){
    event.preventDefault()
    console.log(this.state.files);

    axios.post('/api/upload/photos', this.state.files)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
  }
  render() {
    const isLoaded = this.state.imagesIsLoaded
    return (
      <div>
        <form>
          <input type="file" accept="image/*" name="upl_files" onChange={this.handleLoadImages} multiple />
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
