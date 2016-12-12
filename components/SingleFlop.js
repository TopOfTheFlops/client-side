import React from 'react'

import Header from './Header'
import Nav from './Nav'


function Flops ({state, dispatch}) {
  function goToCreateFlop (e) {
    dispatch({type: 'CHANGE_PAGE', payload: '/CreateFlop'})
  }
  function goBack (e) {
    e.preventDefault()
    dispatch({type:'CHANGE_PAGE', payload: '/flops'})
  }
  return (
    <div>
      <Header />
      {RenderTitle(state)}
      <button onClick={goBack}>back</button>
      {RenderFlop(state, dispatch)}
      <div className='clear'></div>
      <Nav state={state} dispatch={dispatch} />
    </div>
  )
}

function RenderFlop (state, dispatch) {
      return (
        <div className='flop' key={state.viewSingleFlop.flopId}>
          <img className='singleflopPic' src={state.viewSingleFlop.mediaURL} />
          <p>{state.viewSingleFlop.rank}. {state.viewSingleFlop.username}</p>
          <p>{state.viewSingleFlop.description}</p>
          <button className='upvote' onClick={() => upvoteFlop(dispatch, state.viewSingleFlop.flopId)} >{state.viewSingleFlop.upvotes}</button>
          <button className='downvote' onClick={() => downvoteFlop(dispatch, state.viewSingleFlop.FlopId)}>{state.viewSingleFlop.downvotes}</button>
        </div>
      )
}

function RenderTitle (state) {
  const {lifestyles, currentLifestyleId} = state
  return lifestyles.filter(lifestyle => lifestyle.lifestyleId == currentLifestyleId).map(lifestyle => (<h2 className='lifestyleHeader' key={lifestyle.lifestyleId}>{lifestyle.title}</h2>))
}

module.exports = Flops
