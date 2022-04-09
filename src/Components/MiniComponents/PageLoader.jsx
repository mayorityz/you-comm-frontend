import React from 'react'
import { SpinnerRoundFilled } from 'spinners-react'

export default function PageLoader() {
  // return (
  //   <div
  //     style={{
  //       height: '100%',
  //       width: '100%',
  //       display: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       backgroundColor: '#000000bd',
  //       position: 'fixed',
  //       top: 0,
  //     }}
  //   >
  //     <SpinnerRoundFilled size={350} thickness={100} speed={50} color="#fff" />
  //   </div>
  // )

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f6f6f6',
      }}
    >
      <h6 style={{ fontSize: '4rem', textAlign: 'center' }}>Please Wait!!!</h6>
    </div>
  )
}
