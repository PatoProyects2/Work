import React, { Component } from 'react'
import { Spinner } from 'reactstrap'

import './Loading.css'

class LoadingPage extends Component {

  render() {
    return ( 
      <div>
        <article>
          <div className="loader">
            <div className="spinner">
              <Spinner className="circle"/>
            </div>
          </div>
        </article>
      </div>
    ); 
  }
}

export default LoadingPage;