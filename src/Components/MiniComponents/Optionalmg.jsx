import React from 'react'
import { User } from 'react-feather'

export default function Optionalmg({ profileImg }) {
  console.log(profileImg)
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      }}
    >
      {profileImg[0] ? (
        <img
          src={profileImg[0]}
          alt="Profile Image"
          width={40}
          height={40}
          style={{ borderRadius: '100%' }}
        />
      ) : (
        <User />
      )}
    </div>
  )
}
