import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import HttpServices from '../Utils/HttpServices'
import { Endpoints } from './../Utils/Constant'

let modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
}

const CreatePost = () => {
  const [content, setContent] = useState('')
  const [selectCat, setSelectedCat] = useState('')
  const [title, setTitle] = useState('')

  const [category, setCategory] = useState([])
  const [saving, setSaving] = useState('')

  useEffect(() => {
    ;(async () => {
      let req = new HttpServices(Endpoints.FETCH_CATEGORIES)
      let res = await req.get()
      setCategory(res)
    })()
  }, [])

  const savePost = async (e) => {
    e.preventDefault()
    setSaving('Saving Your Post ...')
    let req = new HttpServices(Endpoints.CREATE_NEW_POST)
    let res = await req.post({ title, content, category: selectCat })
    if (res.status) setSaving('You are not logged in!')
    else setSaving('New Post Created Successfully')
  }
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h4>Create New Post</h4>
              <hr />
              <div className="new_post_form">
                <form action="" onSubmit={savePost}>
                  <div className="form-group mb-4">
                    <label htmlFor="">Title</label>
                    <input
                      type="text"
                      placeholder="Title"
                      className="form-control form-control-lg"
                      onChange={({ target: { value } }) => setTitle(value)}
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label htmlFor="">Categories</label>
                    <select
                      className="form-control form-control-lg"
                      onChange={({ target: { value } }) =>
                        setSelectedCat(value)
                      }
                      required
                    >
                      <option>-- SELECT YOUR POST'S CATEGORY --</option>
                      {category.map((cat) => (
                        <option key={cat._id}>{cat.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="">Add your content :</label>
                    <ReactQuill
                      value={content}
                      modules={modules}
                      onChange={(e) => setContent(e)}
                      style={{
                        height: 230,
                        marginBottom: 70,
                        backgroundColor: '#fff',
                      }}
                      required
                    />
                  </div>
                  {saving && (
                    <div className="alert alert-warning text-center">
                      {saving}
                    </div>
                  )}
                  <button
                    className="btn btn-success"
                    disabled={saving ? true : false}
                  >
                    Submit Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePost
