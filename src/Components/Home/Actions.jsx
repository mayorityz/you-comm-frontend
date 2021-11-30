import React, { useState, useEffect } from 'react'
import { Calendar, List } from 'react-feather'
import HttpServices from '../../Utils/HttpServices'
import { Endpoints } from '../../Utils/Constant'
import { Link } from 'react-router-dom'
import image from '../../Components/images/cheering2.png'

export default function Actions() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    const request = new HttpServices(Endpoints.FETCH_CATEGORIES)
    let res = await request.get()
    setCategories(res)
    setLoading(false)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="container-fluid mb-5">
      <div className="row">
        <div className="col-md-12" style={{ position: 'relative' }}>
          <img src={image} alt="" style={{ width: '100%' }} />
          <div style={{ position: 'absolute', top: '45%' }}>
            <h1 className="topBannerText">A community of love and unity!</h1>
            <div style={{ marginLeft: 120 }}>
              <hr
                style={{
                  borderColor: '#fff',
                  borderWidth: 1,
                  borderStyle: 'solid',
                }}
              />
              {/* <Link to="/login" className="btn btn-xs btn-success">
                Login
              </Link>{' '}
              <Link to="/register" className="btn btn-xs btn-warning">
                Create Account
              </Link> */}
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div className="banner">
            <div class="card">
              <div class="card-body scroll-cards">
                <h5 class="card-title cardHeaders">
                  <Calendar className="svgs_" /> Upcoming Events
                </h5>
                <hr />
                {/* <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a> */}
                <div className="cardFlex">
                  <Calendar size={92} />
                  <p>There are no new events at the moment!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div className="banner">
            <div class="card">
              <div class="card-body scroll-cards">
                <h5 class="card-title cardHeaders">
                  <List className="svgs_" /> Categories
                </h5>
                <hr />
                {/* <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a> */}
                <div className="cardFlex rowCard">
                  {loading ? (
                    <p>Fetching Exisiting Categories</p>
                  ) : (
                    categories.map((cat) => (
                      <Link key={cat._id} to={`/category/${cat.title}`}>
                        {cat.title}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
