import React, { Component } from 'react'

export default class AuthorizationURL extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: false,
      userId: 0,
      userName: '',
      regUrl: ''
    }
  }

  componentWillMount(){
    axios.get('/api/tokens')
      .then((res) => {
        if (!res.data) {
          return console.log(res.data);
        }
        console.log(res.data)
        this.setState(res.data)
      })
      .catch(err => {
        console.error(err);
      })
  }

  render(){
    <div>
    </div>
  }
}
