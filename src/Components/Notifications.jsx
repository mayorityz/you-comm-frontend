import React from 'react'
const Notification = () => {
  return (
    <div className="wrapper">
      <h4 style={{ textAlign: 'center' }}>Your Notifications.</h4>
      <div className="notificationArea">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="notice">
                <p>
                  <strong>Mayowa</strong> liked your post.
                </p>
                <p className="timeAgo">3hours ago.</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="notice">
                <p>
                  <strong>Mayowa</strong> liked your post.
                </p>
                <p className="timeAgo">3hours ago.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification
