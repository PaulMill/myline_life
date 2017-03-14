import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UploadPhotos from './components/uploads/UploadPhotos.component'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <UploadPhotos />
      </div>
    );
  }
}

export default App;
