import React, { Component } from 'react'
import axios from 'axios'
import CardChoosePhoto from './CardChoosePhoto.component'

export default class ChooseFiles extends Component {
  constructor(props){
    super(props)
    this.state ={
      photosToChoose: [],
      fromDateYear: '',
      fromDateMonth: '',
      toDateYear: '',
      toDateMonth: '',
      yearFrom: [],
      choosedArr: []
    }
    this.showPhotoButton = this.showPhotoButton.bind(this)
    this.handleState = this.handleState.bind(this)
    this.editStateChooseFiles = this.editStateChooseFiles.bind(this)
    this.addToAlbum = this.addToAlbum.bind(this)
  }
  componentWillMount(){
    let p = new Promise((resolve, reject) => {
      let yearFrom = []
      for (let i = 1990; i <= 2017; i++) {
        yearFrom.push(i)
      }
      resolve(yearFrom)
    })
    p.then((yearFrom) => {
      this.setState({yearFrom})
    })
    .catch((err) =>{console.error(err)})
  }
  editStateChooseFiles(newState){
    this.setState(newState)
  }
  showPhotoButton(){
    const fromDate = +new Date(`${this.state.fromDateYear}-${this.state.fromDateMonth}-01 00:00:00`)
    const toDate = +new Date(`${this.state.toDateYear}-${this.state.toDateMonth}-01 00:00:00`)
    axios.get(`/api/photos/queries?fromDate=${fromDate}&toDate=${toDate}`)
      .then((res) => {
        const photosToChoose = res.data
        this.setState({photosToChoose})
      })
      .catch(err => console.error(err))
  }
  handleState(event){
    this.setState({[event.target.name]: event.target.value})
  }
  addToAlbum(){
    this.props.editStateCreateAlbum({albumPhotos: this.state.choosedArr})
  }
  render(){
    return(
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <form className="form-inline">
                <label className="mr-sm-2">Show photos from date:</label>
                <select
                  className="custom-select mb-2 mr-sm-2 mb-sm-0"
                  name="fromDateMonth"
                  value={this.state.fromDateMonth}
                  onChange={this.handleState}
                >
                  <option selected>Month...</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select className="custom-select mb-2 mr-sm-2 mb-sm-0"
                  name="fromDateYear"
                  value={this.state.fromDateYear}
                  onChange={this.handleState}
                >
                  <option selected>Year...</option>
                  {this.state.yearFrom.map(el => (
                    <option key={el} value={el}>{el}</option>
                  ))}
                </select>
                <label className="mr-sm-2" style={{margin: "0 2%"}}> To date:</label>
                <select
                  className="custom-select mb-2 mr-sm-2 mb-sm-0"
                  name="toDateMonth"
                  value={this.state.toDateMonth}
                  onChange={this.handleState}
                >
                  <option selected>Month...</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select
                  className="custom-select mb-2 mr-sm-2 mb-sm-0"
                  name="toDateYear"
                  value={this.state.toDateYear}
                  onChange={this.handleState}
                >
                  <option selected>Year...</option>
                  {this.state.yearFrom.map(el => (
                    <option key={el} value={el}>{el}</option>
                  ))}
                </select>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.showPhotoButton}
                  >Show Photo</button>
              </form>
                <div className="row">
                  {this.state.photosToChoose.map((el, i) => (
                    <CardChoosePhoto
                      key={el.id}
                      el={el}
                      indx={i}
                      editStateChooseFiles={this.editStateChooseFiles}
                      choosedArr={this.state.choosedArr}
                    />
                  ))}
                {this.state.choosedArr.length
                  ? <button
                    type="button"
                    className="btn btn-outline-success btn-lg btn-block"
                    onClick={this.addToAlbum}>CLICK TO ADD CHOOSED PHOTOS TO ALBUM</button>
                  : null
                }
              </div>
            </div>
          </div>
        </div>
    )
  }
}
