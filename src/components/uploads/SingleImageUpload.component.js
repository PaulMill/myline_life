import React, { Component } from 'react'
import {Grid, Row, Col, Thumbnail, Image, Button} from 'react-bootstrap'
import EXIF from 'exif-js' //for getting info from metadata of jpg file
import moment from 'moment' //for formating nice date

export default class SingleImageUpload extends Component {
  constructor(props){
    super(props)
    this.state = {
      dateOfPhoto: '',
      camera: '',
      name: ''
    }
    this.getDate = this.getDate.bind(this)
    this.formatDate = this.formatDate.bind(this)
  }
  getDate(ele){
    console.log(ele);
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
    console.log(photoDateJS);
  }
  formatDate(){
    const date = this.state.dateOfPhoto
    return moment(`${date}`, "YYYY-MM-DD HH:mm:ss").format('LLLL')
  }
  render(){
    return(
        <Grid>
              <Row className="show-grid">
                  <Col sm={6} md={5} style={
                    {
                      maxHeight: '450px',
                      maxWidth: '250px',
                      // overflow: 'auto',
                      margin: '1.2rem'
                    }
                  }>
                    <Thumbnail style={{border: 'none'}}>
                      <img ref={this.getDate} src={this.props.image} style={{width: '190px', height: '140px'}} alt="photo"/>
                      {/* <Link to='details'> */}

                      <span>name of photo:</span>
                      <input name="name" value={`Photo ${this.state.name}`} />
                      <hr />
                      <h6>Created by: Paul</h6>
                      <p><span>Photo was created: </span><strong>{this.formatDate()}</strong></p>
                      <h6>Camera: <strong>{this.state.camera}</strong></h6>
                    </Thumbnail>
                  </Col>
              </Row>
            </Grid>
    )
  }
}
