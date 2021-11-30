import React from 'react'
import imgg from './images/work.png'

const Discover = () => {
  return (
    <div className="wrapper">
      {/* <h4>Discover</h4> */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <img src={imgg} alt="logo" style={{ maxWidth: '100%' }} />
            <p style={{ textAlign: 'center' }}>No Discoveries Found!!!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Discover
