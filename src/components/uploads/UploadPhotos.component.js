import React, { Component } from 'react'
import axios from 'axios'
import EXIF from 'exif-js'
import superagent from 'superagent'
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
    if(this.state.files.length) {
      for (const element of this.state.files) {
        axios.post('/api/upload/geturl', {filename: `${this.state.name}${Date.now()}`})
        .then((result) => {
          console.log('result', result);
          return result.data
          })
        .then((url) => {
          console.log('url', url);
          const options = {
            headers: {
              'Content-Type': 'image/jpeg'
            }
          }
          return axios.put(url, element, options)
          })
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
    else {
      return alert('Choose photo for uploading')
    }
    // superagent
    //   .post('api/upload/photos')
    //   .attach('photo', 'this.state.files')
    //   .end((err, res) => {
    //     if (err || !res.ok) {
    //      console.log('Oh no! error');
    //    } else {
    //      console.log('yay got ' + res.body);
    //    }
    //
    //   })
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
