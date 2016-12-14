import React from 'react'

import Header from './Header'
import Nav from './Nav'

import deleteFlop from '../api/deleteFlop'
import voteFlop from '../api/voteFlop'

const RenderTitle = state => {
  const {lifestyles, currentLifestyleId} = state
  return lifestyles.filter(lifestyle => lifestyle.lifestyleId == currentLifestyleId).map(lifestyle => (<h2 className='lifestyleHeader' key={lifestyle.lifestyleId}>{lifestyle.title}</h2>))
}

const RenderDeleteButton = (dispatch, flop, userId) => {
  if (flop.userId === userId) {
    return <button className='create clickable' onClick={() => deleteFlop(dispatch, flop.flopId)}>Delete Flop</button>
  }
}

const RenderFlop = (state, dispatch) => {
  return state.flops
  .filter( flop  => flop.flopId === state.viewSingleFlopId)
  .map(flop => {
    return (
      <div className='flop' key={flop.flopId}>
      {RenderMedia(flop.mediaURL)}
      <p className="usernameLink clickable" onClick={() => {
        dispatch({type: 'CHANGE_CURRENT_VIEW_USER_ID', payload: flop.userId})
        dispatch({type: 'CHANGE_PAGE', payload: `/profile/${flop.username}`})
      }}>{flop.rank}. {flop.username}</p>
      <p>{flop.description}</p>
      <button className='upvote clickable' onClick={() => voteFlop(dispatch, state, flop.flopId, state.currentUser.userId, 1, 0)} >{flop.upvotes}</button>
      <button className='downvote clickable' onClick={() => voteFlop(dispatch, state, flop.flopId, state.currentUser.userId, 0, 1)}>{flop.downvotes}</button>
      {RenderDeleteButton(dispatch, flop, state.currentUser.userId)}
      </div>
    )
  })
}

const RenderMedia = mediaURL => {
  if(mediaURL){
    var extension = mediaURL.slice(mediaURL.length - 3, mediaURL.length)
    if(extension == 'mp4'){
      return <video width="320" height="240" controls>
      <source src={mediaURL} type="video/mp4"/>
      </video>
    }
    return <img className='singleflopPic' src={mediaURL}/>
  }
}

const Flops = ({state, dispatch}) => {
  const goToCreateFlop = e => {
    dispatch({type: 'CHANGE_PAGE', payload: '/flops/new'})
  }
  const goBack = e => {
    e.preventDefault()
    dispatch({type: 'CHANGE_PAGE', payload: '/flops'})
  }
  return (
    <div>
      <Header />
      {RenderTitle(state)}
      <div className="buttonGroup dashboardButtons">
        <div className="clickable btn" onClick={goBack}>back</div>
      </div>
      {RenderFlop(state, dispatch)}
      <div className='clear' />
      <Nav state={state} dispatch={dispatch} />
    </div>
  )
}




module.exports = Flops
