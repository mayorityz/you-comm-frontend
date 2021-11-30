import React, { useState } from 'react'
import { Key, User } from 'react-feather'
import './Styles/Login.css'
import { Link } from 'react-router-dom'
import HttpServices from './../../Utils/HttpServices'
import LocalDB from './../../Utils/LocalStorage'

const Login = () => {
  const [loading, isLoading] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const Login = async (e) => {
    e.preventDefault()
    isLoading(
      <div className="alert alert-warning">Checking Your Credentials ... </div>,
    )
    let Http = new HttpServices('/userauth/user-login')
    let response = await Http.post({ username, password })
    console.log('respose', response)
    if (response.status === 'failed') {
      isLoading(
        <div className="alert alert-danger text-center">
          {response.message}
        </div>,
      )
    } else {
      isLoading(
        <div className="alert alert-success text-center">
          Login Successful!
        </div>,
      )
      //   create session and redirect!
      LocalDB.save(
        'x-yu-tox',
        JSON.stringify({ one: response.token, two: response.username }),
      )
      window.location = '/'
    }

    setTimeout(() => isLoading(''), 10000)
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 bg-white p-4">
            <form action="" className="_form" onSubmit={Login}>
              <h6>Login</h6>
              <hr />
              <p>Connect With Friends and Family...</p>
              <div className="mb-4">
                <label htmlFor="">
                  <User size={12} /> Enter Your Username :{' '}
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control form-control-lg"
                  required
                  onChange={({ target }) => setUserName(target.value)}
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
                  className="form-control form-control-lg"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>

              {loading && <div>{loading}</div>}
              <div>
                <button className="btn btn-success btn-lg btn-block">
                  Login
                </button>

                <Link to="/register" className="btn btn-link">
                  CREATE AN ACCOUNT
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
