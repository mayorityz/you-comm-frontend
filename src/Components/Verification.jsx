import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import HttpServices from '../Utils/HttpServices'
import { Endpoints } from '../Utils/Constant'
import PageLoader from '../Components/MiniComponents/PageLoader'
import { CheckCircle, XCircle } from 'react-feather'

import image_ from '../Components/images/error.png'

export default function Verification() {
  const { code } = useParams()
  const [response, setResponse] = useState('')
  const [status, setStatus] = useState('')
  const [verifying, setVerification] = useState(true)

  const call = async () => {
    let request = new HttpServices(`${Endpoints.VERIFICATION}/${code}`)
    let res = await request.get()
    setResponse(res.message)
    setStatus(res.status)
    setVerification(false)
  }

  useEffect(() => {
    call()
  }, [])

  if (verifying) return <PageLoader />

  return (
    <div className="wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="verification_screen">
              <div>
                {status === 'failed' ? (
                  <XCircle color="red" size={94} />
                ) : (
                  <CheckCircle size={94} />
                )}
              </div>
              <h3>{response}</h3>
              {status === 'success' && (
                <Link to="/login">Login to get started!</Link>
              )}
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-6">
            <img src={image_} alt="" srcset="" />
          </div>
          <div className="col-md-4">
            {!code && (
              <div>
                <p>Invalid Code</p>
                {code}
              </div>
            )}

            {!response ? (
              <h4>Verifying Your Account! Please Wait!!</h4>
            ) : (
              <div>
                <h4 style={{ textAlign: 'center' }}>{response}</h4>
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  )
}
