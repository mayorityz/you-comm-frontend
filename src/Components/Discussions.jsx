import React, { useState, useEffect } from 'react'
import { Tag } from 'react-feather'
import Discussion from './Discussion'
import HttpServices from './../Utils/HttpServices'
import PageLoader from './MiniComponents/PageLoader'
import { Link } from 'react-router-dom'

const Discussions = () => {
  const [discussion, setDiscussions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      let posts = new HttpServices('/posts/get-all-posts')
      let _posts = await posts.post({})
      setDiscussions(_posts)
      setLoading(false)
    })()
  }, [])

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="">
            <h4>
              <Tag size={16} /> Threads & Discussions
            </h4>
            <hr />
            <div className="discussion_wrapper">
              <div style={{ width: '100%' }}>
                {loading ? (
                  <div>
                    <h5>Fetching Lastest Post!</h5>
                    <p>Please Wait!!!</p>
                  </div>
                ) : discussion.length === 0 ? (
                  <div>
                    <h5>No Posts Found!</h5>
                    <Link to="/new-post">Be the first To write one!</Link>
                  </div>
                ) : (
                  discussion.length !== 0 &&
                  discussion.map((disc_) => <Discussion details={disc_} />)
                )}
              </div>
              {/* sidebar */}
              {/* <div>
          <div className="card">
            <h4>
              <User size={12} /> Suggestions For You
            </h4>
            <div className="mini_user_card">
              <div className="image"></div>
              <div>
                <h6>Abiodun Mayowa</h6>
              </div>
              <button className="btn btn-follow">
                <User size={12} /> Follow
              </button>
            </div>
          </div>
          <div className="card">
            <h4>
              <Calendar size={12} /> Upcoming Events
            </h4>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Calendar size={174} />
            </div>
            <p style={{ textAlign: 'center' }}>No Events Found!!</p>
          </div>
          <div className="card">
            <h4> Categories</h4>
            <div className="sidebarcats">
              <div className="cats">Family</div>
              <div className="cats">Politics</div>
              <div className="cats">Jobs</div>
              <div className="cats">Family</div>
            </div>
          </div>
        </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Discussions
