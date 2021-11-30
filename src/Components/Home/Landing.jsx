import React from 'react'
import TrendingLayer from '../TrendingLayer'
import Discussions from './../Discussions'
import Actions from './Actions'

const Landing = () => {
  return (
    <div className="wrapper">
      {/* <TrendingLayer /> */}
      <Actions />
      <Discussions />
    </div>
  )
}

export default Landing
