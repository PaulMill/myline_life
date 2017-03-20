import React, { Component } from 'react'
import ReactToastr from 'react-toastr'
const { ToastContainer } = ReactToastr;

const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class Toaster extends Component {
  constructor(props){
    super(props)
    this.addAlert = this.addAlert.bind(this)
  }
  addAlert () {
    this.refs.container.success(
      "Welcome welcome welcome!!",
      "You are now home my friend. Welcome home my friend.", {
      timeOut: 30000,
      extendedTimeOut: 10000,
      preventDuplicates:true
    });
    window.open("http://youtu.be/3SR75k7Oggg");
  }
  render(){
    return (
      <div>
        <ToastContainer ref="container"
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right" />
        <button onClick={this.addAlert}>GGininder</button>
      </div>
    );
  }
}
