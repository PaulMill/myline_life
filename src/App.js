import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navBar/NavBar.component'

class App extends Component {
  constructor(props) {
      super(props)

      this.state = {
        isLoggedIn: true,
        userId: 0,
        userName: '',
        photosToShow: []
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
    const { isLoggedIn, userId, userName, photosToShow } = this.state
    return (
      <div>
        <NavBar />
        {isLoggedIn
          ? <main>
                { this.props.children
                  ? React.cloneElement(this.props.children, {photosToShow, isLoggedIn, userId, userName, editParentState: this.editParentState})
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
