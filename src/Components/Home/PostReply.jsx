import React, { useState } from 'react'
import LocalDB from './../../Utils/LocalStorage'
import HttpServices from './../../Utils/HttpServices'
import * as timeago from 'timeago.js'

const PostReply = ({ reply }) => {
  const [response, setResponse] = useState('')
  const [notification, setNotification] = useState('')

  const sendResponse = () => {
    const userID = LocalDB.retrieve('x-yu-tox')
    if (!userID) window.location = '/'
    else if (response.length === 0) {
      setNotification('You have not written your response!!!')
    } else {
      let response = new HttpServices('/posts/replypost')
      response.post({ response, userID })
    }
  }

  return (
    <div className="post_replies">
      <h4>
        {reply.user} - {timeago.format(reply.replyDate)}.
      </h4>

      <p>{reply.reply}</p>
      <textarea
        placeholder="Reply..."
        onChange={({ target }) => setResponse(target.value)}
      >
        {response}
      </textarea>
      {notification && <p>{notification}</p>}
      <button className="btn btn-success btn-xs" onClick={sendResponse}>
        reply
      </button>
    </div>
  )
}

export default PostReply
