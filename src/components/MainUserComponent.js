import React, { Component } from 'react'
import axios from 'axios'
import { browserHistory } from 'react-router'

export default class MainUserComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: false,
      userId: 0,
      userName: '',
      url: ''
    }
  }
  componentWillMount(){
    axios.get('/api/tokens')
      .then((res) => {
        if (!res.data) {
          if (!this.props.params.userurl) {
            return console.log('Sorry page was broken')
          }
          return browserHistory.push(`/${this.props.params.userurl}/public`)
        }
        else {
          this.setState(res.data)
          this.props.setUserState(res.data)
          browserHistory.push(`/${res.data.url}/photos`)
        }
      })
      .catch(err => {
        console.error(err);
      })
  }
  render(){
    const { isLoggedIn, userId, userName, url } = this.state
    return (
      <div>
        { this.props.children
          ? React.cloneElement(this.props.children, {url, isLoggedIn, userId, userName})
          : null
        }
      </div>
    )
  }
}
