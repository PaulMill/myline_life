import React, { Component } from 'react'

export default class SinglePictureModal extends Component {
  render(){
    return(
      <div>
        <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <img src={this.props.url} style={{maxHeight: "520px"}}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
