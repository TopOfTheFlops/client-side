import React from 'react'

import Header from './Header'
import Nav from './Nav'
import voteFlop from '../api/voteFlop'

function Flops ({state, dispatch}) {
  function goToCreateFlop (e) {
    dispatch({type: 'CHANGE_PAGE', payload: '/flops/new'})
  }
  return (
    <div>
      <Header />
      {RenderTitle(state)}
      <button className='create' onClick={goToCreateFlop}>Compete!</button>
      {RenderFlops(state, dispatch)}
      <div className='clear' />
      <Nav state={state} dispatch={dispatch} />
    </div>
  )
}

function RenderFlops (state, dispatch) {
  return state.flops
    .sort((a, b) => b.upvotes - a.upvotes)
    .filter(flop => {
      return flop.lifestyleId == state.currentLifestyleId
    })
    .map((flop, index) => {
      flop.rank = index + 1
      return (
        <div className='flop' key={flop.flopId}>
          <img className='flopPic' src={checkMedia(flop.mediaURL)} onClick={() => {
            dispatch({type: 'CHANGE_VIEW_SINGLE_FLOP', payload: flop.flopId})
            dispatch({type: 'CHANGE_PAGE', payload: `/flops/${flop.flopId}`})
          }} />
          <p onClick={() => {
            dispatch({type: 'CHANGE_CURRENT_VIEW_USER_ID', payload: flop.userId})
            dispatch({type: 'CHANGE_PAGE', payload: `/profile/${flop.username}`})
          }}>{flop.rank}. {flop.username}</p>
          <p>{flop.description}</p>
          <button className='upvote' onClick={() => voteFlop(dispatch, state, flop.flopId, state.currentUser.userId, 1, 0)} >{flop.upvotes}</button>
          <button className='downvote' onClick={() => voteFlop(dispatch, state, flop.flopId, state.currentUser.userId, 0, 1)}>{flop.downvotes}</button>
        </div>
      )
    })
}

function RenderTitle (state) {
  const {lifestyles, currentLifestyleId} = state
  return lifestyles.filter(lifestyle => lifestyle.lifestyleId == currentLifestyleId).map(lifestyle => (<h2 className='lifestyleHeader' key={lifestyle.lifestyleId}>{lifestyle.title}</h2>))
}

function checkMedia(mediaURL){
  if(mediaURL){
    var extension = mediaURL.slice(mediaURL.length - 3, mediaURL.length)
    if(extension == 'mp4'){
      return "https://c3metrics.com/wp-content/uploads/2016/08/feature-video-thumbnail-overlay.png"
    }
    return mediaURL
  }
}

module.exports = Flops
