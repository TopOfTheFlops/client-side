import React from 'react'

import Header from './Header'
import Nav from './Nav'
import deleteFlop from '../api/deleteFlop'

import voteFlop from '../api/voteFlop'

function Flops ({state, dispatch}) {
  function goToCreateFlop (e) {
    dispatch({type: 'CHANGE_PAGE', payload: '/flops/new'})
  }
  function goBack (e) {
    e.preventDefault()
    dispatch({type: 'CHANGE_PAGE', payload: '/flops'})
  }
  return (
    <div>
      <Header />
      {RenderTitle(state)}
      <button onClick={goBack}>back</button>
      {RenderFlop(state, dispatch)}
      <div className='clear' />
      <Nav state={state} dispatch={dispatch} />
    </div>
  )
}

function RenderFlop (state, dispatch) {
  return state.flops
    .filter( flop  => flop.flopId === state.viewSingleFlopId)
    .map(flop => {
      return (
        <div className='flop' key={flop.flopId}>
          <img className='singleflopPic' src={flop.mediaURL}/>
          <p>{flop.rank}. {flop.username}</p>
          <p>{flop.description}</p>
          <button className='upvote' onClick={() => voteFlop(dispatch, state, flop.flopId, state.currentUser.userId, 1, 0)} >{flop.upvotes}</button>
          <button className='downvote' onClick={() => voteFlop(dispatch, state, flop.flopId, state.currentUser.userId, 0, 1)}>{flop.downvotes}</button>
          {RenderDeleteButton(dispatch, flop, state.currentUser.userId)}
        </div>
      )
    })
}

function RenderTitle (state) {
  const {lifestyles, currentLifestyleId} = state
  return lifestyles.filter(lifestyle => lifestyle.lifestyleId == currentLifestyleId).map(lifestyle => (<h2 className='lifestyleHeader' key={lifestyle.lifestyleId}>{lifestyle.title}</h2>))
}

function RenderDeleteButton(dispatch, flop, userId) {
  if (flop.userId === userId) {
    return <button className='create' onClick={() => deleteFlop(dispatch, flop.flopId)}>Delete Flop</button>
  }
}

module.exports = Flops
