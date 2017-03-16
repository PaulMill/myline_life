import React, { Component } from 'react'
import { Link } from 'react-router'
import './PageError.css'

export default class PageError extends Component {
  render(){
    const code = this.props.params.code
    console.log(code);
    let message = ''
    switch (code){
      case '404':
        message = "We couldn't find the page.."
        break;
      case '400':
        message = "BAD REQUEST.  Your request resulted in an error"
        break;
      case '403':
        message = "ACCESS DIENIED / FORBIDDEN"
        break;
      case '500':
        message = "Sorry, we had some technical problems during your last operation. Return to previous page and try again."
        break;
      default:
        message = `Error code doesn't exist check error code #${code}`
    }
    return(
      <div className="nb-error">
        {/* <img src={'./images/err.png'}/> */}
        <div className="error-code">{code}</div>
        <h4 className="font-bold"><strong>{message}</strong></h4>

        <div className="error-desc">
          <hr style={{marginBottom: "10%"}}/>
          <p style={{marginBottom: "20%"}}>
            Sorry, but the page you are looking for was either not found or does not exist. <br/>
            Try refreshing the page or click the button below to go back to the <Link to={'/'} activeClassName="active"> Homepage.</Link>
            </p>
           <ul className="list-inline text-center text-sm">
             <li className="list-inline-item"><a href="https://myline.life" className="text-muted">Go to App</a>
             </li>
             <li className="list-inline-item"><a href="https://myline.life/login" className="text-muted">Login</a>
             </li>
             <li className="list-inline-item"><a href="https://myline.life/signup" className="text-muted">Register</a>
             </li>
          </ul>
          <div className="text-center">
            <span>©</span>
            <span>2017</span>
            <span>-</span>
            <span>PM Enterprice LLC </span>
            <br />
            <span>Powered by ReactJS</span>
         </div>
       </div>
     </div>
    )
  }
}
