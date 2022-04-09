import React, { useState, useEffect } from 'react'
import HttpServices from '../Utils/HttpServices'
import { Endpoints } from '../Utils/Constant'
import { User } from 'react-feather'
import PageLoader from './MiniComponents/PageLoader'

export default function UpdateProfileImage() {
  const [file, setFile] = useState('')
  const [_image, setImage] = useState('')
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState('')

  const fetchOnlyImage = async () => {
    let request = new HttpServices(Endpoints.FETCH_ONLY_IMAGE)
    let response = await request.getWithCred()
    if (response.status === 'success') setImage(response.data.profileImg)
    setLoading(false)
  }

  const updateProfileImage = async (e) => {
    e.preventDefault()
    setNotification('Updating Profile Image!')

    if (!file) {
      setNotification('No Image Selected!')
      return
    }
    let request = new HttpServices(Endpoints.UPDATE_ONLY_IMAGE)
    await request.post({ profileImg: file })
    setNotification('Updated Successfully!')
  }

  useEffect(() => {
    fetchOnlyImage()
  }, [])

  if (loading) return <PageLoader />

  const convertImgToString = (e) => {
    let image = e.target.files[0]
    console.log(image)

    if (!image) {
      setFile('')
      return
    }

    let reader = new FileReader()
    reader.readAsDataURL(image)
    // console.log(' reader :', reader)

    reader.onload = function () {
      setFile(reader.result)
    }

    reader.onerror = function () {
      console.log(reader.error)
    }
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 bg-white p-3">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <h5 className="text-center">Update Profile Image</h5>
              <hr />
              <div className="card1 card_responsive">
                <div className="image image_lg">
                  <div>
                    {_image ? (
                      //   <img src={_image} width={200} height={200} />
                      <div
                        style={{
                          backgroundImage: `url(${_image})`,
                          width: 200,
                          height: 200,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          borderRadius: 50,
                        }}
                      ></div>
                    ) : (
                      <User size={50} />
                    )}
                  </div>
                </div>
              </div>

              <form
                action=""
                onSubmit={updateProfileImage}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <label htmlFor="" className="mb-3">
                  Upload Your Image :
                </label>
                <input
                  type="file"
                  onChange={convertImgToString}
                  className="mb-3 p-1 border border-secondary"
                  required
                />
                {notification && (
                  <div className="alert alert-secondary text-center">
                    {notification}
                  </div>
                )}
                <hr />
                <button className="btn btn-sm btn-success">
                  Submit New Image
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
