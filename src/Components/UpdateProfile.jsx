import React, { useState, useEffect } from 'react'
import { Lock, UserCheck } from 'react-feather'
import { Endpoints } from '../Utils/Constant'
import HttpService from '../Utils/HttpServices'

export default function UpdateProfile() {
  const [about, setAbout] = useState('')
  const [aboutStatus, setAboutStatus] = useState('')
  useEffect(() => {
    fetch()
  }, [])

  const fetch = async () => {
    let request = new HttpService(Endpoints.USER_DATA)
    let response = await request.getWithCred()
    if (response.status === 'success') setAbout(response.result.aboutme)
  }

  // update about me
  const updateAboutMe = async (e) => {
    e.preventDefault()
    setAboutStatus('Updating Your Profile...')
    let request = new HttpService(Endpoints.UPDATE_PROFILE)
    let response = await request.post({ aboutme: about })
    setAboutStatus('Update Successful!')
    window.location = '/my-account'
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h4>
              <Lock /> Update your password
            </h4>
            <hr />
            <form action="">
              <div className="mb-3">
                <label htmlFor="">Old Password:</label>
                <input type="text" className="form-control form-control-lg" />
              </div>
              <div className="mb-3">
                <label htmlFor="">New Password:</label>
                <input type="text" className="form-control form-control-lg" />
              </div>
              <div className="mb-3">
                <label htmlFor="">Repeat Password:</label>
                <input type="text" className="form-control form-control-lg" />
              </div>
              <button className="btn btn-success btn-lg">
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h4>
              <UserCheck /> Tell others about you.
            </h4>
            <hr />
            <form action="" onSubmit={updateAboutMe}>
              <div className="mb-3">
                <label htmlFor="">Write About Yourself Here :</label>
                <textarea
                  name=""
                  id=""
                  rows="6"
                  className="form-control"
                  onChange={({ target: { value } }) => setAbout(value)}
                  required
                >
                  {about}
                </textarea>
              </div>
              {aboutStatus && (
                <div className="alert alert-warning text-center">
                  {aboutStatus}
                </div>
              )}
              <button className="btn btn-success btn-lg">Update Info</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
