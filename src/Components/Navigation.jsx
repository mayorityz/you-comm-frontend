import React, { useState, useEffect } from 'react'
import {
  Bell,
  Edit3,
  Home,
  LogIn,
  LogOut,
  Menu,
  Package,
  Users,
} from 'react-feather'
import './Style.css'
import LocalDB from './../Utils/LocalStorage'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const [user, setUser] = useState('')

  useEffect(() => {
    ;(async () => {
      let userDetails = LocalDB.retrieve('x-yu-tox')
      setUser(JSON.parse(userDetails))
    })()
  }, [])

  const logout = () => {
    LocalDB.destroy('x-yu-tox')
    window.location = '/'
  }

  return (
    <div className="navigation">
      <div className="logo">
        <span>Yoruba Community</span>
      </div>
      <div className="menus">
        <ul className="nav__menus">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/discover">Discover</Link>
          </li>
        </ul>
        {/* <form action="">
          <input placeholder="Search" />
        </form> */}

        <ul className="nav__menus">
          <li>
            <Link to="/notification">
              <div className="notification_area">
                <Bell />
                <div className="bell_notification"></div>
              </div>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/my-account">My Account</Link>
              </li>
              <li>
                <Link to="/new-post" className="btn btn-warning">
                  New Post
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => logout()}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/new-post" className="btn btn-warning">
                  New Post
                </Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
        <ul className="nav__menus_mobile">
          <li>
            <Menu
              size={32}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            />
          </li>
        </ul>
      </div>
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">
            YORUBA COMMUNITY ONLINE
          </h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul>
            <li>
              <Link to={`/`}>
                <Home size={19} /> Home
              </Link>
            </li>
            <li>
              <Link to={`/discover`}>
                <Package size={19} /> Discover
              </Link>
            </li>
            <li>
              <Link to={`/notification`}>
                <Bell size={19} /> Notifications
              </Link>
            </li>
            <li>
              <Link to={`/new-post`}>
                <Edit3 size={19} /> Create New Post
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/my-account">
                    <Users /> My Account
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={() => logout()}>
                    <LogOut size={19} /> Logout
                  </Link>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <Link to={`/login`}>
                    <LogIn size={19} /> Login
                  </Link>
                </li>
                <li>
                  <Link to={`/register`}>Create Account</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navigation
