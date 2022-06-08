import React from 'react'
import { Spinner } from 'reactstrap'
import './LoadingPage.css'

const LoadingPage = () => {

  return (
    <div>
      <article>
        <div className="loader">
          <div className="spinner">
            <Spinner className="circle" />
          </div>
        </div>
      </article>
    </div>
  );
}

export default LoadingPage;