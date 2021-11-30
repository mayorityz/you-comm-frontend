import React from 'react'
import { MessageCircle, ThumbsDown, ThumbsUp } from 'react-feather'
import { Link } from 'react-router-dom'
import Optionalmg from './MiniComponents/Optionalmg'

const Discussion = ({ details }) => {
  console.log('details : ', details)
  const trimContent = (string) => {
    return string.slice(0, 750)
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="discussion_box">
            <h3>{details.title}</h3>
            <div
              dangerouslySetInnerHTML={{ __html: trimContent(details.content) }}
            ></div>
            <Link to={`/${details.postSlug}`}>read more...</Link>
            <div style={{ ...style.details, marginTop: 30 }}>
              <div style={style.details}>
                {details.image && <Optionalmg profileImg={details.image} />}

                <span>
                  <Link to={`/profile/${details.postedBy}`}>
                    {details.postedBy}
                  </Link>
                </span>
              </div>
              <div>
                <span style={{ ...style.actions, ...style.like }}>
                  <ThumbsUp size={12} /> {details.likes.length}
                </span>
                <span style={{ ...style.actions, ...style.dislike }}>
                  <ThumbsDown size={12} /> {details.dislikes.length}
                </span>
                <span style={style.actions}>
                  <MessageCircle size={12} /> {details.replies.length}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1">{/* space */}</div>
      </div>
    </div>
  )
}

const style = {
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 50,
    marginRight: 10,
  },
  actions: {
    width: 30,
    display: 'inline-block',
    cursor: 'pointer',
  },
  like: {
    color: 'green',
  },
  dislike: {
    color: 'red',
  },
}

export default Discussion
