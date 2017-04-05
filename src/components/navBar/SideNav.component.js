import React, { Component } from 'react'
import './SideNav.css'

export default class SideNav extends Component {
  render(){
    return(
      <div>
        <div className="side-nav-menu">
          <nav>
            <ul>
              <li>
                <a href="#">
                  <span><i className="fa fa-share-alt"></i></span>
                  <span>SHARE</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span><i className="fa fa-cogs"></i></span>
                  <span>MODIFY</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span><i className="fa fa-thumbs-up"></i></span>
                  <span>LIKE</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span><i className="fa fa-comments"></i></span>
                  <span>COMMENTS</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
