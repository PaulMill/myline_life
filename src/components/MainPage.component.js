import React, { Component } from 'react'
import axios from 'axios'
import { Link, browserHistory} from 'react-router'
import moment from 'moment'


export default class MainPage extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { isLoggedIn, userId, userName, url } = this.props
    console.log(this.props.params);
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
