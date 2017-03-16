import React, { Component } from 'react';
import './App.css';
import UploadPhotos from './components/uploads/UploadPhotos.component'

class App extends Component {
  constructor(props) {
      super(props)

      this.state = {
        isLoggedIn: true,
        userId: 0,
        userName: ''
      }
      this.editParentState = this.editParentState.bind(this)
    }

    editParentState(newState) {
      this.setState(newState)
    }

    componentWillMount(){
      // axios.get('/api/tokens/token')
      //   .then((res) => {
      //     if (!res.data) {
      //       return console.log(res.data);
      //     }
      //     this.setState(res.data)
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   })
    }

  render() {
    const { isLoggedIn, userId, userName } = this.state
    return (
      <div>
        {isLoggedIn
          ? <main>
                { this.props.children
                  ? React.cloneElement(this.props.children, {isLoggedIn, userId, userName, editParentState: this.editParentState})
                  : null
                }
            </main>
          : <div>
            </div>
        }
      </div>
    );
  }
}

export default App;
