import React from 'react'
import Header from './header'
import Nav from './nav'

function Dashboard({state}) {
  return (
    <div>
    <Header header={state.header} />
    <Nav />
    </div>
  )
}

module.exports = Dashboard
