import React from 'react'
import Header from './Header'
import Nav from './Nav'
import Lifestyles from './Lifestyles'

function Dashboard({state}) {
  return (
    <div>
    <Header />
    <Lifestyles state={state}/>
    <Nav />
    </div>
  )
}

module.exports = Dashboard
