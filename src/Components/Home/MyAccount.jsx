import React, { useState, useEffect } from 'react'
import { User, Clipboard, Users, Edit2, UserPlus } from 'react-feather'

import { Link } from 'react-router-dom'

import HttpServices from './../../Utils/HttpServices'
import aboutmeImg from './../../Components/images/aboutme.png'
import Discussion from '../Discussion'
import PageLoader from '../MiniComponents/PageLoader'

const MyAccount = () => {
  const [userPosts, setUserPosts] = useState([])
  const [user, setUser] = useState([])
  const [page, pageLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      let apiCall = new HttpServices('/userauth/getuserinfo')
      let res = await apiCall.getWithCred()
      if (res.status === 'success') setUser(res.result)
      pageLoading(false)
    })()
  }, [])

  const getAccountPosts = async () => {
    let req = new HttpServices('/posts/getuserposts')
    let res = await req.getWithCred()
    if (res.status === 'success') setUserPosts(res.result)
    console.log(res)
  }

  if (page) {
    return <PageLoader />
  }

  return (
    <div className="wrapper">
      <h4>My Profile.</h4>
      <hr />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="card1 card_responsive" style={style.card}>
              <div className="image image_lg">
                {user.profileImg ? (
                  <>
                    <div
                      style={{
                        backgroundImage: `url(${user.profileImg})`,
                        width: 200,
                        height: 200,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        borderRadius: 50,
                      }}
                    ></div>
                    <Link to="/update-profile-image">Update Image</Link>
                  </>
                ) : (
                  <>
                    <div>
                      <User size={50} />
                    </div>
                    <Link to="/update-profile-image">Update Image</Link>
                  </>
                )}
              </div>
              <h2>{user.username}.</h2>
              <h6>Joined : {user.date_joined}</h6>
              <h6>
                <User /> Following : {user.following.length}
              </h6>
              <a href="/update-profile" className="btn btn-success btn-lg mt-5">
                <Edit2 /> Update Profile
              </a>
              {/* 
              Todo
              - edit profile, about me, 
              - add upload profile image.
              - show list of followers.
              - show list of follows.
              - my posts
              - my replies
              - 
            */}
            </div>
          </div>
          <div className="col-md-9">
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  class="nav-link active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  <User /> About Me
                </button>
                <button
                  class="nav-link"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                  onClick={() => getAccountPosts()}
                >
                  <Clipboard /> My Posts
                </button>
                <button
                  class="nav-link"
                  id="nav-contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-contact"
                  type="button"
                  role="tab"
                  aria-controls="nav-contact"
                  aria-selected="false"
                >
                  <Users /> My Friends
                </button>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div
                class="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div style={style.options}>
                  {user.aboutme ? (
                    <div>{user.aboutme}</div>
                  ) : (
                    <>
                      <h3 className="text-center">
                        You haven't updated your ABOUT ME information.
                      </h3>
                      <p className="text-center">
                        C'mon! Tell others about yourself{' '}
                        <Link to="/update-profile">here</Link>!
                      </p>
                      <img src={aboutmeImg} style={style.image} />
                    </>
                  )}
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                <div
                  style={{
                    backgroundColor: '#fff',
                    overflowY: 'scroll',
                    padding: 12,
                  }}
                >
                  {userPosts.length === 0 ? (
                    <div>
                      <p>No Posts Found!</p>
                    </div>
                  ) : (
                    <div>
                      {userPosts.map((post) => (
                        <Discussion details={post} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="nav-contact"
                role="tabpanel"
                aria-labelledby="nav-contact-tab"
              >
                <div style={style.options}>
                  {/* user friends */}
                  {/* state 1 - no friends */}
                  {/* state 2 - show friends */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

let style = {
  options: {
    backgroundColor: '#fff',
    height: 550,
    padding: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  card: {
    height: 600,
    width: '100%',
  },
  image: {
    maxHeight: '70%',
    maxWidth: '70%',
  },
}

export default MyAccount
