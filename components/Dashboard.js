import React, { Component } from 'react'
import Header from './header'

function Dashboard({state}) {
  return (
    <div>
    <Header header={state.header} />
    </div>
  )
}

export default Dashboard
