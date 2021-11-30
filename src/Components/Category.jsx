import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import PageLoader from './MiniComponents/PageLoader'
import HttpServices from '../Utils/HttpServices'
import { Tag } from 'react-feather'
import Discussion from './Discussion'

export default function Category() {
  let { category } = useParams()
  const [loading, setLoading] = useState(true)
  const [discussion, setDiscussions] = useState([])

  useEffect(() => {
    ;(async () => {
      let posts = new HttpServices('/posts/get-all-posts')
      let _posts = await posts.post({ category })
      setDiscussions(_posts)
    })()

    setLoading(false)
  }, [])

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="">
              <h4>
                <Tag size={16} /> Threads & Discussions - {category}
              </h4>
              <hr />
              <div className="discussion_wrapper">
                <div style={{ width: '100%' }}>
                  {discussion.length === 0 && (
                    // <div
                    //   style={{
                    //     backgroundColor: '#fff',
                    //     marginRight: 50,
                    //     padding: 50,
                    //   }}
                    // >
                    //   <ContentLoader
                    //     speed={15}
                    //     width={500}
                    //     height={260}
                    //     viewBox="0 0 500 260"
                    //     backgroundColor="#575e8199"
                    //     foregroundColor="#000"
                    //   >
                    //     <rect x="48" y="8" rx="3" ry="3" width="88" height="16" />
                    //     <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                    //     <rect
                    //       x="0"
                    //       y="56"
                    //       rx="3"
                    //       ry="3"
                    //       width="410"
                    //       height="14"
                    //     />
                    //     <rect
                    //       x="0"
                    //       y="56"
                    //       rx="3"
                    //       ry="3"
                    //       width="410"
                    //       height="12"
                    //     />
                    //     <rect
                    //       x="0"
                    //       y="56"
                    //       rx="3"
                    //       ry="3"
                    //       width="410"
                    //       height="10"
                    //     />
                    //     <rect x="0" y="56" rx="3" ry="3" width="410" height="8" />
                    //     <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                    //     <rect
                    //       x="0"
                    //       y="188"
                    //       rx="15"
                    //       ry="3"
                    //       width="178"
                    //       height="16"
                    //     />
                    //     <circle cx="20" cy="20" r="20" />
                    //   </ContentLoader>
                    // </div>
                    <div>
                      <h5>No Posts Found!</h5>
                      <Link to="/new-post">Be the first To write one!</Link>
                    </div>
                  )}
                  {discussion.length !== 0 &&
                    discussion.map((disc_) => <Discussion details={disc_} />)}
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
    </div>
  )
}
