import React from 'react'

import Header from './Header'
import Nav from './Nav'
import upvoteFlop from '../api/upvoteFlop'
import downvoteFlop from '../api/downvoteFlop'

function Flops({state, dispatch}) {
  function goToCreateFlop (e) {
    dispatch({type: 'CHANGE_PAGE', payload: '/CreateFlop'})
  }
  return (
    <div>
      <Header />
      {RenderTitle(state)}
      {RenderFlops(state, dispatch)}
      <button className='create' onClick={goToCreateFlop}>Go!</button>
      <Nav state={state} dispatch={dispatch}/>
    </div>
  )
}

function RenderFlops(state, dispatch) {
  function actionDownvote(dispatch, id){

  }
  return state.flops
  .sort((a, b) => b.upvotes - a.upvotes)
    .filter(flop => {
      return flop.lifestyleId == state.currentLifestyleId
    })
    .map( (flop, index) => {
      flop.rank = index+1
      return (
        <div className='flop' key={flop.flopId}>
          <img className='flopPic' src={flop.mediaURL}/>
          <h3>{flop.rank} {flop.username}</h3>
          <p>{flop.description}</p>
          <button id={index} onClick={() => upvoteFlop(dispatch, flop.flopId)} >cool!</button>
          <p>up: {flop.upvotes}</p>
          <button onClick={() => downvoteFlop(dispatch, flop.flopId)}>stupid!</button>
          <p>down: {flop.downvotes}</p>
        </div>
      )
    })

}

function RenderTitle(state) {
  const {lifestyles, currentLifestyleId} = state
  return lifestyles.filter( lifestyle => lifestyle.lifestyleId == currentLifestyleId).map(lifestyle => (<h2 key={lifestyle.lifestyleId}>{lifestyle.title}</h2>))
}

module.exports = Flops
