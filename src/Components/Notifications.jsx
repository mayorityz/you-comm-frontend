import React, { useState, useEffect } from 'react'
import HttpServices from '../Utils/HttpServices'
import PageLoader from './MiniComponents/PageLoader'

const Notification = () => {
  let [notifications, setNotifications] = useState([])
  let [isLoading, setIsLoading] = useState(true)

  let getNotification = async () => {
    let newServerCall = new HttpServices('/posts/get-notifications')
    let response = await newServerCall.getWithCred()
    if (response.status === 200) {
      setNotifications(response.notifications)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getNotification()
  }, [])

  if (isLoading) return <PageLoader />

  return (
    <div className="wrapper">
      <h4 style={{ textAlign: 'center' }}>Your Notifications.</h4>
      <div className="notificationArea">
        <div className="container">
          {notifications.length === 0 ? (
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="notice">
                  <p>You have no new notifications.</p>
                </div>
              </div>
            </div>
          ) : (
            notifications.map((NOTIFICATION) => (
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="notice">
                    <p>{NOTIFICATION.message}.</p>
                    <p className="timeAgo">3hours ago.</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Notification
