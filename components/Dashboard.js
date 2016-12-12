import React from 'react'
import Header from './Header'
import Nav from './Nav'
import Lifestyles from './Lifestyles'

function Dashboard ({state, dispatch}) {
  if (state.requestingFlops && state.requestingLifestyles) {
    return (<h1>Loading...</h1>)
  } else {
    return (
      <div>
        <Header />
        <Lifestyles state={state} dispatch={dispatch} />
        <div className='clear' />
        <Nav state={state} dispatch={dispatch} />
      </div>
    )
  }
}

module.exports = Dashboard
