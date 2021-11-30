import React, { useState } from 'react'
import { Key, Mail, User } from 'react-feather'
import './Styles/Login.css'
import { Link } from 'react-router-dom'
import HttpServices from './../../Utils/HttpServices'
import emailjs from 'emailjs-com'
emailjs.init('user_hDRqbIr7jiCYaY0MRuHiZ')

const Register = () => {
  const [loading, isLoading] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const CreateAccount = async (e) => {
    e.preventDefault()
    isLoading(
      <div className="alert alert-warning">Saving Your Information ... </div>,
    )
    let Http = new HttpServices('/userauth/create-new-account')
    let response = await Http.post({ username, password, email })

    if (!response.status) {
      isLoading(
        <div className="alert alert-danger text-center">
          {response.message}
        </div>,
      )
    } else {
      let templateParams = {
        to_name: username,
        link: `https://sulsugbest.com/verify-account/${response.code}`,
        to_email: email,
        from_title: 'Yoruba Community',
      }

      await emailjs.send('service_bk99p7k', 'template_0mnax1b', templateParams)
      isLoading(
        <div className="alert alert-success text-center">
          Account Created! Check Your Email To Verify!!
        </div>,
      )
      //   create session and redirect!
    }

    setTimeout(() => isLoading(''), 2000)
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 bg-white p-4">
            <form action="" className="_form" onSubmit={CreateAccount}>
              <h6 className="text-center">Create An Account.</h6>
              <hr />
              {/* <p>Connect With Friends and Family...</p> */}
              <div className="mb-4">
                <label htmlFor="">
                  <User size={12} /> Enter Your Username :{' '}
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  required
                  onChange={({ target }) => setUserName(target.value)}
                  className="form-control form-control-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="">
                  <Mail size={12} /> Enter Your Email :{' '}
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  onChange={({ target }) => setEmail(target.value)}
                  className="form-control form-control-lg"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="">
                  <Key size={12} /> Enter Your Password :{' '}
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={({ target }) => setPassword(target.value)}
                  className="form-control form-control-lg"
                />
              </div>

              {loading && <div>{loading}</div>}
              <div className="row justify-content-between">
                <div className="col-4">
                  <button className="btn btn-xs btn-success btn-block">
                    Join Us
                  </button>
                </div>
                <div className="col-4">
                  <Link to="/login" className="btn btn-link">
                    LOGIN
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
