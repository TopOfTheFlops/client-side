import React from 'react'

import Header from './Header'
import Nav from './Nav'

function Flops({state, dispatch}) {
  function goToCreateFlop (e) {
    dispatch({type: 'CHANGE_PAGE', payload: '/CreateFlop'})
  }
  return (
    <div>
      <Header />
      {RenderTitle(state)}
      {RenderFlops(state)}
      <button className='create' onClick={goToCreateFlop}>Go!</button>
      <Nav state={state} dispatch={dispatch}/>
    </div>
  )
}

function RenderFlops(state) {
  return state.flops
  .sort((a, b) => b.upvotes - a.upvotes)
    .filter(flop => {
      return flop.lifestyleId == state.currentLifestyleId
    })
    .map( (flop, index) => {
      flop.rank = index+1
      return (
        <div className='lifestyle' key={flop.flopId}>
        <img className='flopPic' src={flop.media}/>
          <h3>{flop.rank} {flop.name}</h3>
          <p>{flop.description}</p>
          <button>cool!</button>
          <p>up: {flop.upvotes}</p>
          <button>stupid!</button>
          <p>down: {flop.downvotes}</p>
        </div>
      )
    })
}

function RenderTitle(state) {
  const {lifestyles, currentLifestyleId} = state
  return lifestyles.filter( lifestyle => lifestyle.lifestyleId == currentLifestyleId).map(lifestyle => (<h2>{lifestyle.title}</h2>))
}

module.exports = Flops
