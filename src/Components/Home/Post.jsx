import React, { useState, useEffect } from 'react'
import './Styles/Post.css'
import { AlertCircle, ThumbsUp } from 'react-feather'
import { ThumbsDown, Calendar } from 'react-feather'
import { MessageCircle } from 'react-feather'
import { useParams } from 'react-router'
import HttpServices from './../../Utils/HttpServices'
import PostReply from './PostReply'
import LocalDB from './../../Utils/LocalStorage'
import { Endpoints } from '../../Utils/Constant.js'
import PageLoader from '../MiniComponents/PageLoader'
import * as timeago from 'timeago.js'

const Post = () => {
  const { slug } = useParams()
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState({})
  const [takenAction, setTakenAction] = useState(false)

  const [reply, setReply] = useState('')
  const [replyMsg, setReplyMsg] = useState('')

  const [totalLikes, setTotalLikes] = useState(0)
  const [totalDisLikes, setTotalDisLikes] = useState(0)

  useEffect(() => {
    ;(async () => {
      let http = new HttpServices('/posts/readposts')
      let response = await http.post({ postid: slug })
      if (response) {
        setPost(response)
        let Likes = response.actions.filter(
          (action) => action.action === 'like',
        )
        let DisLikes = response.actions.filter(
          (action) => action.action === 'like',
        )
        setTotalLikes(Likes.length)
        setTotalDisLikes(DisLikes.length)
      } else alert('Post Not Found!')

      setLoading(false)
    })()
  }, [slug])

  const sendReply = async (e) => {
    e.preventDefault()
    if (!reply) setReplyMsg('You Must Send An Reply!')
    if (!LocalDB.retrieve('x-yu-tox')) setReplyMsg('You Must Be Logged In!')
    else {
      const req = new HttpServices(Endpoints.REPLY_POST)
      const res = await req.post({ reply, postid: post._id })
      if (res.status === 'failed')
        setReplyMsg('Authentication Failed! Pls login again!!')
      else setReplyMsg('reply sent!!!')
    }

    setTimeout(() => {
      setReplyMsg('')
    }, 2000)
  }

  const postAction = async (action, post_) => {
    if (takenAction) return

    console.log(action, post_)
    // -> check that the person hasn't taken any action...
    let User = JSON.parse(LocalDB.retrieve('x-yu-tox'))

    let hasTakenAction = post.actions.find((user) => user.username === User.two)

    if (!hasTakenAction === undefined || hasTakenAction) return
    else {
      let req = new HttpServices(Endpoints.POST_ACTION)
      let res = await req.post({ action, post: post_ })
    }
    setTakenAction(true)
  }

  if (loading) return <PageLoader />

  if (!post) return <h4>Post Not Found!</h4>

  return (
    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div
            className="col-md-7 user_post bg-white"
            style={{ position: 'relative' }}
          >
            <h4>{post.title}</h4>
            <div className="post_user_details">
              <span>Posted By {post.postedBy}.</span> <Calendar size={12} />{' '}
              {timeago.format(post.postDate)}
              <div
                style={{ position: 'absolute', top: 0, right: 0, margin: 20 }}
              >
                {<AlertCircle size={17} color="red" />}
              </div>
            </div>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            <div className="interactions">
              <div onClick={() => postAction('like', post.postSlug)}>
                <ThumbsUp size={13} color="green" /> {totalLikes}
              </div>
              <div onClick={() => postAction('dislike', post.postSlug)}>
                <ThumbsDown size={13} color="red" /> {post.dislikes.length}
              </div>
              <div>
                <MessageCircle size={13} /> {post.replies.length}
              </div>
            </div>
            <form action="" onSubmit={sendReply}>
              <label htmlFor="">Post Your Reply : </label>
              <textarea
                placeholder="Post your comment here ..."
                value={reply}
                required
                onChange={({ target: { value } }) => setReply(value)}
              ></textarea>
              {replyMsg && (
                <div className="alert alert-secondary text-center">
                  {replyMsg}
                </div>
              )}
              <button className="btn btn-success btn-lg">Reply</button>{' '}
            </form>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-4 p-3 bg-white border border-primary">
            <h4>
              <MessageCircle size={12} /> Replies ({post.replies.length}).
            </h4>
            <hr />
            {post.replies.length === 0 && <h4>No Replies</h4>}
            {post.replies.map((reply) => (
              <PostReply reply={reply} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
