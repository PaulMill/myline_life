import React, { Component } from 'react'
import MySettings from './MySettings.component'
import PermSettings from './PermSettings.component'

export default class UserInterface extends Component {
  render(){
    return(
      <div className="container" style={{marginTop: "3%"}}>
        <div className="row justify-content-md-center">
            <div className="col-md-6" style={{textAlign: "center"}}>
              <h2>My Account</h2>
              <hr />
            </div>
        </div>
        <div>
          <ul className="nav nav-tabs tabs-3 red" role="tablist">
            <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#panel1" role="tab">My Profile settings</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#panel2" role="tab">Permissions to my photos/albums</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#panel3" role="tab">My friends/invitations</a>
            </li>
          </ul>
          <div className="tab-content card">
            <div className="tab-pane fade in show active" id="panel1" role="tabpanel">
                <br />
                <MySettings userName={this.props.userName} userId={this.props.userId}/>
            </div>
            <div className="tab-pane fade" id="panel2" role="tabpanel">
                <br />
                <PermSettings />
            </div>
            <div className="tab-pane fade" id="panel3" role="tabpanel">
                <br />
                <p>To be continued(under construction)</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
