import React from 'react'

export default function Inbox() {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 bg-white" style={style.container}>
            <div className="row">
              <div className="col-3" style={style.messages}>
                <div style={style.message}></div>
                <div style={style.message}></div>
                <div style={style.message}></div>
                <div style={style.message}></div>
                <div style={style.message}></div>
                <div style={style.message}></div>
                <div style={style.message}></div>
              </div>
              <div className="col-9">
                <div style={style.read}></div>
                <textarea
                  name=""
                  className="form-control"
                  rows="3"
                  placeholder="Type Your Reply ..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const style = {
  container: {
    height: 650,
    padding: 30,
  },
  messages: {
    backgroundColor: '#f6f6f6',
    height: 550,
    paddingTop: 20,
    overflowY: 'scroll',
    borderWidth: 1,
    borderColor: 'blue',
    borderStyle: '#282889',
  },
  message: {
    backgroundColor: '#fff',
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
  },
  read: {
    height: 450,
    backgroundColor: '#f6f6f6',
    marginBottom: 10,
  },
}
