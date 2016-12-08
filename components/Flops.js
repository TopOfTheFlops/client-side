import React from 'react'

import Header from './Header'
import Nav from './Nav'

function Flops({state}) {
  return (
    <div>
      <Header />
      {RenderFlops(state)}
      <button className='create'>Compete!</button>
      <Nav />
    </div>
  )
}

function RenderFlops(state) {
  return state.flops
    .filter( flop =>  flop.lifestyleId == state.currentLifestyleId)
    .map(flop => {
      return (
        <div className='lifestyle'>
          <h3>{flop.name}</h3>
          <img className='flopPic' src={flop.media}/>
          <p>{flop.description}</p>
          <button>cool!</button>
          <button>stupid!</button>
        </div>
      )
    })
}

module.exports = Flops
